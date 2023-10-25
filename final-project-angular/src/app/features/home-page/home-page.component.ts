import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';
import { QuoteBarComponent } from 'src/app/core/quote-bar/quote-bar.component';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { RouterLink } from '@angular/router';
import { state, style, trigger } from '@angular/animations';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInUp', [
      state('normal', style({
        opacity: 1,
        transform: 'translateY(0)',
        "transition-duration": '1s'
      })),
      state('void', style({
        opacity: 0,
        transform: 'translateY(200px)',
        "transition-duration": '1s'
      })),
    ])
  ]
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

  state = 'void';
  trending='void';
  discounted='void';
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const triggerForCategories = 500;
    const triggerForTrending = 210;
    const triggerForDiscounted = 1570;
    
    if (scrollY > triggerForCategories) {
      this.state = 'normal';
    } else {
      this.state = 'void';
    }

    if (scrollY > triggerForTrending) {
      this.trending = 'normal';
    } else {
      this.trending = 'void';
    }

    if (scrollY > triggerForDiscounted) {
      this.discounted = 'normal';
    } else {
      this.discounted = 'void';
    }
  }

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
