// User.js
const mongoose = require("mongoose"); // Importing mongoose to create a schema for the User model
const bcrypt = require("bcryptjs"); // Importing bcryptjs for hashing passwords

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
}); // Defining the User schema with fields for username, password, and isAdmin status

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Check if the password is modified before hashing
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        this.password = await bcrypt.hash(this.password, salt); // Hash the password using the generated salt
        next(); // Proceed to the next middleware or save the document
    } catch (error) {
        next(error); // If an error occurs, pass it to the next middleware
    }
});

module.exports = mongoose.model("User", UserSchema);
// This code defines a Mongoose schema for a User model. The schema includes fields for username, password, and isAdmin status.
// It also includes a pre-save hook that hashes the password before saving it to the database. The model is then exported for use in other parts of the application.