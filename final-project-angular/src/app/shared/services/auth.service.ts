import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})

export class AuthService{
    loggedUser:User | null={email:'123@gmail.com',password:'123123123',phone:'+995567765542',authorized:false}

    private auth = true;
    
    get isAuthorized(){
        return this.auth;
    }
    
    constructor() { }

    login(user:User){
        this.loggedUser = user;
        this.auth = true;
    }
    logout(){
        this.loggedUser=null
        this.auth = false;
    }
}