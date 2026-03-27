export const AnimationConfig = Object.freeze({
  speed: 0.005, // roughly matches previous behavior
  cycle: {
    pauseStart: 0.1,
    transitionForward: 0.8,
    pauseEnd: 0.1,
    transitionBackward: 0.8,
  },
  canvas: {
    width: 550,
    height: 550,
  },
  bars: {
    numLines: 50,
    lineColor: '#444',
    barFill: '#5E5D59',
    background: '#F0EEE6',
  },
});

