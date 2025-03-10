const mongoose = require('mongoose'); // Import the mongoose module
require('dotenv').config(); // Load env variables
const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projects');

const authRoutes = require("./routes/auth"); // ✅ Import auth routes


const app = express();

// ✅ Connect to MongoDB with error handling
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// ✅ CORS Configuration (Restrict to frontend)
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow frontend only
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions)); // Apply CORS settings
app.use(express.json()); // ✅ Allows JSON data in request body (req.body)


// ✅ Routes
app.use('/api', projectRoutes); // Use project routes for all requests to /api
app.use("/api/auth", authRoutes); // ✅ Use authentication routes


// ✅ Test route
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
