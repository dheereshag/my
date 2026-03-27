import { AbstractShape } from '../core/abstracts/AbstractShape';

export class BarShape extends AbstractShape {
  constructor({ x = 0, y = 0, width = 1, height = 1, style = {}, visible = true } = {}) {
    super({ style, visible });
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  render(context) {
    if (this.height <= 0 || this.width <= 0) return;
    // Using current style applied by strategy before calling draw
    context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  update() {}

  initialize() {}

  get isVisible() {
    return true;
  }

  get boundingBox() {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }

  clone() {
    return new BarShape({ x: this.x, y: this.y, width: this.width, height: this.height, style: { ...this.style } });
  }

  intersects() { return false; }
  contains() { return false; }
}

