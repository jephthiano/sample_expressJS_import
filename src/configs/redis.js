import Redis from 'ioredis';
import { log } from '#main_util/logger.util.js';
import { getEnvorThrow } from '#src/utils/mains/general.util.js';

const logInfo = (type, data) => log(type, data, 'info');
const logError = (type, data) => log(type, data, 'error');

const RAW_PORT = getEnvorThrow('REDIS_PORT');
const REDIS_HOST = getEnvorThrow('REDIS_HOST');
// const REDIS_PASSWORD = getEnvorThrow('REDIS_PASSWORD');

const REDIS_PORT = Number(RAW_PORT);
if (isNaN(REDIS_PORT)) logError('REDIS', `Invalid REDIS_PORT value: ${RAW_PORT}`);

const redis = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    maxRetriesPerRequest: null,
    // password: REDIS_PASSWORD,
});

logInfo('REDIS', `Connected to Redis at ${REDIS_HOST}:${REDIS_PORT}`);

export { redis };
