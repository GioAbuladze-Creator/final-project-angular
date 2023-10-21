import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from 'src/app/shared/interfaces/product';
import { CartItem } from './cart-item.interface';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private productsSubject = new BehaviorSubject<CartItem[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor() { }

  addToCart(product: Product) {
    const currentProducts = this.productsSubject.getValue();
    const existingProduct = currentProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity ++;
    } else {
      this.productsSubject.next([...currentProducts, { id: product.id, item: product, quantity: 1 }]);
    }
  }
  getTotal(products: CartItem[]) {
    let total=0;
    products.forEach((p) => {
      total += p.item.price * p.quantity;
    });
    return total;
  }
  removeFromCart(product: CartItem) {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.filter((p) => p.id !== product.id);
    this.productsSubject.next(updatedProducts);
  }

}
