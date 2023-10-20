import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})

export class AuthService{
    loggedUser:User={email:'123@gmail.com',password:'123123123',phone:'+995567765542',authorized:false}

    private auth = false;
    
    get isAuthorized(){
        return this.auth;
    }
    
    constructor() { }

    login(){
        this.auth = true;
    }
    logout(){
        this.auth = false;
    }
}