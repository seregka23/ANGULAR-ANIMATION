import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-open-close',
  standalone: true,
  imports: [],
  templateUrl: './open-close.component.html',
  styleUrl: './open-close.component.less',
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        }),
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue',
        }),
      ),
      transition('open => closed', [animate('5s')]),
      transition('closed => open', [animate('5s')]),
    ]),
    trigger('moveBlock',[
      
    ])
  ],
})
export class OpenCloseComponent {
  isOpen = true;
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
