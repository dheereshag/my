import React from 'react';
import SlidingEaseVerticalBars from './SlidingBars';
import TimerBadge from './components/TimerBadge';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <div className="animation-wrapper">
        <div className="animation-shell">
          <div className="animation-container">
            <SlidingEaseVerticalBars />
          </div>
          <TimerBadge className="timer-outside" />
        </div>
      </div>
    </div>
  );
}

export default App;
