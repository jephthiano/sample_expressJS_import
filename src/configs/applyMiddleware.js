import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

const applyMiddleware = function (app) {
    const corsOptions = {
        origin: process.env.CLIENT_URL,
        allowedHeaders: "",
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'PUT']
    };
    
    // Set rate limit message
    const message = JSON.stringify({ status: false, "message": "Too many requests from this IP, please try again later." });
    
    // Define rate limit rule
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: message
    });
    
    // Apply middlewares
    app.use(cors(corsOptions)); // Set CORS
    app.use(cookieParser()); // Cookie parser
    app.use(limiter); // Set rate-limiting
    app.use(express.json()); // JSON parsing
    app.use(helmet()); // Set Helmet for security
    app.use(xss()); // Set express XSS protection
    app.use(mongoSanitize()); // Set express Mongo sanitize
};


export default applyMiddleware;
