import { animate, group, keyframes, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AddStyleDirective } from '../add-style.directive';


const swapAnimation = trigger('swapAnimation', [
  transition(':enter', [
    animate(
      '300ms ease-out',
      keyframes([
        style({ opacity: 0, transform: 'scale(0.8)', offset: 0 }),
        style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
      ])
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in',
      keyframes([
        style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
        style({ opacity: 0, transform: 'scale(0.8)', offset: 1 }),
      ])
    ),
  ]),
  transition('* <=> *', [
    animate(
      '500ms ease-in-out',
      keyframes([
        style({ transform: 'translateX(10px)', offset: 0.3 }),
        style({ transform: 'translateX(-10px)', offset: 0.6 }),
        style({ transform: 'translateX(0)', offset: 1 }),
      ])
    ),
  ]),
]);

const swapAnimation2 = trigger('swapAnimation', [
  transition("* => *", [
    group([
      query('.left', [
        style({ transform: 'translateX(-60px)' }),
        animate(
          '0.2s ease',
          style({ transform: 'translateX(0)' })
        ),
      ]),
      query('.right', [
        style({ transform: 'translateX(60px)' }),

        animate(
          '0.2s ease',
          style({ transform: 'translateX(0)' })
        ),
      ])
    ]),
    // style({ transform: 'translateX(-100%)' }),

    // animate(
    //   '0.5s ease',
    //   style({ transform: 'translateX(0)' })
    // ),
  ]),
  // transition('* => left', [
  //   // query(':enter', [
  //   style({ transform: 'translateX(100%)' }),
  //   stagger(100, [
  //     animate(
  //       '0.5s ease',
  //       style({ transform: 'translateX(0)' })
  //     ),
  //     // animate(
  //     //   '0.5s ease',
  //     //   style({ transform: 'translateX(0)' })
  //     // )
  //     // ])
  //   ])
  // ]),
  // transition(':decrement', [
  //   query(':enter', [
  //     style({ transform: 'translateX(-100%)' }),
  //     stagger(100, [
  //       animate(
  //         '0.5s ease',
  //         style({ transform: 'translateX(0)' })
  //       ),
  //       // animate(
  //       //   '0.5s ease',
  //       //   style({ transform: 'translateX(0)' })
  //       // )
  //     ])
  //   ], { optional: true })
  // ])
]);

interface IItem {
  id: number;
  value: number;
  state: "" | "left" | "right"
}

@Component({
  selector: 'app-swap-animation',
  standalone: true,
  imports: [CommonModule, AddStyleDirective],
  templateUrl: './swap-animation.component.html',
  styleUrl: './swap-animation.component.less',
  animations: [
    swapAnimation2
  ]
})
export class SwapAnimationComponent {
  items: IItem[] = this.generateUnorderedArray(25);
  animationState = false;
  isSorting: boolean =false;

  @ViewChildren('item') itemElements!: QueryList<ElementRef>;

  constructor(){
  }

  generateUnorderedArray(count: number): IItem[] {
    const items: IItem[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i + 1,
        value: i,//Math.floor(Math.random() * 10), // случайное значение от 0 до 99
        state: ""
      });
    }
    return items.sort(() => Math.random() - 0.5); // перемешиваем массив
  }

  async swapItems(index1: number, index2: number) {
    [this.items[index1], this.items[index2]] = [this.items[index2], this.items[index1]];

    // // Переключаем анимационное состояние, чтобы Angular применил анимацию
    this.animationState = !this.animationState;
    this.items[index1].state = 'right';
    this.items[index2].state = 'left';

    setTimeout(() => {
      this.items[index1].state = '';
      this.items[index2].state = '';
    }, 1);

    await new Promise(resolve => setTimeout(resolve, 250));

    // clearTimeout();
  }

  async bubbleSort() {
    this.isSorting = true;
    for (let i = 0; i < this.items.length; i++) {
      for (let j = 0; j < this.items.length - i - 1; j++) {
        if (this.items[j].value > this.items[j + 1].value) {
          await this.swapItems(j, j + 1);
        }
      }
    }
    this.isSorting = false;
    // this.isSorting = !this.isSorting
  }
  
  trackById(index: number, item: IItem): number {
    console.log(`Tracking item with id: ${item.id}`);
    return item.id;
  }
}
