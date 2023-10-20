import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  invalidLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService:AuthService,
    private router:Router
  ) {}

  form = this.fb.group({
    email: ['',[Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ['',[Validators.required]],
  });
  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password')
  }
  onSignIn() {
    let found = this.usersService.userList.find((user) => { return user.email == this.email?.value && user.password == this.password?.value })
    if (found) {
      this.invalidLogin = false;
      this.authService.login();
      found.authorized = true;
      this.authService.loggedUser = found;
      console.log(found)
      this.form.reset();
      this.router.navigate(['/']);
    } else {
      this.form.markAllAsTouched();
      if (this.email?.value && this.password?.value) {
        this.invalidLogin = true;
      }
    }
  }
  onSignUp() {
  }

}
