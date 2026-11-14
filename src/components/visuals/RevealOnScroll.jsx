import { useEffect, useRef } from 'react';

// Content is visible in HTML and without JS. Animate only below-fold elements.
export default function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  scale = 0.96,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    let animation;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stopMotion = () => {
      if (motion.matches) {
        animation?.cancel();
        observer.disconnect();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const transform =
          direction === 'left'
            ? 'translateX(-24px)'
            : direction === 'right'
              ? 'translateX(24px)'
              : direction === 'none'
                ? 'none'
                : 'translateY(20px)';
        animation = element.animate(
          [
            {
              opacity: 0.65,
              transform: `${transform === 'none' ? '' : transform} scale(${scale})`,
            },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 500, delay: Math.min(delay, 200), easing: 'ease-out' },
        );
        observer.disconnect();
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    motion.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motion.removeEventListener('change', stopMotion);
    };
  }, [delay, direction, scale]);
  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
}
