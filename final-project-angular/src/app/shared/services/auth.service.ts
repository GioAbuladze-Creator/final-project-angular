import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})

export class AuthService{
    loggedUser:User | null=null;

    private auth = false;
    
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