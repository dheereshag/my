import { mod, clamp } from '../utils/math';

export class Timeline {
  constructor({ pauseStart = 0.1, transitionForward = 0.8, pauseEnd = 0.1, transitionBackward = 0.8 } = {}) {
    // Durations are expressed as fractions of 2π cycle
    this.pauseStart = pauseStart;
    this.transitionForward = transitionForward;
    this.pauseEnd = pauseEnd;
    this.transitionBackward = transitionBackward;
    this.cycle = Math.PI * 2;
  }

  // Returns easingFactor in [0,1] based on absolute time
  getFactor(time) {
    const cycleTime = mod(time, this.cycle);
    const p1 = Math.PI * this.pauseStart;
    const tF = Math.PI * this.transitionForward;
    const p2 = Math.PI * this.pauseEnd;
    const tB = Math.PI * this.transitionBackward;

    if (cycleTime < p1) {
      return 0; // pause at pattern1
    }
    if (cycleTime < p1 + tF) {
      const progress = (cycleTime - p1) / tF;
      return clamp(progress, 0, 1);
    }
    if (cycleTime < p1 + tF + p2) {
      return 1; // pause at pattern2
    }
    if (cycleTime < p1 + tF + p2 + tB) {
      const progress = (cycleTime - (p1 + tF + p2)) / tB;
      return clamp(1 - progress, 0, 1);
    }
    return 0; // final pause at pattern1
  }
}

