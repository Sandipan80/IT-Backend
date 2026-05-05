const rateLimit = require('express-rate-limit');

// General limit for standard API usage
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true, 
    legacyHeaders: false,
});

// Stricter limit for sensitive operations (e.g., Auth/Vault Access)
export const strictLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 5, // Only 5 attempts allowed
    message: "Security alert: Too many login attempts. Please wait 30 minutes.",
    standardHeaders: true,
    legacyHeaders: false,
});