import React from 'react';

const SpeedSlider = ({ speed, setSpeed }) => {
  return (
    <div style={{ marginTop: '20px', width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label htmlFor="speed-slider" style={{ fontSize: '14px', fontFamily: 'sans-serif', color: '#444', fontWeight: 'bold' }}>
          Animation Speed
        </label>
        <span style={{ fontSize: '14px', fontFamily: 'monospace', color: '#666', backgroundColor: '#e0e0e0', padding: '2px 6px', borderRadius: '4px' }}>
          {Math.round(speed * 1000)}
        </span>
      </div>
      <input
        id="speed-slider"
        type="range"
        min="1"
        max="20"
        step="1"
        value={Math.round(speed * 1000)}
        onChange={(e) => setSpeed(parseInt(e.target.value, 10) / 1000)}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default SpeedSlider;
