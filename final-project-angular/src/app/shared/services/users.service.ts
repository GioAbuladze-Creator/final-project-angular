import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root',
})

export class UsersService{
    userList:User[]=[
        {email:'123@gmail.com',password:'123123123',phone:'+995567765542',authorized:false}
    ]
}