import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor() { }

  addToCart(product: Product) {
    const currentProducts = this.productsSubject.getValue();
    this.productsSubject.next([...currentProducts, product]);
  }

  removeFromCart(product: Product) {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.filter((p) => p.id !== product.id);
    this.productsSubject.next(updatedProducts);
  }
  
}
