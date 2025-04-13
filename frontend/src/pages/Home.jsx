import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Home = () => {
    // ✅ Initialize Particles
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine); // ✅ Load slim version for optimized performance
    }, []);

    // ✅ Optional: Handle when particles finish loading
    const particlesLoaded = (container) => {
        console.log("✅ Particles Loaded:", container);
    };

    return (
        <div id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
            {/* ✅ Particle Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded} // ✅ Ensure particles are loaded
                options={{
                    background: { color: "transparent" },
                    fpsLimit: 60,
                    particles: {
                        number: { value: 100, density: { enable: true, area: 800 } },
                        shape: { type: "circle" },
                        opacity: { value: 0.1, random: true },
                        size: { value: 3, random: true },
                        color: { value: "#000000" },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: "none",
                            // Add this to enable mouse interactivity
                            outModes: {
                                default: "bounce"
                            }
                        },
                        links: { enable: true, distance: 150, color: "#333333", opacity: 0.4 },
                    },
                    // Section for mouse interactivity
                    interactivity: {
                        detectsOn: "window",
                        events: {
                            onHover: {
                                enable: true,
                                mode: "repulse"  // This makes particles move away from cursor
                            }
                        },
                        modes: {
                            repulse: {
                                distance: 100,
                                duration: 0.4
                            }
                        }
                    }
                }}
                className="absolute top-0 left-0 w-full h-full z-0"
            />


            {/* ✅ Content Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-neutral-900 leading-tight">
                    Hi, I'm <span className="text-black">Oluwadamilola Ajayi</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 font-medium">
                    Full-Stack Web Developer | MERN Stack Enthusiast
                </p>

                {/* About Me Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-6 text-md text-gray-700 leading-relaxed space-y-4"
                >
                    <p>
                        I specialize in building dynamic, high-performance web applications that are both
                        visually appealing and functionally robust.
                        With expertise in modern UI/UX, API development, and database management,
                        I ensure seamless and efficient user experiences.
                        I am committed to writing clean, optimized code while staying up-to-date
                        with the latest technologies and trends in the ever-evolving tech industry.
                    </p>
                    <p className="font-semibold text-gray-900">
                        Let's create something impactful together! 🚀
                    </p>
                </motion.div>
            </motion.div>

            {/* ✅ Smooth Scrolling "View My Work" Button */}
            <motion.div whileHover={{ scale: 1.1 }} className="relative z-10 mt-10">
                <Link
                    to="/projects"
                    smooth={true}
                    duration={800}
                    className="px-6 py-3 text-lg bg-black text-white hover:bg-gray-800 rounded-lg transition-all shadow-md cursor-pointer font-medium"
                >
                    View My Work
                </Link>
            </motion.div>

        </div>
    );
};

export default Home;
