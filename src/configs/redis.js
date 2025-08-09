import Redis from 'ioredis';
import { log } from '#main_util/logger.util.js';

const logInfo = (type, data) => log(type, data, 'info');
const logError = (type, data) => log(type, data, 'error');

const rawPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST || '127.0.0.1';

if (!rawPort || !redisHost) {
    logError('REDIS', `Redis Port is not set`);
    throw new Error('Error occured on the server.');
}

const redisPort = Number(rawPort);
if (isNaN(redisPort)) {
    logError('REDIS', `Invalid REDIS_PORT value: ${rawPort}`);
    throw new Error('REDIS_PORT must be a valid number');
}

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: redisPort,
    maxRetriesPerRequest: null,
    // password: process.env.REDIS_PASSWORD,
});

logInfo('REDIS', `Connected to Redis at ${redisHost}:${redisPort}`);

export { redis };
