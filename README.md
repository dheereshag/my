# Musical Sliding Bars Animation

A mesmerizing React-based animation featuring vertical bars that slide and transform in a musical, rhythmic pattern. The visualization explores themes of balance, letting go of extremes, and finding natural harmony through motion.

## Features

- Smooth, easing transitions between patterns
- Wave motion effects during transformations
- Responsive design with centered display
- Beautiful gradient background and modern UI
- Canvas-based rendering for optimal performance

## Tech Stack

- React 18
- Vite (for fast development and building)
- HTML5 Canvas API
- Modern CSS with responsive design

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coding-task-round-1
```

2. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── animation/
│   │   ├── Animator.js            # RAF-based timekeeper
│   │   └── Timeline.js            # Cycle phases → easing factor
│   ├── config/
│   │   └── animation.js          # Animation and style constants
│   ├── core/
│   │   ├── abstracts/            # Base shape abstractions
│   │   ├── interfaces/           # IRenderable/IAnimatable contracts
│   │   └── math/                 # Transform matrix
│   ├── patterns/
│   │   ├── BarPatternGenerator.js # Pattern + matching utilities
│   │   └── Noise.js               # Seeded noise wrapper
│   ├── rendering/
│   │   ├── Renderer.js           # Strategy orchestrator
│   │   ├── RenderCapabilities.js # Feature flags + checks
│   │   └── strategies/           # Canvas2D + base strategy
│   ├── shapes/
│   │   └── BarShape.js           # Renderable bar primitive
│   ├── utils/
│   │   ├── math.js               # clamp/lerp/easing helpers
│   │   └── uuid.js               # UUID helpers
│   ├── SlidingBars.jsx           # Main animation component (refactored)
│   ├── App.jsx                   # Application wrapper
│   ├── index.jsx                 # React entry point
│   └── styles.css                # Global styles
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration
└── README.md                     # This file
```

## How It Works

The animation uses a noise function to generate two different patterns of bars. These patterns smoothly transition between each other with:
- Cubic easing functions for smooth transitions
- Wave offsets that create organic motion
- Pause periods at each pattern state
- Interpolated bar positions, heights, and widths

The animation runs at 60fps using `requestAnimationFrame` for optimal performance.

## Customization

You can modify the animation by adjusting parameters in `src/config/animation.js`:
- `bars.numLines`: Number of vertical lines
- `speed`: Animation speed (time increment per frame)
- `cycle`: Pauses and transition durations (fractions of 2π)
- `bars` colors and background

Advanced tweaks:
- Replace `Noise` with another generator in `patterns/Noise.js`
- Adjust bar generation rules in `patterns/BarPatternGenerator.js`
- Swap or extend rendering strategies via `rendering/strategies`

## License

MIT
