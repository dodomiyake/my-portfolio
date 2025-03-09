const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Expect "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'No token provided'});  // Unauthorized
    }
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);  // verify token
        req.user = verifiedUser;                                         // attache decoded payload (e.g. user info) to request
        next();                                                          // If token is valid, proceed
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token'});  // Forbidden
    }
}

module.exports = authMiddleware;