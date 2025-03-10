import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        emailjs
            .send(
                "service_yz5k9ag", // Replace with EmailJS Service ID
                "template_fd2gyt5", // Replace with EmailJS Template ID
                formData,
                "cjFNik5Iyx_VC21mj" // Replace with EmailJS User ID
            )
            .then(() => {
                setStatus("Message sent! ✅");
                setFormData({ name: "", email: "", message: "" });
            })
            .catch(() => {
                setStatus("Failed to send message ❌");
            });
    };

    return (
        <div id="contact" className="min-h-screen bg-white text-primary flex flex-col items-center justify-center px-6 py-16">
            <h2 className="text-4xl font-bold mb-6 text-black">📩 Get In Touch</h2>
            <p className="text-gray-600 mb-8 text-lg text-center max-w-2xl">
                Want to work together or have a question? Fill out the form or reach me on social media.
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Your Email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Your Message"
                        rows="5"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-secondary transition"
                >
                    Send Message
                </button>

                {/* Submission Status */}
                {status && <p className="mt-4 text-center text-green-600">{status}</p>}
            </form>

            {/* Social Media Links */}
            <div className="mt-8 flex space-x-6">
                <a href="https://github.com/dodomiyake" target="_blank" className="text-black text-3xl hover:text-gray-600 transition">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com/in/oluwadamilolaxajayi" target="_blank" className="text-black text-3xl hover:text-gray-600 transition">
                    <FaLinkedin />
                </a>
                <a href="mailto:oluwadamilola.william@email.com" className="text-black text-3xl hover:text-gray-600 transition">
                    <FaEnvelope />
                </a>
            </div>
        </div>
    );
};

export default Contact;
