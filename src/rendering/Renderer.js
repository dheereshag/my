export class Renderer {
  constructor(strategy) {
    this.strategy = strategy;
    this.frameNumber = 0;
  }

  begin(context, { clear = true, bounds = null, clipRegion = null } = {}) {
    const info = this.strategy.beginFrame(context, {
      clearBeforeRender: clear,
      bounds,
      clipRegion,
      frameNumber: ++this.frameNumber
    });
    return info;
  }

  render(context, shapes, options = {}) {
    for (const shape of shapes) {
      this.strategy.renderShape(context, shape, options);
    }
  }

  end(context, frameInfo) {
    return this.strategy.endFrame(context, frameInfo);
  }
}

