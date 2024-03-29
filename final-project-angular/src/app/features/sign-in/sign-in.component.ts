import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignUpComponent } from 'src/app/core/sign-up/sign-up.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart-item.interface';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterLink,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  invalidLogin = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    public dialog:MatDialog,
    private localStorage:LocalStorageService,   
    private cartService:CartService 
  ) { }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ['', [Validators.required]],
  });
  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password')
  }
  onSignIn() {
    if (this.form.invalid) {
      this.invalidLogin.next(true);
    } else if (this.email?.value && this.password?.value) {
      this.usersService.findUser(this.email.value, this.password.value)
        .subscribe((data) => {
          if (data) {
            this.invalidLogin.next(false);
            this.authService.login(data);
            data.authorized = true;
            this.authService.loggedUser = data;
            this.cartService.productsSubject.next([...data.cart as CartItem[]]);
            this.form.reset();

            if(this.localStorage.get('redirectUrl')){
              const navigationExtras:NavigationExtras={
                queryParamsHandling:'preserve',
                preserveFragment:true
              }
              this.router.navigateByUrl(this.localStorage.get('redirectUrl') as string,navigationExtras)
              this.localStorage.remove('redirectUrl')
            }else{
              this.router.navigate(['/'])
            }
          } else {
            this.invalidLogin.next(true);
          }
        });

    }
  }
  onSignUp(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(SignUpComponent,{
      width:'350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
