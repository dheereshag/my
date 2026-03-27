export class Noise {
  constructor(seed = 0) {
    this.seed = seed;
  }

  value(x, y, t) {
    // Simple combined sinusoidal noise based on prior implementation
    const s = this.seed;
    const n = Math.sin(x * 0.02 + t + s) * Math.cos(y * 0.02 + t + s) +
              Math.sin(x * 0.03 - t - s) * Math.cos(y * 0.01 + t + s * 0.5);
    return (n + 1) / 2;
  }
}

