import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { ProductItemComponent } from 'src/app/core/product-item/product-item.component';
import { Product } from 'src/app/shared/interfaces/product';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-products',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    ProductItemComponent
  ],
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent implements OnInit{
  products:Product[]=[];
  discount=false;
  constructor(
    private apiService:ApiService,
    private route:ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const search = params['search'];
      if(category && search){
        this.apiService.searchProducts(search,category).subscribe(products => {
          this.products = products;
        });
      }else if(category){
        this.apiService.fetchProdOfCat(category).subscribe(products => {
          this.products = products;
        });
      }else if(search){
        this.apiService.searchProducts(search).subscribe(products => {
          this.products = products;
        });
      }
    });
  }
}
