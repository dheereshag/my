export class Animator {
  constructor({ speed = 0.005 } = {}) {
    this.speed = speed;
    this.time = 0;
    this._rafId = null;
    this._running = false;
  }

  start(step) {
    if (this._running) return;
    this._running = true;
    const loop = () => {
      if (!this._running) return;
      this.time += this.speed;
      step(this.time);
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  }

  stop() {
    this._running = false;
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this._rafId = null;
  }

  reset() {
    this.time = 0;
  }
}

