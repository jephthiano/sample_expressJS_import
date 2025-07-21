import Redis from 'ioredis';
import { log } from '#main_util/logger.util.js'; // adjust if your alias or path differs


const logInfo = (type, data) => log(type, data, 'info');
const logError = (type, data) => log(type, data, 'error');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    maxRetriesPerRequest: null,
    // password: process.env.REDIS_PASSWORD,
});

export { redis };
