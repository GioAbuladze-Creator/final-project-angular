import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from './cart.service';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    CategoryBarComponent
    
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  products: Product[] = [];
  constructor(
    private cartService: CartService
  ) {
    this.cartService.products$.subscribe({
      next:(products) => {this.products = products},
      error: (err) => {console.log(err)},
    });
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }
}
