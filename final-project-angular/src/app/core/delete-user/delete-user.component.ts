import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/features/cart/cart.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteUserComponent {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private auth: AuthService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    private cartService: CartService

  ) { }
  deleteUser() {
    this.usersService.deleteUser(this.auth.loggedUser?.id as number).subscribe(
      () => {
        this.dialogRef.close();
        this.auth.logout();
        this.cartService.clearCart();
        this.router.navigate(['/']);
      }
    );
  }
}
