const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { cloudinary } = require('../config/cloudinary'); // ✅ Import Cloudinary
const path = require('path'); // ✅ Used for extracting filenames correctly

// ✅ Get all projects with pagination and sorting
router.get('/projects', async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 6;
        if (page < 1) page = 1;

        const sortField = req.query.sort || 'createdAt';
        const sortOrder = req.query.order === 'asc' ? 1 : -1;

        const projects = await Project.find({})
            .sort({ [sortField]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalProjects = await Project.countDocuments({});
        const totalPages = Math.ceil(totalProjects / limit);

        res.status(200).json({
            projects,
            currentPage: page,
            totalPages,
            totalProjects
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching projects' });
    }
});

// ✅ Create a new project (Protected)
// Protect the Upload API
router.post("/projects", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const imageUrl = req.file ? req.file.path : null;
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            image: imageUrl,
            technologies: req.body.technologies ? req.body.technologies.split(",").map(tech => tech.trim()) : [],
            liveDemo: req.body.liveDemo,
            sourceCode: req.body.sourceCode,
        });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: "Failed to create project" });
    }
});

// ✅ Delete a project (Protected & Cloudinary Image Deletion)
router.delete('/projects/:id', authMiddleware, async (req, res) => {
    try {
        const projectId = req.params.id;
        console.log(`🗑 Attempting to delete project with ID: ${projectId}`);

        const project = await Project.findById(projectId);

        if (!project) {
            console.log("❌ Project not found in database.");
            return res.status(404).json({ message: "Project not found" });
        }

        // ✅ Correct Cloudinary Public ID Extraction
        if (project.image) {
            console.log("🌐 Full Cloudinary URL:", project.image);

            // Extract the path after "/upload/"
            const cloudinaryUrlParts = project.image.split("/upload/");
            if (cloudinaryUrlParts.length < 2) {
                console.log("❌ Invalid Cloudinary URL format.");
                return res.status(500).json({ error: "Invalid Cloudinary URL format" });
            }

            let publicId = cloudinaryUrlParts[1]; // "v1741547230/portfolio_projects/lugasggqi0wxdlq9b135.png"

            // ✅ Remove the version number (v1741547230/)
            publicId = publicId.replace(/^v\d+\//, ""); // "portfolio_projects/lugasggqi0wxdlq9b135.png"

            // ✅ Remove file extension (.png, .jpg, etc.)
            publicId = publicId.split(".")[0];

            console.log("🗑 Final Corrected Cloudinary Public ID:", publicId);

            try {
                // ✅ Perform Cloudinary Deletion
                const cloudinaryResponse = await cloudinary.uploader.destroy(publicId);
                console.log("🗑 Cloudinary response:", cloudinaryResponse);
            } catch (cloudinaryError) {
                console.error("❌ Cloudinary deletion failed:", cloudinaryError);
                return res.status(500).json({ error: "Cloudinary image deletion failed" });
            }
        }

        // ✅ Delete project from MongoDB
        await Project.findByIdAndDelete(projectId);
        console.log("✅ Project deleted from database.");

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error("🔥 Error deleting project:", err);
        res.status(500).json({ error: "Failed to delete project" });
    }
});


// ✅ Update Project by ID (Admin Only)
router.put("/projects/:id", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const projectId = req.params.id;
        let updates = {
            title: req.body.title,
            description: req.body.description,
            technologies: req.body.technologies ? req.body.technologies.split(',').map(tech => tech.trim()) : undefined,
            liveDemo: req.body.liveDemo,
            sourceCode: req.body.sourceCode
        };

        // ✅ Handle new image upload
        if (req.file) {
            const project = await Project.findById(projectId);
            if (project.image) {
                // ✅ Delete old image from Cloudinary
                const cloudinaryUrlParts = project.image.split("/upload/");
                let publicId = cloudinaryUrlParts[1].split(".")[0]; // Remove extension
                publicId = publicId.replace(/^v\d+\//, ""); // Remove versioning
                await cloudinary.uploader.destroy(publicId);
            }
            updates.image = req.file.path; // ✅ Save new image URL
        }

        // ✅ Update project in MongoDB
        const updatedProject = await Project.findByIdAndUpdate(projectId, updates, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(updatedProject);
    } catch (err) {
        console.error("Error updating project:", err);
        res.status(500).json({ error: "Failed to update project" });
    }
});

// ✅ Delete Project by ID (Admin Only)
router.delete("/projects/:id", authMiddleware, async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // ✅ Delete image from Cloudinary if it exists
        if (project.image) {
            const cloudinaryUrlParts = project.image.split("/upload/");
            let publicId = cloudinaryUrlParts[1].split(".")[0]; // Remove extension
            publicId = publicId.replace(/^v\d+\//, ""); // Remove versioning
            await cloudinary.uploader.destroy(publicId);
        }

        // ✅ Delete project from MongoDB
        await Project.findByIdAndDelete(projectId);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error("Error deleting project:", err);
        res.status(500).json({ error: "Failed to delete project" });
    }
});


module.exports = router;