const express = require('express');
const router = express.Router();
const Project = require('../models/Project');


// Get /projects - fetch projects with pagination ans sorting
router.get('/projects', async (req, res) => {
    try {
        //Parse pagination parameters (defaults: page 1, limit 10)
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        if (page < 1) page = 1;

        // Parse sorting parameters
        const sortField = req.query.sort || 'createdAt';                 // default sorting field
        const sortOrder = req.query.order === 'asc' ? 1 : -1;            // default sorting order is descending

        // Execute query with pagination and sorting
        const projects = await Project.find({})                          
            .sort({ [sortField]: sortOrder })                            //sort by field (e.g. createdAt)
            .skip((page - 1) * limit)                                    //skip documents for previous pages
            .limit(limit * 1);                                           //limit documents per page

            const totalProjects = await Project.countDocuments({});         //count total documents in collection
            const totalPages = Math.ceil(totalProjects / limit);            //calculate total pages

            //Return paginated results and metadata
            res.status(200).json({
                projects,
                currentPage: page,
                totalPages: totalPages,
                totalProjects: totalProjects
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching projects' });
    }
});