import React from 'react';

function Camera({ onScan }) {
  return (
    <div className="camera">
      <h2>Camera</h2>
      <button onClick={() => onScan({ name: 'Placeholder Appliance' })}>
        Simulate Scan
      </button>
    </div>
  );
}

export default Camera;