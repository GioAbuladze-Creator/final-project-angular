import { Product } from "./product";

export interface Response {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
