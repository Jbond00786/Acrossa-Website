import { site, services, serviceList } from './site.js';
// Update lastmod only when the page content meaningfully changes.
export const routes = [
  {
    path: '/',
    label: 'Home',
    title: `${site.name} | ${services[0].name} & Remote Services`,
    description: `${serviceList} from ${site.name}’s ${site.teamSize} member team, working in your existing platforms.`,
    lastmod: '2026-11-11',
    priority: '1.0',
  },
  {
    path: '/services',
    label: 'Services',
    title: `Our Four Core Services | ${site.name}`,
    description: `Explore ${serviceList} for businesses across the US and Canada.`,
    lastmod: '2026-11-11',
    priority: '0.9',
  },
  {
    path: '/how-we-work',
    label: 'How We Work',
    title: `How Our Remote Services Work | ${site.name}`,
    description: `Plan coverage, platform access, and escalation for ${serviceList}.`,
    lastmod: '2026-11-11',
    priority: '0.7',
  },
  {
    path: '/about',
    label: 'About',
    title: `About ${site.name} | Your Remote Services Team`,
    description: `Founded in ${site.foundingDate}, ${site.name} provides ${serviceList} with a ${site.teamSize} member team.`,
    lastmod: '2026-11-11',
    priority: '0.7',
  },
  {
    path: '/contact',
    label: 'Contact',
    title: `Contact ${site.name} | Discuss Your Service Needs`,
    description: `Contact ${site.name} by email, WhatsApp, or inquiry form for ${serviceList}.`,
    lastmod: '2026-11-11',
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
