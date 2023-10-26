import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CartItem } from '../cart/cart-item.interface';
import { CartService } from '../cart/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent{
  products: CartItem[] = [];
  total = 2342;
  itemNum = 5;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['objectData']) {
        this.objectData = JSON.parse(params['objectData']);
      }
    });
    this.cartService.products$.subscribe({
      next: (products) => {
        if(this.objectData){
          this.products=[this.objectData]
          this.total=this.objectData.item.price
          this.itemNum=this.objectData.quantity
        }else{
          this.products = products;
          this.total = this.cartService.getTotal(products);
          this.itemNum = this.cartService.getQuantity(products);
        }
      },
      error: (err) => { console.log(err) }
    });

  }
  user = this.auth.loggedUser;

  addressForm = this.fb.group({
    fullName: [this.user?.firstname + ' ' + this.user?.lastname, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    country: [{ value: 'Georgia', disabled: true }],
    addr1: ['Tavisufleba st 25', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
    addr2: ['', [Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
    city: ['Rustavi', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    state: ['Kvemo Kartli', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    zip: [3700, [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
    phone: [this.user?.phone, [Validators.required, Validators.pattern(/^\+995\d{9}$/)]],
  })
  get fullName() {
    return this.addressForm.get('fullName');
  }
  get country() {
    return this.addressForm.get('country');
  }
  get addr1() {
    return this.addressForm.get('addr1');
  }
  get addr2() {
    return this.addressForm.get('addr2');
  }
  get city() {
    return this.addressForm.get('city');
  }
  get state() {
    return this.addressForm.get('state');
  }
  get zip() {
    return this.addressForm.get('zip');
  }
  get phone() {
    return this.addressForm.get('phone');
  }
  addressSwitch = false;
  onAddressSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      this.addressSwitch = true;
      this.addressForm.disable();
    }
  }
  onAddressEdit() {
    this.addressSwitch = false;
    this.addressForm.enable();
  }

  cardForm = this.fb.group({
    cardNumber: ['1234 5678 1234 5678', [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)]],
    cardName: ['Spaider Meni', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    cardDate: ['12/23', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
    cardCvv: ['123', [Validators.required, Validators.pattern(/^\d{3}$/)]],
  })
  get cardNumber() {
    return this.cardForm.get('cardNumber');
  }
  get cardName() {
    return this.cardForm.get('cardName');
  }
  get cardDate() {
    return this.cardForm.get('cardDate');
  }
  get cardCvv() {
    return this.cardForm.get('cardCvv');
  }
  cardSwitch = false;
  onCardSubmit() {
    this.cardForm.markAllAsTouched();
    if (this.cardForm.valid) {
      this.cardSwitch = true;
      this.cardForm.disable();
    }
  }
  onCardEdit() {
    this.cardSwitch = false;
    this.cardForm.enable();
  }
  formatCreditCardNumber() {
    const creditCardNumber = this.cardNumber?.value;
    const formattedInput = creditCardNumber?.replace(/\D/g, '');
    if (formattedInput) {
      this.cardForm.get('cardNumber')?.setValue(formattedInput.replace(/(\d{4}(?=\d))/g, '$1 '));
    }
  }
  onCheckout() {
    if (this.user?.purchased) {
      this.user?.purchased.push(...this.products);
    }
    if(!this.objectData){
      this.cartService.clearCart();
    }
    this.cardSwitch = false;
    this.cardForm.enable();
    this.addressSwitch = false;
    this.addressForm.enable();
    this.cardForm.reset();
    this.addressForm.reset();
    alert('Your order has been placed successfully!');
    this.router.navigate(['/']);
  }
  objectData: CartItem | undefined;
}
