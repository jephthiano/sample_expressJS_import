// server.js
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import express from 'express';
import { connectDB, mongoose } from '#config/database.js';// Connect to DB
import v1RouteEntry from '#route/v1/index.rou.js';// Route entry
import { log } from '#main_util/logger.util.js';// Logger
import applyMiddleware from '#config/applyMiddleware.js'; // move to utils or create alias #middleware if needed

const app = express();
applyMiddleware(app);// Apply middlewares

const startServer = async () => {
  try {
    await connectDB();

    app.use('/api/v1', v1RouteEntry);

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      log('ENTRY POINT', `🚀 Server running on port ${PORT}`, 'info');
    });

    process.on('SIGINT', async () => {
      log('ENTRY POINT', '🛑 Shutting down server...', 'error');
      await mongoose.disconnect();
      server.close(() => process.exit(0));
    });

  } catch (err) {
    log('ENTRY POINT', `❌ Failed to start server: ${err.message}`, 'error');
    process.exit(1);
  }
};

startServer();
