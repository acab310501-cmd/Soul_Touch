import { useEffect, useRef } from 'react';

export default function BreathingCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const lineCount = isMobile ? 4 : 7;

    type Wave = {
      amplitude: number;
      frequency: number;
      phase: number;
      speed: number;
      yOffset: number;
      opacity: number;
    };

    const waves: Wave[] = Array.from({ length: lineCount }, (_, i) => ({
      amplitude: 18 + Math.random() * 28,
      frequency: 0.003 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.006,
      yOffset: (i / (lineCount - 1)) * 0.8 + 0.1,
      opacity: 0.08 + Math.random() * 0.12,
    }));

    let breathPhase = 0;
    let raf = 0;
    let paused = document.hidden;

    const draw = () => {
      if (paused) return;
      ctx.clearRect(0, 0, width, height);

      const breathScale = 1 + Math.sin(breathPhase) * 0.15;
      const breathAlpha = 0.7 + Math.sin(breathPhase) * 0.3;

      waves.forEach((wave) => {
        ctx.beginPath();
        const baseY = height * wave.yOffset;
        const amp = wave.amplitude * breathScale;

        for (let x = 0; x <= width; x += 4) {
          const y =
            baseY +
            Math.sin(x * wave.frequency + wave.phase) * amp +
            Math.sin(x * wave.frequency * 2.3 + wave.phase * 1.5) * amp * 0.4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(201, 169, 110, ${wave.opacity * breathAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        wave.phase += wave.speed;
      });

      breathPhase += 0.008;
      raf = requestAnimationFrame(draw);
    };

    draw();

    // Pause the animation loop when the tab is hidden or the canvas has
    // scrolled out of view, to avoid burning CPU/battery in the background.
    let isIntersecting = true;
    const updatePauseState = () => {
      const shouldPause = document.hidden || !isIntersecting;
      if (shouldPause === paused) return;
      paused = shouldPause;
      if (!paused) raf = requestAnimationFrame(draw);
    };

    document.addEventListener('visibilitychange', updatePauseState);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updatePauseState();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', updatePauseState);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
