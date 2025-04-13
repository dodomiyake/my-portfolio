import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash } from "lucide-react"; // Icons for edit & delete

const AdminDashboard = () => {
    const [formData, setFormData] = useState({ title: "", description: "", image: null, technologies: "", liveDemo: "", sourceCode: "" });
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProjectId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
            setProjects(response.data.projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });

            let response;
            if (editingProject) {
                response = await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${editingProject}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
                });
            } else {
                response = await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
                });
            }

            setMessage(editingProject ? "✅ Project updated!" : "✅ Project uploaded!");
            setEditingProjectId(null);
            setFormData({ title: "", description: "", image: null, technologies: "", liveDemo: "", sourceCode: "" });
            fetchProjects();
        } catch (error) {
            setMessage("❌ Failed to save project.");
            console.error("Error saving project:", error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("adminToken");
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    // New function to handle edit button click
    const setEditingProject = (projectId) => {
        // Find the project with matching ID
        const projectToEdit = projects.find(project => project._id === projectId);
        
        if (projectToEdit) {
            // Set the form data with the project's current values
            setFormData({
                title: projectToEdit.title,
                description: projectToEdit.description,
                image: null, // Can't set file input value for security reasons
                technologies: projectToEdit.technologies,
                liveDemo: projectToEdit.liveDemo,
                sourceCode: projectToEdit.sourceCode
            });
            
            // Set the editing project ID
            setEditingProjectId(projectId);
        }
    };

    // Function to cancel editing
    const cancelEditing = () => {
        setEditingProjectId(null);
        setFormData({ title: "", description: "", image: null, technologies: "", liveDemo: "", sourceCode: "" });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6 pt-24">
            <h2 className="text-4xl font-bold mb-8 text-black">📂 Admin Dashboard</h2>

            {/* ✅ Upload Form */}
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">{editingProject ? "Edit Project" : "Upload New Project"}</h3>
                {message && <p className="mb-4 text-green-500">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"></textarea>
                    <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded-md" />
                    <input type="text" name="technologies" placeholder="Technologies (comma-separated)" value={formData.technologies} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
                    <input type="text" name="liveDemo" placeholder="Live Demo URL" value={formData.liveDemo} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
                    <input type="text" name="sourceCode" placeholder="Source Code URL" value={formData.sourceCode} onChange={handleChange} required className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />

                    <div className="flex gap-4">
                        <button type="submit" className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-900 transition">
                            {editingProject ? "Update" : "Upload"}
                        </button>
                        
                        {editingProject && (
                            <button 
                                type="button"
                                onClick={cancelEditing} 
                                className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 transition"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* ✅ Projects List */}
            <h3 className="text-3xl font-semibold mt-10 text-black">Your Projects</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {projects.length === 0 ? (
                    <p className="text-gray-600 text-center col-span-full">No projects uploaded yet.</p>
                ) : (
                    projects.map((project) => (
                        <div 
                            key={project._id} 
                            className={`group bg-white p-6 rounded-lg shadow-lg relative transition hover:shadow-2xl
                                      ${editingProject === project._id ? 'ring-2 ring-black' : ''}`}
                        >
                            <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md" />
                            <h4 className="font-bold text-xl mt-3 text-gray-800">{project.title}</h4>
                            <p className="text-gray-600 mt-1">{project.description}</p>

                            {/* ✅ Hidden Edit & Delete Buttons (Show on Hover) */}
                            <div className="absolute bottom-3 right-3 hidden group-hover:flex space-x-3 ">
                                <button onClick={() => setEditingProject(project._id)} className="text-black hover:text-blue-800">
                                    <Edit size={20} />
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="text-black hover:text-red-800">
                                    <Trash size={20} />
                                </button>
                            </div>
                            
                            {/* Indicator if currently being edited */}
                            {editingProject === project._id && (
                                <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                                    Editing
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div>
                {/* Added decorative footer */}           
                <p className="py-4 text-center text-gray-600 mt-auto">© {new Date().getFullYear()} Oluwadamilola Ajayi | Web Developer</p>
            </div>
        </div>
    );
};

export default AdminDashboard;