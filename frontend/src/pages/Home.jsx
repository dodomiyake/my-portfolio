import React from "react";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div id="home" className="min-h-screen flex flex-col items-center justify-center bg-stone-100 text-white px-6">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-6xl font-extrabold mb-4 text-neutral-800">
                    Hi, I'm <span className="text-neutral-950">Oluwadamilola Ajayi</span>
                </h1>
                <p className="text-xl text-gray-600">Full-Stack Web Developer | MERN Stack Enthusiast</p>
            </motion.div>

            {/* Call-to-Action Button */}
            <motion.a
                href="#projects"
                whileHover={{ scale: 1.1 }}
                className="mt-8 px-6 py-3 text-lg bg-gray-900 hover:bg-gray-800 rounded-lg transition-all shadow-lg"
            >
                View My Work
            </motion.a>
        </div>
    );
};

export default Home;
