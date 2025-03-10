import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-black shadow-md py-4 px-6 flex justify-between items-center border-b border-gray-600 z-50">
            <h1 className="text-2xl font-bold text-white">MyPortfolio</h1>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Navbar Links */}
            <div className={`absolute top-16 right-0 w-full md:w-auto md:static md:flex bg-black md:bg-transparent md:space-x-6 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
                <Link to="/" className="block px-6 py-3 text-white cursor-pointer hover:text-secondary transition">Home</Link>
                <Link to="/projects" className="block px-6 py-3 text-white cursor-pointer hover:text-secondary transition">Projects</Link>
                <Link to="/contact" className="block px-6 py-3 text-white cursor-pointer hover:text-secondary transition">Contact</Link>
                <Link to="/admin" className="block px-6 py-3 text-white cursor-pointer hover:text-secondary transition">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
