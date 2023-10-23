import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { CartService } from 'src/app/features/cart/cart.service';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root',
})

export class AuthService{
    loggedUser:User | null=null;

    private auth = false;
    
    get isAuthorized(){
        return this.auth;
    }
    
    constructor(
        private cartService: CartService,
        private usersService: UsersService
    ) { 
        this.cartService.products$.subscribe({
            next:(products) => {
                if(this.loggedUser){
                    this.loggedUser.cart = products;
                    this.usersService.updateUser(this.loggedUser).subscribe();
                }
            },
            error: (err) => {console.log(err)},
        });
    }

    login(user:User){
        this.loggedUser = user;
        this.auth = true;
    }
    logout(){
        this.loggedUser=null
        this.auth = false;
    }
}