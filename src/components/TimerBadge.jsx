import React, { useEffect, useRef, useState } from 'react';

export default function TimerBadge({ min = 1, max = 16, className = '' }) {
  const [value, setValue] = useState(min);
  const dirRef = useRef(1);
  const valRef = useRef(min);

  useEffect(() => {
    const id = setInterval(() => {
      let dir = dirRef.current;
      let v = valRef.current;

      if (v >= max) dir = -1;
      else if (v <= min) dir = 1;

      v = v + dir;
      dirRef.current = dir;
      valRef.current = v;

      setValue(v);
    }, 1000);
    return () => clearInterval(id);
  }, [min, max]);

  return (
    <div className={`timer-badge ${className}`} aria-live="polite" aria-label={`Beat ${value}`}>
      {value}
    </div>
  );
}
