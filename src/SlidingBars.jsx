import React, { useEffect, useRef } from 'react';
import { Canvas2DStrategy } from './rendering/strategies/Canvas2DStrategy';
import { Renderer } from './rendering/Renderer';
import { AnimationConfig } from './config/animation';
import { Animator } from './animation/Animator';
import { Timeline } from './animation/Timeline';
import { easeInOutCubic, lerp } from './utils/math';
import { Noise } from './patterns/Noise';
import { BarShape } from './shapes/BarShape';
import { generateBarPattern, matchBars } from './patterns/BarPatternGenerator';

const SlidingEaseVerticalBars = ({ speed }) => {
  const canvasRef = useRef(null);
  const animatorRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
    canvas.width = AnimationConfig.canvas.width;
    canvas.height = AnimationConfig.canvas.height;

    // Setup renderer/strategy
    const strategy = new Canvas2DStrategy();
    const renderer = new Renderer(strategy);
    rendererRef.current = renderer;

    // Generate two patterns with different seeds using Noise abstraction
    const numLines = AnimationConfig.bars.numLines;
    const noise1 = new Noise(0);
    const noise2 = new Noise(5);

    const { pattern: pattern1, lineSpacing } = generateBarPattern({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      numLines,
      noise: noise1,
    });
    const { pattern: pattern2 } = generateBarPattern({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      numLines,
      noise: noise2,
    });

    // Animator and timeline
    const animator = new Animator({ speed: AnimationConfig.speed });
    const timeline = new Timeline(AnimationConfig.cycle);
    animatorRef.current = animator;

    const step = () => {
      const rawFactor = timeline.getFactor(animator.time);
      const smoothEasing = easeInOutCubic(rawFactor);

      const sweepDuration = 1.0;
      const sweepProgress = (animator.time % sweepDuration) / sweepDuration;
      
      const paddingY = canvas.height * 0.2;
      const triangleHeight = canvas.height - 2 * paddingY;
      const paddingX = canvas.width * 0.2;
      const triangleWidth = canvas.width - 2 * paddingX;
      
      // Starting base is off-screen left, ending is at canvas right edge
      const startX = -triangleWidth;
      const endX = canvas.width;
      const currentBaseX = lerp(startX, endX, sweepProgress);

      // Begin frame and clear background
      const frameInfo = renderer.begin(ctx, { clear: false });
      // Manual clear (background fill)
      ctx.fillStyle = AnimationConfig.bars.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw vertical lines
      ctx.beginPath();
      ctx.strokeStyle = AnimationConfig.bars.lineColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < numLines; i++) {
        const x = i * lineSpacing + lineSpacing / 2;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      ctx.stroke();

      // Build shapes for bars
      const shapes = [];
      for (let i = 0; i < numLines; i++) {
        const x = i * lineSpacing + lineSpacing / 2;
        const { padded1, padded2, maxBars } = matchBars(pattern1[i], pattern2[i]);
        for (let j = 0; j < maxBars; j++) {
          const b1 = padded1[j];
          const b2 = padded2[j];

          // Y is strictly fixed (no sliding, no wave)
          const y = lerp(b1.y, b2.y, smoothEasing);
          const width = lerp(b1.width, b2.width, smoothEasing);
          
          let height = 0;
          if (x >= currentBaseX && x <= currentBaseX + triangleWidth) {
            const progress = (x - currentBaseX) / triangleWidth;
            height = triangleHeight * (1 - progress);
          }

          if (height > 0.1 && width > 0.1) {
            const shape = new BarShape({ x, y, width, height, style: { fillColor: AnimationConfig.bars.barFill } });
            shapes.push(shape);
          }
        }
      }

      renderer.render(ctx, shapes, { enableOptimizations: true, quality: 'high' });
      renderer.end(ctx, frameInfo);
    };

    animator.start(step);

    return () => {
      animator.stop();
      animator.reset();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    if (animatorRef.current) {
      animatorRef.current.speed = speed;
    }
  }, [speed]);

  return (
    <div style={{ width: `${AnimationConfig.canvas.width}px`, height: `${AnimationConfig.canvas.height}px`, backgroundColor: AnimationConfig.bars.background }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default SlidingEaseVerticalBars;
