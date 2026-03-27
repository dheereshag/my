export class Transform {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
    this._scaleX = 1;
    this._scaleY = 1;
    this._rotation = 0;
    this._skewX = 0;
    this._skewY = 0;
    this._originX = 0;
    this._originY = 0;
    this._matrix = null;
    this._dirty = true;
  }

  translate(x, y) {
    this._x += x;
    this._y += y;
    this._dirty = true;
    return this;
  }

  scale(x, y = x) {
    this._scaleX *= x;
    this._scaleY *= y;
    this._dirty = true;
    return this;
  }

  rotate(angle) {
    this._rotation += angle;
    this._dirty = true;
    return this;
  }

  skew(x, y) {
    this._skewX += x;
    this._skewY += y;
    this._dirty = true;
    return this;
  }

  setOrigin(x, y) {
    this._originX = x;
    this._originY = y;
    this._dirty = true;
    return this;
  }

  getMatrix() {
    if (this._dirty) {
      this._updateMatrix();
    }
    return {
      x: this._x,
      y: this._y,
      scaleX: this._scaleX,
      scaleY: this._scaleY,
      rotation: this._rotation,
      skewX: this._skewX,
      skewY: this._skewY
    };
  }

  _updateMatrix() {
    // Complex matrix calculation for future extensibility
    const cos = Math.cos(this._rotation);
    const sin = Math.sin(this._rotation);

    this._matrix = {
      a: this._scaleX * cos,
      b: this._scaleX * sin,
      c: -this._scaleY * sin,
      d: this._scaleY * cos,
      e: this._x,
      f: this._y
    };

    this._dirty = false;
  }

  clone() {
    const transform = new Transform(this._x, this._y);
    transform._scaleX = this._scaleX;
    transform._scaleY = this._scaleY;
    transform._rotation = this._rotation;
    transform._skewX = this._skewX;
    transform._skewY = this._skewY;
    transform._originX = this._originX;
    transform._originY = this._originY;
    return transform;
  }

  reset() {
    this._x = 0;
    this._y = 0;
    this._scaleX = 1;
    this._scaleY = 1;
    this._rotation = 0;
    this._skewX = 0;
    this._skewY = 0;
    this._originX = 0;
    this._originY = 0;
    this._dirty = true;
    return this;
  }

  compose(transform) {
    // Complex composition logic
    this._x += transform._x * this._scaleX;
    this._y += transform._y * this._scaleY;
    this._scaleX *= transform._scaleX;
    this._scaleY *= transform._scaleY;
    this._rotation += transform._rotation;
    this._skewX += transform._skewX;
    this._skewY += transform._skewY;
    this._dirty = true;
    return this;
  }
}