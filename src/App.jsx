import React, { useState } from 'react';

function App() {
  const [timeTaken, setTimeTaken] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runLoopWithProgress = () => {
    setIsRunning(true);
    setProgress(0);
    const startTime = performance.now();
    let sum = 0;
    const totalIterations = 1_000_000_000;
    const batchSize = 10_000_000;

    function loopBatch(start) {
      for (let i = start; i < start + batchSize && i < totalIterations; i++) {
        sum += i;
      }

      const currentProgress = Math.min(((start + batchSize) / totalIterations) * 100, 100);
      setProgress(currentProgress);

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
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          height: '30px',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: progress === 100 ? '#4caf50' : '#2196f3',
            transition: 'width 0.1s',
          }}
        />
      </div>
      {progress > 0 && (
        <p style={{ fontSize: '16px', marginTop: '10px' }}>
          Progress: {progress.toFixed(2)}%
        </p>
      )}
      {timeTaken !== null && (
        <p style={{ fontSize: '18px', marginTop: '20px', color: '#4caf50' }}>
          Time taken: {timeTaken.toFixed(2)} ms
        </p>
      )}
    </div>
  );
}

export default App;
