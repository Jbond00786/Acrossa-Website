import { useEffect, useRef, useState } from 'react';

export default function HeroVisual() {
  const ref = useRef(null);
  const [Scene, setScene] = useState(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Static brand visual avoids WebGL overhead on small screens and data-saving connections.
    if (media.matches || window.innerWidth < 768 || navigator.connection?.saveData) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      if (
        media.matches ||
        window.innerWidth < 768 ||
        document.hidden ||
        !ref.current ||
        ref.current.getBoundingClientRect().bottom <= 0
      )
        return;
      import('./Hero3D.jsx')
        .then((module) => {
          if (!cancelled && !media.matches && window.innerWidth >= 768)
            setScene(() => module.default);
        })
        .catch(() => {
          /* Keep the static visual on load failure. */
        });
    }, 1600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="relative h-full w-full">
      <div className="hero-static absolute inset-0" />
      {Scene && <Scene />}
    </div>
  );
}
