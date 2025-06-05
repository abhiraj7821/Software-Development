const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    // const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const token = req.body.token;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
}

exports.isStudent = (req, res, next) => {
    try{
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: "Access denied: Not a student" });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(403).json({ message: "Forbidden" });
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied: Not an admin" });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(403).json({ message: "Forbidden" });
    }
}