import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { Product } from 'src/app/shared/interfaces/product';
import { ApiService } from 'src/app/shared/services/api.service';
import { SalePipe } from 'src/app/shared/pipes/sale.pipe';
import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';
import { Observable, tap } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SalePipe,
    RouterLink,
    TopBarComponent,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    CategoryBarComponent
  ],
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService:CartService,
    private authService:AuthService,
    private router:Router,
    private localstorage:LocalStorageService
  ) { }
  product$!: Observable<Product>;
  id!: string;
  stars: { [key: number]: string } ={1:'star_border',2:'star_border',3:'star_border',4:'star_border',5:'star_border'};
  mainImage: string = '';

  changeImage(image: string) {
    this.mainImage = image;
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.id = id;
    }
    this.product$ = this.apiService.fetchProduct(this.id).pipe(
      tap((data:Product)=>{
        let rating=Math.floor(data.rating)
        for(let i=1;i<=rating;i++){
          this.stars[i]='star'
        }
        this.mainImage = data.images[0];
      })
      
    )
  }
  addToCart(product: Product) {
    if(!this.authService.isAuthorized){
      this.localstorage.set('redirectUrl',this.router.url)
      this.router.navigate(['/login'])
      return
    }
    this.cartService.addToCart(product);
  }
  buyNow(product: Product) {
   
  }
  
}
