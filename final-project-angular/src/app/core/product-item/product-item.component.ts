import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { Product } from 'src/app/shared/interfaces/product';
import { SalePipe } from 'src/app/shared/pipes/sale.pipe';

@Component({
  selector: 'app-product-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    SalePipe,
    RouterLink

  ],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() discount=false;
  @Input() products:Product[]=[]

  oldPrice(value:number,discount:number){
    return value*(1+discount/100)
  }
  addToCart(product:Product){
    console.log(product)
  }
}
