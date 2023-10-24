import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  constructor(
    public dialog: MatDialog,
    private auth: AuthService
  ) { }
  editUser(enterAnimationDuration: string, exitAnimationDuration: string) {
    if (this.auth.isAuthorized) {
      this.dialog.open(SignUpComponent, {
        width: '350px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
    }
  }
}
