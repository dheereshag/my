export class RenderStrategy {
  constructor(name) {
    if (new.target === RenderStrategy) {
      throw new TypeError("Cannot instantiate abstract class RenderStrategy");
    }
    this._name = name;
    this._capabilities = new Set();
    this._performanceMetrics = {
      frameCount: 0,
      totalRenderTime: 0,
      averageRenderTime: 0,
      lastRenderTime: 0
    };
  }

  get name() { return this._name; }
  get capabilities() { return this._capabilities; }
  get metrics() { return { ...this._performanceMetrics }; }

  supportsCapability(capability) {
    return this._capabilities.has(capability);
  }

  beginFrame(context, frameInfo) {
    throw new Error("Method 'beginFrame' must be implemented");
  }

  endFrame(context, frameInfo) {
    throw new Error("Method 'endFrame' must be implemented");
  }

  renderShape(context, shape, options = {}) {
    throw new Error("Method 'renderShape' must be implemented");
  }

  clear(context, bounds) {
    throw new Error("Method 'clear' must be implemented");
  }

  updateMetrics(renderTime) {
    this._performanceMetrics.frameCount++;
    this._performanceMetrics.totalRenderTime += renderTime;
    this._performanceMetrics.averageRenderTime =
      this._performanceMetrics.totalRenderTime / this._performanceMetrics.frameCount;
    this._performanceMetrics.lastRenderTime = renderTime;
  }

  resetMetrics() {
    this._performanceMetrics.frameCount = 0;
    this._performanceMetrics.totalRenderTime = 0;
    this._performanceMetrics.averageRenderTime = 0;
    this._performanceMetrics.lastRenderTime = 0;
  }
}