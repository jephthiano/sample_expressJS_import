// server.js
import dotenv from 'dotenv';
import express from 'express';
import { connectDB, mongoose } from '#config/database.js';// Connect to DB
import v1RouteEntry from '#route/v1/index.rou.js';// Route entry
import { log } from '#main_util/logger.util.js';// Logger
import applyMiddleware from '#middleware/applyMiddleware.js'; // move to utils or create alias #middleware if needed

dotenv.config(); // Load environment variables
const app = express();
applyMiddleware(app);// Apply middlewares

// Start the app after DB connection
connectDB().then(() => {
    app.use('/api/v1', v1RouteEntry);

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
        log('ENTRY POINT', `🚀 Server running on port ${PORT}`, 'info');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
        log('ENTRY POINT', '🛑 Shutting down server...', 'error');
        await mongoose.disconnect();
        server.close(() => process.exit(0));
    });
});