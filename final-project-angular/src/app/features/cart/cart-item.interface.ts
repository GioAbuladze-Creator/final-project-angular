import { Product } from "src/app/shared/interfaces/product";

export interface CartItem {
    id: number;
    item: Product;
    quantity: number;
}