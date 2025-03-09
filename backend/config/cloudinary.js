const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// ✅ Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// ✅ Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_projects', // Cloudinary folder name
        allowed_formats: ['jpg', 'png', 'jpeg'], // ✅ Fixed key name
        transformation: [{ width: 800, height: 600, crop: "limit" }], // Resize (optional)
    }
});

// ✅ Initialize Multer with Cloudinary storage
const upload = multer({ storage });

module.exports = { cloudinary, upload };
