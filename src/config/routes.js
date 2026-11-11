// Update lastmod only when the page content meaningfully changes.
export const routes = [
  {
    path: '/',
    label: 'Home',
    title: 'ACROSSA | Remote Security Dispatching & Operations Support',
    description:
      'Our 45+ member team provides remote security dispatching, truck logistics coordination, field service support, and customer care in your existing platforms.',
    lastmod: '2026-11-10',
    priority: '1.0',
  },
  {
    path: '/services',
    label: 'Services',
    title: 'Remote Dispatching & Customer Care Services | ACROSSA',
    description:
      'Explore remote security dispatching, truck logistics coordination, field service support, and customer care from ACROSSA’s 45+ member team serving the US and Canada.',
    lastmod: '2026-11-10',
    priority: '0.9',
  },
  {
    path: '/how-we-work',
    label: 'How We Work',
    title: 'How Our Remote Operations Support Works | ACROSSA',
    description:
      'Agree on scope, coverage hours, access, and escalation procedures. ACROSSA’s remote team works directly in your software platforms across the US and Canada.',
    lastmod: '2026-11-10',
    priority: '0.7',
  },
  {
    path: '/about',
    label: 'About',
    title: 'About ACROSSA | A 45+ Member Remote Operations Team',
    description:
      'Founded in 2025, ACROSSA supports US and Canadian businesses with a 45+ member team delivering remote dispatching, field service support, and customer care.',
    lastmod: '2026-11-10',
    priority: '0.7',
  },
  {
    path: '/contact',
    label: 'Contact',
    title: 'Contact ACROSSA | Discuss Your Remote Operations',
    description:
      'Contact ACROSSA by email, WhatsApp, or inquiry form to discuss security dispatching, truck logistics coordination, field service support, and customer care.',
    lastmod: '2026-11-10',
    priority: '0.8',
  },
];
export const normalizePath = (path) => (path === '/' ? '/' : path.replace(/\/+$/, ''));
export const findRoute = (path) => routes.find((route) => route.path === normalizePath(path));
export const legacyRoutes = {
  home: '/',
  services: '/services',
  'how-we-work': '/how-we-work',
  about: '/about',
  contact: '/contact',
};
