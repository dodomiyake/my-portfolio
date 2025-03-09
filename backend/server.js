require('dotenv').config(); // Load env variables
const express = require('express');
const cors = require('cors');


const app = express();


// Middlewares
app.use(cors());
app.use(express.json()); //Allows JSON data in request body(req.body)


// Test route

app.get('/',(req, res) => {
    res.send('Backend is running...');
})


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
