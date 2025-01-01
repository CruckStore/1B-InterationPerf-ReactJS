import React, { useState } from 'react';

function App() {
  const [timeTaken, setTimeTaken] = useState(null);

  const runLoop = () => {
    const startTime = performance.now();
    let sum = 0;

    for (let i = 0; i < 1_000_000_000; i++) {
      sum += i;
    }

    const endTime = performance.now(); 
    setTimeTaken(endTime - startTime); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Performance Test: 1 Billion Iterations</h1>
      <button onClick={runLoop} style={{ fontSize: '20px', padding: '10px 20px' }}>
        Run Loop
      </button>
      {timeTaken !== null && (
        <p style={{ fontSize: '18px', marginTop: '20px' }}>
          Time taken: {timeTaken.toFixed(2)} ms
        </p>
      )}
    </div>
  );
}

export default App;
