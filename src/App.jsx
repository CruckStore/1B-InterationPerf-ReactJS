import React, { useState } from 'react';

function App() {
  const [timeTaken, setTimeTaken] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [counter, setCounter] = useState(0);

  const runLoopWithProgress = () => {
    setIsRunning(true);
    setProgress(0);
    setCounter(0);
    const startTime = performance.now();
    let sum = 0;
    const totalIterations = 100_000_000;
    const batchSize = 10_000_000;

    function loopBatch(start) {
      for (let i = start; i < start + batchSize && i < totalIterations; i++) {
        sum += i;
      }

      const currentProgress = Math.min(((start + batchSize) / totalIterations) * 100, 100);
      setProgress(currentProgress);
      setCounter(start + batchSize); 

      if (start + batchSize < totalIterations) {
        setTimeout(() => loopBatch(start + batchSize), 0); // Schedule next batch
      } else {
        const endTime = performance.now();
        setTimeTaken(endTime - startTime);
        setIsRunning(false);
      }
    }

    loopBatch(0); // Start the loop
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Performance Test: 1 Billion Iterations</h1>
      <button
        onClick={runLoopWithProgress}
        disabled={isRunning}
        style={{
          fontSize: '20px',
          padding: '10px 20px',
          marginBottom: '20px',
          cursor: isRunning ? 'not-allowed' : 'pointer',
        }}
      >
        {isRunning ? 'Running...' : 'Run Loop'}
      </button>
      
      {progress > 0 && (
        <p style={{ fontSize: '16px', marginTop: '10px' }}>
          Progress: {progress.toFixed(2)}%
        </p>
      )}
      {isRunning && (
        <p style={{ fontSize: '16px', marginTop: '10px', color: '#555' }}>
          Iterations: {(counter * 10).toLocaleString()} / 1,000,000,000
        </p>
      )}
      {timeTaken !== null && (
        <p style={{ fontSize: '18px', marginTop: '20px', color: '#4caf50' }}>
          Time taken: {(timeTaken).toFixed(2)} ms
        </p>
      )}
    </div>
  );
}

export default App;
