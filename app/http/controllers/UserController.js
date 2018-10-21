import BaseController from './BaseController';
import UserInfoService from '../services/user/UserInfoService';

class UserController extends BaseController{
    constructor () {
        super()
    }
    async getUserInfo (req, res, next) {
        try {
            console.log('guoguo');
            var param1 = 1;
            var param2 = 2;
            var param3 = 3;
            var userInfo = await UserInfoService.getUserInfo(param1, param2, param3);

            res.json(userInfo);
        } catch (err) {
            console.log(err);
        }
    }
}
export default new UserController()