import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { ProductItemComponent } from 'src/app/core/product-item/product-item.component';
import { Product } from 'src/app/shared/interfaces/product';
import { ApiService } from 'src/app/shared/services/api.service';

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
  constructor( private apiService:ApiService) {}

  ngOnInit(): void {
    this.apiService.fetchProducts().subscribe((products)=>{
      this.products=products;
    });
  }
}
