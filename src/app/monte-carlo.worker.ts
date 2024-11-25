/// <reference lib="webworker" />

const step = 1_000_000;

// Алгоритм Монте-Карло для оценки числа π
function estimatePi(iterations: number): number {
  let insideCircle = 0;
  let j = step;

  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      insideCircle++;
    }
    if (i === j) {
      j += step;
      postMessage((insideCircle / i) * 4)
    }
  }

  return (insideCircle / iterations) * 4;
}

// Слушаем сообщение от основного потока
addEventListener('message', ({ data }) => {
  const iterations = data;
  const piEstimate = estimatePi(iterations);
  postMessage(piEstimate); // Отправляем результат обратно в основной поток
});
