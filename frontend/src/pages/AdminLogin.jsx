import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
                JSON.stringify(formData),
                { headers: { "Content-Type": "application/json" } }
            );

            localStorage.setItem("adminToken", response.data.token);
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("❌ Login Error:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="flex-grow flex flex-col items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                        {error && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="Admin Email"
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer positioned at the bottom */}
            <footer className="py-4 text-center text-gray-600 mt-auto">
                <p>© {new Date().getFullYear()} Oluwadamilola Ajayi | Web Developer</p>
            </footer>
        </div>
    );
};

export default AdminLogin;