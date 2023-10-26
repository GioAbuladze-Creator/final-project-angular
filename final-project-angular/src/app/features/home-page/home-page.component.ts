import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';
import { QuoteBarComponent } from 'src/app/core/quote-bar/quote-bar.component';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { Product } from 'src/app/shared/interfaces/product';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    CategoryBarComponent,
    QuoteBarComponent,
    RouterLink,

  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  categoryLinks = [
    { category: 'smartphones', img: 'https://i.dummyjson.com/data/products/2/1.jpg' },
    { category: 'laptops', img: 'https://i.dummyjson.com/data/products/6/2.jpg' },
    { category: 'groceries', img: 'https://i.dummyjson.com/data/products/21/2.jpg' },
    { category: 'womens-dresses', img: 'https://i.dummyjson.com/data/products/43/1.jpg' },
    { category: 'mens-shirts', img: 'https://i.dummyjson.com/data/products/51/3.jpg' },
    { category: 'sunglasses', img: 'https://i.dummyjson.com/data/products/82/3.jpg' }
  ];
 
  trendingProducts:Product[] = []
  discountedProducts:Product[] = []
  constructor(
    private apiService: ApiService
  ) {
    this.apiService.fetchProducts(75).subscribe((products) => {
      this.trendingProducts = products.slice(50, 75);
    })
    this.apiService.fetchProducts().subscribe((products) => {
      this.discountedProducts = products;
    })
  }
}
