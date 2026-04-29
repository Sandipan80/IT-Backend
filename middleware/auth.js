const jwt = require('jsonwebtoken');

// Verify if the user is logged in
const verifyToken = (req, res, next) => {
    // Look for the header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    // Split "Bearer TOKEN_STRING" and take the second part
    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ success: false, message: "Token format is invalid." });
    }

    try {
        // IMPORTANT: Ensure this "bhullar123456789" matches your Login Controller exactly
        const verified = jwt.verify(token, process.env.JWT_SECRET || "bhullar123456789");
        req.user = verified; 
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid Token" });
    }
};

// Verify if the user is an Admin
const isAdmin = (req, res, next) => {
    console.log("User from Token:", req.user);
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Access restricted to Admins only." });
    }
};

module.exports = { verifyToken, isAdmin };