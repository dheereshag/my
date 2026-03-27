export class IAnimatable {
  constructor() {
    if (new.target === IAnimatable) {
      throw new TypeError("Cannot instantiate abstract class IAnimatable");
    }
    this._animationState = null;
    this._animationQueue = [];
  }

  play() {
    throw new Error("Method 'play' must be implemented");
  }

  pause() {
    throw new Error("Method 'pause' must be implemented");
  }

  stop() {
    throw new Error("Method 'stop' must be implemented");
  }

  reverse() {
    throw new Error("Method 'reverse' must be implemented");
  }

  seek(position) {
    throw new Error("Method 'seek' must be implemented");
  }

  get duration() {
    throw new Error("Getter 'duration' must be implemented");
  }

  get currentTime() {
    throw new Error("Getter 'currentTime' must be implemented");
  }

  get playState() {
    throw new Error("Getter 'playState' must be implemented");
  }

  onComplete(callback) {
    throw new Error("Method 'onComplete' must be implemented");
  }

  onUpdate(callback) {
    throw new Error("Method 'onUpdate' must be implemented");
  }
}