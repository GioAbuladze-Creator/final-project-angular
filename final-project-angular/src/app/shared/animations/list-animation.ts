import { trigger, transition, query, style, stagger, animate, keyframes } from "@angular/animations";

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),
    query(':enter', stagger('100ms', [
      animate('0.5s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
      ]))
    ]), { optional: true }),
  ]),
])