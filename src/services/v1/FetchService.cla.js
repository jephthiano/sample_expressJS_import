import FetchRepository from '#repository/FetchRepository.cla.js';
import { setApiToken } from '#main_util/token.util.js';
import UserResource from '#resource/UserResource.js';
import { triggerError} from '#core_util/handler.util.js';


class FetchService{
    static async authFetchData (user){
        //get user data
        const token = user ? await setApiToken(user.id) : null ;

        if(token && user){
            const data = new UserResource(user).toJSON();
            return {token, data};
        }

        return {};
    }

    static async appFetchData (userId, token){
        //get user data
        const user = await FetchRepository.getUserById(userId);

        if(token && user){
            const data = new UserResource(user).toJSON();
            const response = {token, data}
            return response;
        }

        triggerError("User not found", [], 404);
    }
}

export default FetchService;