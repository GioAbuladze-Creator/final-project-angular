import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from 'src/app/core/top-bar/top-bar.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent
  ],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

}
