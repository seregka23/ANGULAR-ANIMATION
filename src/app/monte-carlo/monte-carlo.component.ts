import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monte-carlo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monte-carlo.component.html',
  styleUrl: './monte-carlo.component.less'
})
export class MonteCarloComponent {
  worker!: Worker;
  piEstimate: number | null = null; // Оценка числа π
  iterations = 1000000; // Число итераций (можно изменить для точности)
  isWorking = false;

  ngOnInit() {
    // Проверяем поддержку Web Worker
    if (typeof Worker !== 'undefined') {
      // Инициализируем worker
      this.worker = new Worker(new URL('./../monte-carlo.worker', import.meta.url));

      // Получаем результат от worker-а
      this.worker.onmessage = ({ data }) => {
        this.piEstimate = data;
        console.log(`Оценка числа π: ${this.piEstimate}`);
      };

    } else {
      console.log('Web Workers не поддерживаются в этом браузере.');
    }
  }

  startCalculation() {
    if (this.worker) {
      this.piEstimate = null;
      this.isWorking = true;
      console.log('Запуск расчета числа π...');
      this.worker.postMessage(this.iterations); // Отправляем число итераций в worker
    }
  }

  stopCalculation() {
    if (this.worker) {
      this.worker.terminate(); // Полностью завершает работу worker-а
      this.isWorking = false;
      console.log('Вычисление остановлено');
    }
  }
}
