import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AnimationBuilder, AnimationFactory, AnimationPlayer, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AddStyleDirective } from '../add-style.directive';

@Component({
  selector: 'app-animation-builder',
  standalone: true,
  imports: [CommonModule, AddStyleDirective],
  templateUrl: './animation-builder.component.html',
  styleUrl: './animation-builder.component.less'
})
export class AnimationBuilderComponent {

  items: number[] = this.generateUnorderedArray(25);
  isSorting: boolean = false;
  @ViewChildren('item') itemElements!: QueryList<ElementRef>;
  private animationDuration = 300;
  private activeClassName = 'active-element';

  constructor(private animationBuilder: AnimationBuilder, private renderer: Renderer2) { }

  private generateUnorderedArray(count: number): number[] {
    const items: number[] = [];
    for (let i = 0; i < count; i++) {
      items.push(i);
    }
    return items.sort(() => Math.random() - 0.5); // перемешиваем массив
  }

  async compareElements(indexEl1: number, indexEl2: number, condition: boolean) {
    const el1 = this.itemElements.get(indexEl1);
    const el2 = this.itemElements.get(indexEl2);
    await this.highlightObject(el1 as ElementRef, el2 as ElementRef)
    if (condition) {
      await this.swapItems(indexEl1, indexEl2);
      await this.runAnimatioin(el1 as ElementRef, el2 as ElementRef, indexEl1 > indexEl2 ? indexEl1 - indexEl2 : indexEl2 - indexEl1)
    }
    await this.removeHighlightObject(el1 as ElementRef, el2 as ElementRef)
  }

  async bubbleSort() {
    this.isSorting = true;
    for (let i = 0; i < this.items.length; i++) {
      for (let j = 0; j < this.items.length - i - 1; j++) {
        await this.compareElements(j, j + 1, this.items[j] > this.items[j + 1]);
      }
    }
    this.isSorting = false;
  }

  async combSort() {
    this.isSorting = true;
    const factor = 1.247;
    let step = this.items.length - 1;

    while (step >= 1) {
      for (let i = 0; i + step < this.items.length; ++i) {
        await this.compareElements(i, i + step, this.items[i] > this.items[i + step])
      }
      step = Math.floor(step / factor);
    }
    this.isSorting = false;
  }

  async cocktailShakerSort() {
    this.isSorting = true;
    let left = 0;
    let right = this.items.length - 1;
    while (left <= right) {
      for (let i = right; i > left; --i) {
        await this.compareElements(i - 1, i, this.items[i - 1] > this.items[i]);
      }
      ++left;
      for (let i = left; i < right; ++i) {
        await this.compareElements(i, i + 1, this.items[i] > this.items[i + 1]);
      }
      --right;
    }
    this.isSorting = false;
  }

  async selectionSort() {
    for (let i = 0; i < this.items.length - 1; i++) {

      let minIndex = i;

      for (let j = i + 1; j < this.items.length; j++) {
        if (this.items[j] < this.items[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [this.items[i], this.items[minIndex]] = [this.items[minIndex], this.items[i]];
      }
    }
  }

  async pancakeSort() {
    const flip = async (k: number) => {
      let left = 0;
      while (left < k) {
        await this.compareElements(left, k, true)
        left++;
        k--;
      }
    };

    for (let size = this.items.length; size > 1; size--) {

      let maxIndex = 0;
      for (let i = 1; i < size; i++) {
        if (this.items[i] > this.items[maxIndex]) {
          maxIndex = i;
        }
      }

      if (maxIndex !== size - 1) {
        if (maxIndex > 0) {
          await flip(maxIndex);
        }
        await flip(size - 1);
      }
    }
  }

  async runAnimatioin(
    element1: ElementRef,
    element2: ElementRef,
    step: number = 1
  ) {
    const animationRight = this.animationBuilder.build([
      style({ transform: `translateX(${step * 60}px)` }),
      animate(
        `${this.animationDuration}ms ease-out`,
        style({ transform: 'translateX(0)' })
      ),
    ])

    const animationLeft = this.animationBuilder.build([
      style({ transform: `translateX(-${step * 60}px)` }),
      animate(
        `${this.animationDuration}ms ease-out`,
        style({ transform: 'translateX(0)' })
      ),
    ])


    const player1 = animationLeft.create(element1?.nativeElement);
    const player2 = animationRight.create(element2?.nativeElement);

    player1.play();
    player2.play();


    await new Promise(resolve => setTimeout(resolve, this.animationDuration));
  }

  async highlightObject(el1: ElementRef, el2: ElementRef) {
    this.renderer.addClass(el1?.nativeElement, this.activeClassName);
    this.renderer.addClass(el2?.nativeElement, this.activeClassName);
  }

  async removeHighlightObject(el1: ElementRef<any>, el2: ElementRef<any>) {

    await new Promise(resolve => setTimeout(resolve, this.animationDuration / 10));

    this.renderer.removeClass(el1?.nativeElement, this.activeClassName);
    this.renderer.removeClass(el2?.nativeElement, this.activeClassName);
  }

  async swapItems(index1: number, index2: number) {
    [this.items[index1], this.items[index2]] = [this.items[index2], this.items[index1]];
  }


  regenerateArray() {
    this.items = this.generateUnorderedArray(25);
  }



  async Partition(start: number, end: number) {
    let x = this.items[end];
    let less = start;

    for (let i = start; i < end; ++i) {
      if (this.items[i] <= x) {
        await this.compareElements(less, i, true)
        ++less;
      }
    }
    await this.compareElements(less, end, true);
    return less;
  }

  async QuickSortImpl(start: number, end: number) {
    if (start < end) {
      let middle = await this.Partition(start, end);
      await this.QuickSortImpl(start, middle - 1);
      await this.QuickSortImpl(middle + 1, end);
    }
  }

}
