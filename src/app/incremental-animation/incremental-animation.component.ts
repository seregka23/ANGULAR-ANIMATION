import { animate, query, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-incremental-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incremental-animation.component.html',
  styleUrl: './incremental-animation.component.less',
  animations: [
    trigger('itemChange', [
      transition(':increment', [
        query(":enter", [
          style({ transform: 'translateX(-100%)', opacity: 0 }), // Начальное состояние
          animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })) // Анимация при добавлении
        ])
      ]),
      transition(':decrement',
        query(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }), // Начальное состояние
          animate('500ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 })) // Анимация при удалении
        ]))
    ])
  ]
})
export class IncrementalAnimationComponent {
  items = [
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
    { id: 3, value: 'Item 3' },
    { id: 4, value: 'Item 4' },
    { id: 5, value: 'Item 5' },
    { id: 6, value: 'Item 6' },
  ];

  addItem() {
    this.items.push({id: this.items.length + 1, value: `Item ${this.items.length + 1}`}); // Добавляем элемент в конец массива
  }

  removeItem() {
    this.items.pop(); // Удаляем последний элемент массива
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
