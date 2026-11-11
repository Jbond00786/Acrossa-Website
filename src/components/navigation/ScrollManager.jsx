import { useEffect } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { legacyRoutes } from '../../config/routes.js';

export default function ScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  useEffect(() => {
    const fragment = location.hash.slice(1);
    if (location.pathname === '/' && Object.hasOwn(legacyRoutes, fragment)) {
      navigate(legacyRoutes[fragment], { replace: true });
      return;
    }
    const frame = requestAnimationFrame(() => {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth';
      if (fragment) {
        let id;
        try {
          id = decodeURIComponent(fragment);
        } catch {
          return;
        }
        document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
      } else if (navigationType !== 'POP') {
        window.scrollTo({ top: 0, behavior });
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location, navigate, navigationType]);
  return null;
}
