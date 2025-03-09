const jwt = require('jsonwebtoken');

// When an admin logs in successfully
function generateToken(user) {
    // Include minimal info, like user ID, in the JWT payload
    const payload = { id: user._id, username: user.username };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}