const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model
const router = express.Router();

require('dotenv').config()


// Admin Credentials (Move these to .env in production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Login Route
router.post("/login", async (req, res) => {
    console.log("📤 Incoming Login Request:", req.body); // ✅ Debugging log

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("❌ Missing email or password");
        return res.status(400).json({ message: "Email and password are required" });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        console.log("❌ Invalid credentials");
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT Token
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });

    console.log("✅ Login Successful - Token Sent");
    res.json({ token });
});



module.exports = router;
