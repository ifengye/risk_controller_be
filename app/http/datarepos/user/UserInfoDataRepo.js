import UserModel from '../../models/UserModel';

class UserInfoDataRepo {
    constructor(){
    }

    async getUserInfoByIds(ids){
        // var userInfo = await UserModel.execSql('select * from users where id=1');
        var fields = 'id,realname,created_at';
        var conditions = {
            '>': {
                'id': 1000,
                'created_at': '2018-01-01 00:00:00',
            },
            // '<': {
            //     'id': 1000000,
            //     'created_at': '2018-10-01 00:00:00',
            // },
            // '!=': {
            //     'id': 10000,
            // },
            // 'not in': {
            //     'id': [1,2,3,4,5,6,7,8,9],
            // },
            // 'id': 123,
            // 'realname': '123919',
        };

        var orders = {
            id: 'desc',
            mobile: 'asc',
        };
        var userInfo = await UserModel.queryWithLimit(fields, conditions, orders, 0, 10);
        return userInfo;
    }
}

export default new UserInfoDataRepo();