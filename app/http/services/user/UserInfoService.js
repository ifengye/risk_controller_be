import BaseService from '../BaseService';
import UserInfoDataRepo from '../../datarepos/user/UserInfoDataRepo';

/**
 * 用户信息服务
 */
class UserInfoService extends BaseService {
    constructor(){
        super();
    }

    async getUserInfo(param1, param2, param3){
        var userInfo = await UserInfoDataRepo.getUserInfoByIds();
        return userInfo;
    }
}

export default new UserInfoService();