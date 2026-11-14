import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { renderHead } from '../../config/metadata.js';

export default function RouteHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    const template = document.createElement('template');
    template.innerHTML = renderHead(pathname, {
      noindex: document.documentElement.dataset.preview === 'true',
    });
    document.head.querySelectorAll('[data-route-head]').forEach((node) => node.remove());
    document.head.append(template.content);
  }, [pathname]);
  return null;
}
