import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        liveDemo: "",
        sourceCode: "",
        image: null,
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Uploading...");

        const token = localStorage.getItem("adminToken");
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));

        try {
            await axios.post("http://localhost:5000/api/projects", formDataToSend, {
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            setStatus("Project uploaded successfully! ✅");
            setFormData({ title: "", description: "", technologies: "", liveDemo: "", sourceCode: "", image: null });
        } catch (error) {
            setStatus("Upload failed ❌");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6">Upload New Project</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />
                <textarea name="description" placeholder="Project Description" value={formData.description} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />
                <input type="text" name="technologies" placeholder="Technologies (comma-separated)" value={formData.technologies} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
                <input type="text" name="liveDemo" placeholder="Live Demo URL" value={formData.liveDemo} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
                <input type="text" name="sourceCode" placeholder="Source Code URL" value={formData.sourceCode} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
                <input type="file" name="image" onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />
                <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Upload</button>
                {status && <p className="mt-4 text-center">{status}</p>}
            </form>
        </div>
    );
};

export default AdminDashboard;
