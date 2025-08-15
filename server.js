import '#config/env.js';
import { connectDB, mongoose } from '#config/database.js';// Connect to DB
import { log } from '#main_util/logger.util.js';// Logger
import app from '#src/app.js'; // Import Express app
import { getEnvorThrow } from '#src/utils/mains/general.util.js';

const PORT = getEnvorThrow('PORT');

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      log('SERVER ENTRY', `🚀 Server running on port ${PORT}`, 'info');
    });

    process.on('SIGINT', async () => {
      log('SERVER ENTRY', '🛑 Shutting down server...', 'error');
      await mongoose.disconnect();
      server.close(() => process.exit(0));
    });

  } catch (err) {
    log('SERVER ENTRY', `❌ Failed to start server: ${err.message}`, 'error');
    process.exit(1);
  }
};

startServer();