export const RenderCapabilities = Object.freeze({
  BASIC_SHAPES: Symbol('BASIC_SHAPES'),
  GRADIENTS: Symbol('GRADIENTS'),
  SHADOWS: Symbol('SHADOWS'),
  PATTERNS: Symbol('PATTERNS'),
  TRANSFORMS: Symbol('TRANSFORMS'),
  COMPOSITING: Symbol('COMPOSITING'),
  IMAGE_SMOOTHING: Symbol('IMAGE_SMOOTHING'),
  FILTERS: Symbol('FILTERS'),
  WEBGL: Symbol('WEBGL'),
  OFFSCREEN_CANVAS: Symbol('OFFSCREEN_CANVAS'),
  IMAGE_DATA: Symbol('IMAGE_DATA'),
  PATH2D: Symbol('PATH2D'),
  TEXT_RENDERING: Symbol('TEXT_RENDERING'),
  VIDEO_RENDERING: Symbol('VIDEO_RENDERING'),
  BLEND_MODES: Symbol('BLEND_MODES')
});

export class CapabilityChecker {
  static checkCanvas2DSupport() {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  }

  static checkWebGLSupport() {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  }

  static checkOffscreenCanvasSupport() {
    return typeof OffscreenCanvas !== 'undefined';
  }

  static checkPath2DSupport() {
    return typeof Path2D !== 'undefined';
  }

  static getAvailableCapabilities() {
    const capabilities = new Set();

    if (this.checkCanvas2DSupport()) {
      capabilities.add(RenderCapabilities.BASIC_SHAPES);
      capabilities.add(RenderCapabilities.GRADIENTS);
      capabilities.add(RenderCapabilities.SHADOWS);
      capabilities.add(RenderCapabilities.PATTERNS);
      capabilities.add(RenderCapabilities.TRANSFORMS);
      capabilities.add(RenderCapabilities.COMPOSITING);
      capabilities.add(RenderCapabilities.IMAGE_SMOOTHING);
      capabilities.add(RenderCapabilities.TEXT_RENDERING);
      capabilities.add(RenderCapabilities.IMAGE_DATA);
    }

    if (this.checkWebGLSupport()) {
      capabilities.add(RenderCapabilities.WEBGL);
      capabilities.add(RenderCapabilities.FILTERS);
    }

    if (this.checkOffscreenCanvasSupport()) {
      capabilities.add(RenderCapabilities.OFFSCREEN_CANVAS);
    }

    if (this.checkPath2DSupport()) {
      capabilities.add(RenderCapabilities.PATH2D);
    }

    return capabilities;
  }
}