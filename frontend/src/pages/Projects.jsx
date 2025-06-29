import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchProjects = async (pageNum = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects?page=${pageNum}&limit=6`);
            if (pageNum === 1) {
                setProjects(response.data.projects);
            } else {
                setProjects(prev => [...prev, ...response.data.projects]);
            }
            setHasMore(pageNum < response.data.totalPages);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects(1);
    }, []);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProjects(nextPage);
    };

    return (
        <div id="projects" className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 pt-24">
            <h2 className="text-5xl font-bold mb-8 text-neutral-100">My Projects</h2>

            {loading ? (
                <p className="text-gray-300 text-lg">Loading projects...</p>
            ) : projects.length === 0 ? (
                <p className="text-gray-300 text-lg">No projects available.</p>
            ) : (
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            className="bg-gradient-to-br from-slate-200 to-slate-100 p-5 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }} // Hover effect
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
                        >
                            <img src={project.image ? project.image.replace('/upload/', '/upload/q_auto,f_auto/') : ''} alt={project.title} className="w-full h-55 object-cover rounded-md transition duration-300 hover:opacity-90" loading="lazy" />
                            <h3 className="text-xl font-semibold mt-4 text-black">{project.title}</h3>
                            <p className="text-stone-800 mt-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="text-xs bg-gray-800 text-white px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex mt-4 space-x-4">
                                {project.liveDemo && (
                                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition">Live Demo</a>
                                )}
                                {project.sourceCode && (
                                    <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition">Source Code</a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
            
            {hasMore && !loading && (
                <button onClick={loadMore} className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">Load More</button>
            )}
        </div>
    );
};

export default Projects;
