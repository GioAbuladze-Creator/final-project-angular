import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
  invalidLogin = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
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
            this.authService.login();
            data.authorized = true;
            this.authService.loggedUser = data;
            this.form.reset();
            //should add save to local storage
            this.router.navigate(['/']);
          } else {
            this.invalidLogin.next(true);
          }
        });

    }
  }
  onSignUp() {
  }

}
