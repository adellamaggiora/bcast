import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  transition(':enter, :leave', [
    animate('1s ease-in-out', style({ opacity: 1 }))
  ])
]);

