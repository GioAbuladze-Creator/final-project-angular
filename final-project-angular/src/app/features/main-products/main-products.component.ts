import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { ProductItemComponent } from 'src/app/core/product-item/product-item.component';
import { Product } from 'src/app/shared/interfaces/product';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';

@Component({
  selector: 'app-main-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TopBarComponent,
    ProductItemComponent,
    CategoryBarComponent,
  ],
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  discount = false;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const search = params['search'];
      const discount = params['discount'];
      
      if (category && search) {
        this.apiService.searchProducts(search, category).subscribe(products => {
          this.products = products;
        });
      } else if (category) {
        this.apiService.fetchProdOfCat(category).subscribe(products => {
          this.products = products;
        });
      } else if (search) {
        this.apiService.searchProducts(search).subscribe(products => {
          this.products = products;
        });
      }
      if (discount && discount.valueOf() == 'true') {
        this.discount = true;
      }else{
        this.discount = false;
      }

    });
    if(this.route.snapshot.url[0]){

      if(this.route.snapshot.url[0].path == 'deals'){
        this.apiService.fetchProducts().subscribe(products => {
          for(let i=0;i<25;i++){
            this.products.push(products[i]);
          }
          this.discount = true;
        });
      }
    }
    
  }
  ngOnDestroy(): void {
    this.products = [];
  }
}
