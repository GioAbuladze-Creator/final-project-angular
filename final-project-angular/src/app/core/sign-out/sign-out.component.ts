import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { TopBarComponent } from '../top-bar/top-bar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/features/cart/cart.service';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignOutComponent {
  constructor(
    public dialogRef: MatDialogRef<TopBarComponent>,
    private Auth:AuthService,
    private router: Router,
    private cartService:CartService
  ) { }

  logout(): void {
    this.Auth.logout();
    this.cartService.clearCart();
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
}
