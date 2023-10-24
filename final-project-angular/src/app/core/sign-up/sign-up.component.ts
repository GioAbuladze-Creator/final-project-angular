import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

import { ConfPassValidator } from 'src/app/shared/validators/confirm-password.validator';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  status = 'Become Ubnisi Member';
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<SignUpComponent>,
    private auth: AuthService
  ) {
    if (this.auth.isAuthorized) {
      this.status = 'Edit Profile';
      this.agreement?.setValue(true);
      this.agreement?.disable();
      
      this.form.patchValue({
        firstname: this.auth.loggedUser?.firstname,
        lastname: this.auth.loggedUser?.lastname,
        email: this.auth.loggedUser?.email,
        phone: this.auth.loggedUser?.phone,
        password: this.auth.loggedUser?.password,
        confirmPassword: this.auth.loggedUser?.password,
      })
    }
  }
  public form = this.fb.group({
    firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{7,}$/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{7,}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+995\d{9}$/)]],
    agreement: [false, [Validators.required]]
  }, { validators: ConfPassValidator });

  get firstname() { return this.form.get('firstname'); }
  get lastname() { return this.form.get('lastname'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get phone() { return this.form.get('phone'); }
  get agreement() { return this.form.get('agreement'); }

  public isDisabled(): boolean {
    return this.password?.value !== this.confirmPassword?.value || !this.agreement?.value
  }
  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      if(this.auth.isAuthorized) {
        let newUser={
          ...this.auth.loggedUser!,
          firstname: this.firstname?.value!,
          lastname: this.lastname?.value!,
          email: this.email?.value!,
          password: this.password?.value!,
          phone: this.phone?.value!,
        }
        this.usersService.updateUser(newUser).subscribe(
          {
            next: () => {
              this.form.reset();
              setTimeout(() => {
                alert('You have successfully updated your profile');
                this.form.markAsUntouched();
                this.auth.loggedUser = newUser;
                this.dialogRef.close();
              })
            },
            error: () => alert('Something went wrong')
          }
        )
      }else{

        this.usersService.findUser(this.email?.value!, this.password?.value!).subscribe(
          {
            next: (user) => {
              if (user) {
                alert('User already exists')
              } else {
                this.usersService.checkUser(this.email?.value!, this.phone?.value!).subscribe({
                  next: (user) => {
                    if (user) {
                      alert('User already exists')
                    } else {
                      this.usersService.addUser(
                        {
                          firstname: this.firstname?.value!,
                          lastname: this.lastname?.value!,
                          email: this.email?.value!,
                          password: this.password?.value!,
                          phone: this.phone?.value!,
                          cart: [],
                          purchased: []
                        }
                      ).subscribe(
                        {
                          next: () => {
                            this.form.reset();
                            setTimeout(() => {
                              alert('You have successfully registered');
                              this.form.markAsUntouched();
                              this.dialogRef.close();
                            })
                          },
                          error: () => alert('Something went wrong')
                        }
                      )
                    }
                  },
                  error: () => alert('Something went wrong')
                })
  
              }
            },
            error: () => alert('Something went wrong')
          }
        )
      }


    }
  }
}
