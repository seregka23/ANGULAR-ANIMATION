import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

const moveAnimation = trigger('move', [
  state('start', style({ transform: 'translateX(100px)' })),
  state('left', style({ transform: 'translateX(-50px)' })),
  state('right', style({ transform: 'translateX(50px)' })),
  transition('first <=> second', [
    animate('1s ease-in')
  ])])

@Component({
  selector: 'app-sort-animation',
  standalone: true,
  imports: [],
  templateUrl: './sort-animation.component.html',
  styleUrl: './sort-animation.component.less',
  animations: [
    trigger('swap', [
      // state('*', style({transform: 'translateX(0)'})),
      transition(
        //   ':increment', [
        //   query('.element', [
        //     style({ transform: 'translateX(-100%)', color: 'red' }),
        //     stagger(100, [
        //       animate('0.3s ease-in', style({ transform: 'translateX(0)' }))
        //     ])
        //   ])
        // ]
        //":increment"
        (fromState, toState, _element, params) => {
          console.log('from:', fromState);
          console.log('to', toState);
          console.log('elem', _element);
          console.log('param', params);
          return true
        }, [
        query(":enter", [
          style({ transform: 'translateX(-100%)' }),
          animate('0.3s ease-in', style({ transform: 'translateX(0)' }))])
      ]),
      transition(
        ":decrement", [
        query(":enter", [
          style({ transform: 'translateX(100%)' }),
          animate('0.3s ease-in', style({ transform: 'translateX(0)' }))])
      ])
      // transition(':decrement', [
      //   query('.element', [
      //     style({ transform: 'translateX(100%)', color: 'blue' }),
      //     stagger(100, [
      //       animate('0.3s ease-out', style({ transform: 'translateX(0)' }))
      //     ])
      //   ])
      // ])
    ]),
    moveAnimation
  ]
})
export class SortAnimationComponent {
  items = [5, 3, 8, 4, 2];
  sortitems = [...this.items]
  isSorting = true;

  async bubbleSort() {
    this.isSorting = true;
    for (let i = 0; i < this.items.length; i++) {
      for (let j = 0; j < this.items.length - i - 1; j++) {
        if (this.items[j] > this.items[j + 1]) {
          await this.swap(j, j + 1);
        }
      }
    }
    this.isSorting = false;
    this.items = [...this.sortitems]
    // this.isSorting = !this.isSorting
  }

  async swap(i: number, j: number) {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  trackByIndex(index: number, item: number) {
    return index; // Отслеживаем по индексу, так как значения могут быть одинаковыми
  }
}
