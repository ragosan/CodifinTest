import { v4 } from 'uuid';

export class UserDataModel {
    id: string;
    user: string;
    password: string;

    constructor(user: string, password: string){
        this.id = v4();
        this.user = user;
        this.password = password;
    }
}

export class LogInDataModel {
    user: string;
    password: string;
}