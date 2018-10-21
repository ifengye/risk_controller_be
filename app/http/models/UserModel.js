import BaseModel from './BaseModel';

class UserModel extends BaseModel {
    constructor(){
        super();
        this.table = 'users';
    }
}

export default new UserModel();