const cloudinary = require('cloudinary').v2;
const { cloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


// Configure Cloudinary using credentials in .env
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Set up cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_projects',                        // Cloudinary Folder name
        allowedFormats: ['jpg', 'png', 'jpeg'],              // Allowed file formats
    }
});

// Initialize multer with cloudinary storage
const upload = multer({ storage });

module.exports = { cloudinary, upload };