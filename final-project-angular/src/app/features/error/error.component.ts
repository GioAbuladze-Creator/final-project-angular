import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';
import { CategoryBarComponent } from 'src/app/core/category-bar/category-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TopBarComponent,
    CategoryBarComponent
  ],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  constructor(
    private router: Router
  ) { }

  goHome() {
    this.router.navigate(['/']);
  }
}
