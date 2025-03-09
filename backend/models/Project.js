const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },           // Link to the image (from Cloudinary)
    technologies: { type: [String], required: true },  
    liveDemo: { type: String },                        // link to live demo
    sourceCode: { type: String }                       // URL to source code repository
}, { timestamps: true });                              // automatically adds createdAt and updatedAt


module.exports = mongoose.model('Project', projectSchema);