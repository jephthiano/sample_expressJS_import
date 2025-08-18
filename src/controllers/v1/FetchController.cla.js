import BaseController from '#controller/BaseController.cla.js';
import FetchService from '#service/v1/FetchService.cla.js';
import { getApiToken } from '#main_util/token.util.js';


class FetchController extends BaseController{
    static async authFetchData (id){
        return await FetchService.authFetchData(id);
    }

    static async appFetchData (req, res){
        try{
            const userId = req.user.id
            const token = getApiToken(req); // change to get token

            if (!userId || !token) this.triggerError("Request failed, try again", [], 400);


            const response = await FetchService.appFetchData(userId, token);

            return this.sendResponse(res, response, "Success");
        }catch(error){
            this.handleException(res, error);
        }
    }
    
}

export default FetchController