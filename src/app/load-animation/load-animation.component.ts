import { animate, animation, AnimationBuilder, group, keyframes, style, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-load-animation',
  standalone: true,
  imports: [],
  templateUrl: './load-animation.component.html',
  styleUrl: './load-animation.component.less'
})
export class LoadAnimationComponent implements AfterViewInit {

  @ViewChildren('item') itemsElement!: QueryList<ElementRef<HTMLDivElement>>;
  private worker: Worker;

  public items = [{
    name: 'Element 1',
    percente: 65,
    position: 1
  },
  {
    name: 'Element 2',
    percente: 35,
    position: 2
  }];

  animationDuration = 1000;

  constructor(private renderer: Renderer2, private animationBuilder: AnimationBuilder) { 
    this.worker = new Worker(new URL('../simulate-worker.worker.ts', import.meta.url));

    this.worker.postMessage
  }


  ngAfterViewInit(): void {
    this.itemsElement.forEach((el: ElementRef<HTMLDivElement>) => {
      const child = el.nativeElement.querySelector('.percente');
      if (child) {
        const style = `calc(${child.textContent?.trim()}% - 65px)`
        this.renderer.setStyle(child, 'width', style)
      }
    })

  }

  async swapTwoElements(index1: number, index2: number) {
    [this.items[index1].percente, this.items[index2].percente] = [this.items[index2].percente, this.items[index1].percente];
    [this.items[index1].position, this.items[index2].position] = [this.items[index2].position, this.items[index1].position];

    [this.items[index1], this.items[index2]] = [this.items[index2], this.items[index1]];
    await this.runAnimation(index1, index2);
  }

  async runAnimation(index1: number, index2: number) {

    const el1 = this.itemsElement.get(index1);
    const el2 = this.itemsElement.get(index2);
    const animationTop = this.animationBuilder.build([
      animate(
        `${this.animationDuration}ms ease-out`,
        keyframes([
          style({ transform: `translateY(${(index2 - index1) * 60}px) translateZ(0) scale(1)`, offset: 0 }),
          style({ transform: `translateY(${(index2 - index1) * 30}px) translateZ(20px) scale(1.1)`, offset: 0.5 }),
          style({ transform: 'translateY(0) translateZ(0) scale(1)', offset: 1.0 })
        ])
      ),
    ])
    const animationBot = this.animationBuilder.build([
      animate(
        `${this.animationDuration}ms ease-out`,
        keyframes([
          style({ transform: `translateY(${(index1 - index2) * 60}px) translateZ(0) scale(1)`, offset: 0 }),
          style({ transform: `translateY(${(index1 - index2) * 30}px) translateZ(-20px) scale(0.9)`, offset: 0.5 }),
          style({ transform: 'translateY(0) translateZ(0) scale(1)', offset: 1.0 })
        ])
      ),
    ])

    const animationInc = this.animationBuilder.build([
      animate(
        `${this.animationDuration}ms ease-out`,
        keyframes([
          style({ width: "calc(35% - 65px)", offset: 0 }),
          style({ width: "calc(65% - 65px)", offset: 1.0 })
        ])
      ),
    ]);

    const animationDec = this.animationBuilder.build([
      animate(
        `${this.animationDuration}ms ease-out`,
        keyframes([
          style({ width: "calc(65% - 65px)", offset: 0 }),
          style({ width: "calc(35% - 65px)", offset: 1.0 })
        ])
      ),
    ]);

    this.animateNumberInc(this.items[index1], 35, 65, this.animationDuration)
    this.animateNumberDec(this.items[index2], 65, 35, this.animationDuration)

    animationInc.create(el2?.nativeElement.querySelector('.percente')).play();
    animationDec.create(el1?.nativeElement.querySelector('.percente')).play();

    animationTop.create(el2?.nativeElement).play();
    animationBot.create(el1?.nativeElement).play();
  }

  animateNumberInc(element: any, start: number, end: number, duration: number) {
    const stepTime = 10; // Интервал обновления (в миллисекундах)
    const step = (end - start) / (duration / stepTime); // Шаг увеличения числа

    let current = start;

    const interval = setInterval(() => {
      if (current >= end) {
        clearInterval(interval);
        element.percente = end; 
      } else {
        current += step;
        element.percente = Math.floor(current);
      }
    }, stepTime);
  }

  animateNumberDec(element: any, start: number, end: number, duration: number) {
    const stepTime = 10; // Интервал обновления (в миллисекундах)
    const step = (start - end) / (duration / stepTime); // Шаг увеличения числа

    let current = start;

    const interval = setInterval(() => {
      if (current <= end) {
        clearInterval(interval);
        element.percente = end; 
      } else {
        current -= step;
        element.percente = Math.floor(current);
      }
    }, stepTime);
  }
}
