export function generateBarPattern({
  canvasWidth,
  canvasHeight,
  numLines,
  noise,
}) {
  const pattern = [];
  const lineSpacing = canvasWidth / numLines;
  const centerY = canvasHeight / 2;

  const paddingY = canvasHeight * 0.2; // 20% vertical padding
  const paddingX = canvasWidth * 0.2; // 20% horizontal padding

  for (let i = 0; i < numLines; i++) {
    const lineBars = [];
    const x = i * lineSpacing + lineSpacing / 2;
    
    // Always generate the width noise value across the entire field
    // so it can dynamically power the moving bounding mask later
    const noiseVal = noise.value(x, centerY, 0);
    const barWidth = 4 + noiseVal * 4; 
    
    lineBars.push({ 
      y: centerY, 
      height: 1, // Dummy height, uniquely calculated per frame
      width: barWidth 
    });
    
    pattern.push(lineBars);
  }

  return { pattern, lineSpacing };
}

export function matchBars(bars1, bars2) {
  // Directly interpolate the properties of the single 1-1 matched bar per line.
  // This fully eliminates any fading-in/out fragments or vertical padding offsets.
  const maxBars = Math.max(bars1.length, bars2.length);
  const padded1 = Array.from({ length: maxBars }, (_, j) => bars1[j] || { y: bars2[j]?.y ?? 0, height: 0, width: 0 });
  const padded2 = Array.from({ length: maxBars }, (_, j) => bars2[j] || { y: bars1[j]?.y ?? 0, height: 0, width: 0 });
  
  return { padded1, padded2, maxBars };
}
