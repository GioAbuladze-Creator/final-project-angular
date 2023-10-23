import { CartItem } from "src/app/features/cart/cart-item.interface";

export interface User {
    id?:number,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    phone:string,
    authorized?:boolean,
    cart?:CartItem[],
    purchased?:CartItem[]
}