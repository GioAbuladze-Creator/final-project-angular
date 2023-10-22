import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quote-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './quote-bar.component.html',
  styleUrls: ['./quote-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteBarComponent {
  quote="Happiness is not in money, but in shopping"
}
