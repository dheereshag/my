import { IRenderable } from '../interfaces/IRenderable';
import { Transform } from '../math/Transform';
import { generateUuid } from '../../utils/uuid';

export class AbstractShape extends IRenderable {
  constructor(config = {}) {
    super();
    if (new.target === AbstractShape) {
      throw new TypeError("Cannot instantiate abstract class AbstractShape");
    }

    this._id = generateUuid();
    this._transform = new Transform();
    this._style = this._initializeStyle(config.style || {});
    this._metadata = new Map();
    this._eventListeners = new Map();
    this._disposed = false;
    this._visible = config.visible !== undefined ? config.visible : true;
    this._opacity = config.opacity || 1;
    this._zIndex = config.zIndex || 0;
  }

  _initializeStyle(style) {
    return {
      fillColor: style.fillColor || null,
      strokeColor: style.strokeColor || null,
      strokeWidth: style.strokeWidth || 1,
      lineCap: style.lineCap || 'round',
      lineJoin: style.lineJoin || 'round',
      shadowBlur: style.shadowBlur || 0,
      shadowColor: style.shadowColor || null,
      shadowOffsetX: style.shadowOffsetX || 0,
      shadowOffsetY: style.shadowOffsetY || 0,
      ...style
    };
  }

  applyTransform(context) {
    context.save();
    const { x, y, scaleX, scaleY, rotation } = this._transform.getMatrix();
    context.translate(x, y);
    context.rotate(rotation);
    context.scale(scaleX, scaleY);
  }

  restoreTransform(context) {
    context.restore();
  }

  applyStyle(context) {
    if (this._style.fillColor) {
      context.fillStyle = this._style.fillColor;
    }
    if (this._style.strokeColor) {
      context.strokeStyle = this._style.strokeColor;
      context.lineWidth = this._style.strokeWidth;
      context.lineCap = this._style.lineCap;
      context.lineJoin = this._style.lineJoin;
    }
    if (this._style.shadowBlur > 0) {
      context.shadowBlur = this._style.shadowBlur;
      context.shadowColor = this._style.shadowColor;
      context.shadowOffsetX = this._style.shadowOffsetX;
      context.shadowOffsetY = this._style.shadowOffsetY;
    }
    context.globalAlpha = this._opacity;
  }

  get id() { return this._id; }
  get transform() { return this._transform; }
  get style() { return this._style; }
  get isVisible() { return this._visible && this._opacity > 0; }
  get zIndex() { return this._zIndex; }

  setMetadata(key, value) {
    this._metadata.set(key, value);
    return this;
  }

  getMetadata(key) {
    return this._metadata.get(key);
  }

  addEventListener(event, handler) {
    if (!this._eventListeners.has(event)) {
      this._eventListeners.set(event, new Set());
    }
    this._eventListeners.get(event).add(handler);
    return this;
  }

  removeEventListener(event, handler) {
    if (this._eventListeners.has(event)) {
      this._eventListeners.get(event).delete(handler);
    }
    return this;
  }

  emit(event, data) {
    if (this._eventListeners.has(event)) {
      this._eventListeners.get(event).forEach(handler => handler(data));
    }
  }

  dispose() {
    this._eventListeners.clear();
    this._metadata.clear();
    this._disposed = true;
  }

  clone() {
    throw new Error("Method 'clone' must be implemented by subclass");
  }

  intersects(shape) {
    throw new Error("Method 'intersects' must be implemented by subclass");
  }

  contains(point) {
    throw new Error("Method 'contains' must be implemented by subclass");
  }
}