import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    document.documentElement.classList.add('custom-cursor-active');

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"], input, textarea, select, label');
      setIsHovering(Boolean(interactive));
    };

    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkHover);
    document.addEventListener('mouseleave', leave);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkHover);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block transition-transform duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="h-8 w-8 rounded-full border border-gold-400/80 transition-all duration-300" />
      </div>
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
      </div>
    </>
  );
}
