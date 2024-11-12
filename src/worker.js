// Функция для вычисления факториала
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// Получаем данные от основного потока
self.onmessage = function (event) {
  const number = event.data;
  const result = factorial(number);
  // Отправляем результат обратно в основной поток
  postMessage(result);
};
