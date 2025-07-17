import { findUserByID } from '#database/mongo/user.db';

class FetchRepository
{
    static async getUserById(userId) {
        return await findUserByID(userId);
    }
}

export default FetchRepository;