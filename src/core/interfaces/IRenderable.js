export class IRenderable {
  constructor() {
    if (new.target === IRenderable) {
      throw new TypeError("Cannot instantiate abstract class IRenderable");
    }
  }

  render(context, deltaTime) {
    throw new Error("Method 'render' must be implemented");
  }

  update(deltaTime) {
    throw new Error("Method 'update' must be implemented");
  }

  initialize(config) {
    throw new Error("Method 'initialize' must be implemented");
  }

  dispose() {
    throw new Error("Method 'dispose' must be implemented");
  }

  get isVisible() {
    throw new Error("Getter 'isVisible' must be implemented");
  }

  get boundingBox() {
    throw new Error("Getter 'boundingBox' must be implemented");
  }
}