import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { ProductItemComponent } from 'src/app/core/product-item/product-item.component';
import { Product } from 'src/app/shared/interfaces/product';
import { ApiService } from 'src/app/shared/services/api.service';
import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';
import { QuoteBarComponent } from 'src/app/core/quote-bar/quote-bar.component';
import { LoadingRollerComponent } from 'src/app/shared/components/loading-roller/loading-roller.component';

@Component({
  selector: 'app-main-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TopBarComponent,
    ProductItemComponent,
    CategoryBarComponent,
    QuoteBarComponent,
    LoadingRollerComponent
  ],
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]> = new Observable<Product[]>();
  discount = false;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const search = params['search'];
      const discount = params['discount'];

      if (category && search) {
        this.products$ = this.apiService.searchProducts(search, category)
      } else if (category) {
        this.products$ = this.apiService.fetchProdOfCat(category)
      } else if (search) {
        this.products$ = this.apiService.searchProducts(search)
      } else if (this.route.snapshot.url[0]) {
        if (this.route.snapshot.url[0].path == 'products') {
          this.router.navigate(['/error']);
        }
      }
      if (discount && discount.valueOf() == 'true') {
        this.discount = true;
      } else {
        this.discount = false;
      }
      const validQueryParams = ['category', 'search', 'discount'];
      const invalidQueryParams = Object.keys(params).filter(param => !validQueryParams.includes(param));

      if (invalidQueryParams.length > 0) {
        this.router.navigate(['/error']);
      }
    });


    if (this.route.snapshot.url[0]) {
      if (this.route.snapshot.url[0].path == 'deals') {
        this.products$ = this.apiService.fetchProducts()
        this.discount = true;
        if(this.route.snapshot.queryParams['category'] || this.route.snapshot.queryParams['search']){
          this.router.navigate(['/error']);
        }
      }
    }

  }
  ngOnDestroy(): void {
  }
}
