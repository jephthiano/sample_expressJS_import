import { getEnvorThrow } from '#src/utils/mains/general.util.js';
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRY = getEnvorThrow('TOKEN_EXPIRY');
const JWT_SECRET_KEY = getEnvorThrow('JWT_SECRET_KEY');
const THRESHOLD = getEnvorThrow('THRESHOLD');

const createJwtToken = async (userId) => {
    const token = jwt.sign(
        { userId },
        JWT_SECRET_KEY,
        { expiresIn: parseInt(TOKEN_EXPIRY) }// in seconds
    );

    return token ?? null;
}

const renewJwtToken = async (token) => {
    const decoded = jwt.verify(token, JWT_SECRET_KEY,);
    const userId = decoded?.id;

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    const timeLeft = decoded.exp - now;

    return timeLeft <= THRESHOLD ? createJwtToken(userId) : token;
}


const validateJwtToken = async (token) =>{
    const decoded = jwt.verify(token, JWT_SECRET_KEY,);
        return decoded?.userId ?? null;
}

export {
    createJwtToken,
    renewJwtToken,
    validateJwtToken,
 }