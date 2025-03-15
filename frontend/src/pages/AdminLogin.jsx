import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            

            const response = await axios.post("http://localhost:5000/api/auth/login",
                JSON.stringify(formData), // ✅ Ensure JSON data is sent
                { headers: { "Content-Type": "application/json" } }
            );

            
            localStorage.setItem("adminToken", response.data.token);
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("❌ Login Error:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Admin Login</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input type="email" name="email" onChange={handleChange} placeholder="Admin Email" required className="w-full mb-4 p-2 border rounded" />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="w-full mb-4 p-2 border rounded" />
                <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
