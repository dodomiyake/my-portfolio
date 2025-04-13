// createAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

async function createAdmin() {
    const username = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        console.error("Please provide ADMIN_EMAIL and ADMIN_PASSWORD in .env");
        process.exit(1);
    }

    try {
        const adminExists = await User.findOne({ username });
        if (adminExists) {
            console.log("Admin already exists.");
            return process.exit();
        }

        const adminUser = new User({ username, password, isAdmin: true });
        await adminUser.save();

        console.log("✅ Admin user created successfully!");
    } catch (error) {
        console.error("❌ Error creating admin:", error);
    } finally {
        mongoose.connection.close();
    }
}

createAdmin();
