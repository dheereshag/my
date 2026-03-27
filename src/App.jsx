import React, { useState } from 'react';
import SlidingEaseVerticalBars from './SlidingBars';
import TimerBadge from './components/TimerBadge';
import SpeedSlider from './components/SpeedSlider';
import { AnimationConfig } from './config/animation';
import './styles.css';

function App() {
  const [speed, setSpeed] = useState(AnimationConfig.speed);

  return (
    <div className="app-container">
      <div className="animation-wrapper">
        <div className="animation-shell">
          <div className="animation-container">
            <SlidingEaseVerticalBars speed={speed} />
          </div>
          <TimerBadge className="timer-outside" />
        </div>
        <SpeedSlider speed={speed} setSpeed={setSpeed} />
      </div>
    </div>
  );
}

export default App;
