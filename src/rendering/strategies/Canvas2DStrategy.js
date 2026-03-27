import { RenderStrategy } from './RenderStrategy';
import { RenderCapabilities } from '../RenderCapabilities';

export class Canvas2DStrategy extends RenderStrategy {
  constructor() {
    super('Canvas2D');
    this._setupCapabilities();
    this._contextState = {
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      filter: 'none',
      imageSmoothingEnabled: true
    };
    this._stateStack = [];
  }

  _setupCapabilities() {
    this._capabilities.add(RenderCapabilities.BASIC_SHAPES);
    this._capabilities.add(RenderCapabilities.GRADIENTS);
    this._capabilities.add(RenderCapabilities.SHADOWS);
    this._capabilities.add(RenderCapabilities.PATTERNS);
    this._capabilities.add(RenderCapabilities.TRANSFORMS);
    this._capabilities.add(RenderCapabilities.COMPOSITING);
    this._capabilities.add(RenderCapabilities.IMAGE_SMOOTHING);
  }

  beginFrame(context, frameInfo) {
    const startTime = performance.now();

    this._saveState(context);

    if (frameInfo.clearBeforeRender) {
      this.clear(context, frameInfo.bounds);
    }

    if (frameInfo.clipRegion) {
      this._applyClipRegion(context, frameInfo.clipRegion);
    }

    return {
      startTime,
      frameNumber: frameInfo.frameNumber,
      context
    };
  }

  endFrame(context, frameInfo) {
    this._restoreState(context);

    const endTime = performance.now();
    const renderTime = endTime - frameInfo.startTime;
    this.updateMetrics(renderTime);

    return {
      renderTime,
      frameNumber: frameInfo.frameNumber
    };
  }

  renderShape(context, shape, options = {}) {
    if (!shape.isVisible) return;

    const { enableOptimizations = true, quality = 'high' } = options;

    if (enableOptimizations) {
      this._applyOptimizations(context, quality);
    }

    shape.applyTransform(context);
    shape.applyStyle(context);

    this._drawShape(context, shape);

    shape.restoreTransform(context);
  }

  _drawShape(context, shape) {
    // Delegate to specific shape drawing methods
    const shapeType = shape.constructor.name;
    const drawMethod = `_draw${shapeType}`;

    if (typeof this[drawMethod] === 'function') {
      this[drawMethod](context, shape);
    } else {
      // Fallback to shape's own render method
      shape.render(context, 0);
    }
  }

  _drawRectangle(context, rectangle) {
    const { x, y, width, height, cornerRadius } = rectangle;

    if (cornerRadius > 0) {
      this._drawRoundedRect(context, x, y, width, height, cornerRadius);
    } else {
      if (rectangle.style.fillColor) {
        context.fillRect(x, y, width, height);
      }
      if (rectangle.style.strokeColor) {
        context.strokeRect(x, y, width, height);
      }
    }
  }

  _drawRoundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();

    if (context.fillStyle) context.fill();
    if (context.strokeStyle) context.stroke();
  }

  clear(context, bounds) {
    if (bounds) {
      context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
    } else {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }

  _saveState(context) {
    context.save();
    this._stateStack.push({ ...this._contextState });
  }

  _restoreState(context) {
    context.restore();
    if (this._stateStack.length > 0) {
      this._contextState = this._stateStack.pop();
    }
  }

  _applyClipRegion(context, region) {
    context.beginPath();
    if (region.type === 'rect') {
      context.rect(region.x, region.y, region.width, region.height);
    } else if (region.type === 'circle') {
      context.arc(region.x, region.y, region.radius, 0, Math.PI * 2);
    } else if (region.type === 'path') {
      region.path.forEach(point => {
        if (point.command === 'moveTo') {
          context.moveTo(point.x, point.y);
        } else if (point.command === 'lineTo') {
          context.lineTo(point.x, point.y);
        }
      });
    }
    context.clip();
  }

  _applyOptimizations(context, quality) {
    switch (quality) {
      case 'low':
        context.imageSmoothingEnabled = false;
        context.imageSmoothingQuality = 'low';
        break;
      case 'medium':
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'medium';
        break;
      case 'high':
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        break;
    }
  }
}