import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-roller',
  standalone: true,
  imports: [CommonModule],
  template:
   `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`,
  styleUrls: ['./loading-roller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingRollerComponent {

}
