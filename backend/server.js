const mongoose = require('mongoose'); // Import the mongoose module

require('dotenv').config(); // Load env variables
const express = require('express');
const cors = require('cors');


const app = express();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))


// Middlewares
app.use(cors());
app.use(express.json()); //Allows JSON data in request body(req.body)


// Test route

app.get('/', (req, res) => {
    res.send('Backend is running...');
})


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
