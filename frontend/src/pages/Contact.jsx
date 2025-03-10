import React, { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // ✅ Load optimized tsparticles version

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

    // ✅ Initialize Particles
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <motion.div
            id="contact"
            className="relative min-h-screen bg-white text-primary flex flex-col items-center justify-center px-6 py-16 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* ✅ Particle Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: "transparent" },
                    fpsLimit: 60,
                    particles: {
                        number: { value: 100, density: { enable: true, area: 800 } },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        move: { enable: true, speed: 1.5, direction: "none" },
                        links: { enable: true, distance: 150, color: "#333333", opacity: 0.5 },
                        color: { value: "#000000" } // 🔥 Dark particles for visibility
                    }
                }}
                className="absolute top-0 left-0 w-full h-full z-0"
            />

            <motion.h2
                className="text-4xl font-bold mb-6 text-black relative z-10"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                📩 Get In Touch
            </motion.h2>

            <motion.p
                className="text-gray-600 mb-8 text-lg text-center max-w-2xl relative z-10"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                Want to work together or have a question? Fill out the form or reach me on social media.
            </motion.p>

            {/* Contact Form */}
            <motion.form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg relative z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <motion.div className="mb-4" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
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
                </motion.div>

                <motion.div className="mb-4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
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
                </motion.div>

                <motion.div className="mb-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
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
                </motion.div>

                <motion.button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-secondary transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Send Message
                </motion.button>

                {status && (
                    <motion.p
                        className="mt-4 text-center text-green-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {status}
                    </motion.p>
                )}
            </motion.form>

            {/* Social Media Links */}
            <motion.div
                className="mt-8 flex space-x-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
            >
                <motion.a
                    href="https://github.com/dodomiyake"
                    target="_blank"
                    className="text-black text-3xl hover:text-gray-600 transition"
                    whileHover={{ scale: 1.2 }}
                >
                    <FaGithub />
                </motion.a>
                <motion.a
                    href="https://linkedin.com/in/oluwadamilolaxajayi"
                    target="_blank"
                    className="text-black text-3xl hover:text-gray-600 transition"
                    whileHover={{ scale: 1.2 }}
                >
                    <FaLinkedin />
                </motion.a>
                <motion.a
                    href="mailto:oluwadamilola.william@email.com"
                    className="text-black text-3xl hover:text-gray-600 transition"
                    whileHover={{ scale: 1.2 }}
                >
                    <FaEnvelope />
                </motion.a>
            </motion.div>
        </motion.div>
    );
};

export default Contact;
