import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { Product } from 'src/app/shared/interfaces/product';
import { ApiService } from 'src/app/shared/services/api.service';
import { SalePipe } from 'src/app/shared/pipes/sale.pipe';
import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';

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
  ) { }
  product!: Product;
  id!: string;
  stars: { [key: number]: string } ={1:'star_border',2:'star_border',3:'star_border',4:'star_border',5:'star_border'};
  mainImage: string = '';

  changeImage(image: string) {
    this.mainImage = image;
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.id = id!;
    }
    this.apiService.fetchProduct(this.id).subscribe((data: Product) => {
      this.product = data;
      console.log(this.product);
      let rating=Math.round(this.product.rating)
      for(let i=1;i<=rating;i++){
        this.stars[i]='star'
      }
      this.mainImage = this.product.images[0];
    })
  }
  
}
