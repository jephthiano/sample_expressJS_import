import FetchRepository from '#repository/FetchRepository.cla';
import { setApiToken, getApiToken } from '#main_util/token.util';
import UserResource from '#resource/UserResource';
import { triggerError} from '#core_util/handler.util';


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

    static async appFetchData (req){
        //get user data
        const user = await FetchRepository.getUserById(req.user.id);
        const token = getApiToken(req); // change to get token

        if(token && user){
            const data = new UserResource(user).toJSON();
            const response = {token, data}
            return response;
        }

        triggerError("User not found", [], 404);
    }
}

export default FetchService;