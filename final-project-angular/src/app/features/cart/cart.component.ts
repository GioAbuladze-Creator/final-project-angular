import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from './cart.service';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';
import { CartItem } from './cart-item.interface';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    CategoryBarComponent,
    MatDividerModule,
    MatButtonModule,

  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  products: CartItem[] = [];
  total = 0;
  constructor(
    private cartService: CartService
  ) {
    this.cartService.products$.subscribe({
      next:(products) => {
        this.products = products;
        this.total = this.cartService.getTotal(products);
        },
      error: (err) => {console.log(err)},
    });
  }

  removeFromCart(product: CartItem) {
    this.cartService.removeFromCart(product);
  }
  checkout() {
    alert('checkout');
  }
}
