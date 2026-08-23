import { useState, useEffect, useRef } from "react";

/**
 * Hook para animar números de forma fluida (estilo ticker financeiro)
 */
export function useAnimatedNumber(targetValue: number, duration: number = 380): number {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const startValueRef = useRef(targetValue);
  const targetValueRef = useRef(targetValue);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Se a diferença for insignificante ou for o primeiro render, atualiza direto
    if (Math.abs(currentValue - targetValue) < 0.001) {
      setCurrentValue(targetValue);
      return;
    }

    startValueRef.current = currentValue;
    targetValueRef.current = targetValue;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Curva de interpolação easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const interpolated = startValueRef.current + (targetValueRef.current - startValueRef.current) * ease;

      setCurrentValue(interpolated);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValueRef.current);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [targetValue, duration]);

  return currentValue;
}
