import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';
import { QuoteBarComponent } from 'src/app/core/quote-bar/quote-bar.component';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { RouterLink } from '@angular/router';
import { state, style, trigger } from '@angular/animations';

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
  public animateOnScroll = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const scrollTriggerPosition = 210;

    this.animateOnScroll = scrollY > scrollTriggerPosition;

    if (this.animateOnScroll) {
      this.state = 'normal';
    } else {
      this.state = 'void';
    }
  }


  constructor() {

  }
}
