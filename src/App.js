// src/App.js
import React, { useState, useEffect } from "react";
import createWorker from "./workerSetup";

function App() {
  const [number, setNumber] = useState(10);
  const [result, setResult] = useState(null);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    // Создаем Worker при монтировании компонента
    const newWorker = createWorker();
    setWorker(newWorker);

    // Обрабатываем сообщения от Worker
    newWorker.onmessage = (event) => {
      setResult(event.data);
    };

    return () => {
      // Завершаем работу Worker при размонтировании компонента
      newWorker.terminate();
    };
  }, []);

  const handleCalculate = () => {
    // Отправляем данные в Worker
    if (worker) {
      worker.postMessage(number);
    }
  };

  return (
    <div className="App">
      <h1>Web Worker в React</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleCalculate}>Вычислить факториал</button>
      {result !== null && <h2>Результат: {result}</h2>}
    </div>
  );
}

export default App;
