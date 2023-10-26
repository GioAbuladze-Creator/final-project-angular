import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from './cart.service';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';
import { CartItem } from './cart-item.interface';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/interfaces/user';
import { listAnimation } from 'src/app/shared/animations/list-animation';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    CategoryBarComponent,
    MatDividerModule,
    MatButtonModule,
    RouterLink

  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations:[
    listAnimation
  ]
})
export class CartComponent {
  products: CartItem[] = [];
  total = 0;
  constructor(
    private cartService: CartService,
    private auth:AuthService
  ) {
    this.cartService.products$.subscribe({
      next:(products) => {
        this.products = products;
        this.total = this.cartService.getTotal(products);
        },
      error: (err) => {console.log(err)},
    });
  }
  user=this.auth.loggedUser as User;
  removeFromCart(product: CartItem) {
    this.cartService.removeFromCart(product);
  }
  
}
