import { site, services, absoluteUrl } from './site.js';
import { findRoute, routes } from './routes.js';

export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );
export const serializeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

export function structuredData(route) {
  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const pageUrl = absoluteUrl(route.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: site.name,
        url: site.url,
        foundingDate: site.foundingDate,
        logo: absoluteUrl(site.logo),
        description: site.description,
        email: site.emails,
        areaServed: site.areaServed,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core services',
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            itemOffered: { '@id': `${site.url}/services#${service.id}` },
          })),
        },
        contactPoint: [
          ...site.emails.map((email) => ({
            '@type': 'ContactPoint',
            contactType: 'business inquiries',
            email,
            areaServed: site.areaServed,
            availableLanguage: 'English',
          })),
          {
            '@type': 'ContactPoint',
            contactType: 'WhatsApp business inquiries',
            url: site.whatsapp,
            areaServed: site.areaServed,
            availableLanguage: 'English',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: site.url,
        name: site.name,
        publisher: { '@id': organizationId },
        inLanguage: 'en',
        hasPart: routes.map((item) => ({
          '@type': 'WebPage',
          '@id': `${absoluteUrl(item.path)}#webpage`,
          url: absoluteUrl(item.path),
          name: item.title,
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: route.title,
        description: route.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': organizationId },
        inLanguage: 'en',
      },
      ...services.map((service) => ({
        '@type': 'Service',
        '@id': `${site.url}/services#${service.id}`,
        name: service.name,
        description: service.description,
        serviceType: service.name,
        provider: { '@id': organizationId },
        areaServed: site.areaServed,
        url: absoluteUrl('/services'),
      })),
    ],
  };
}

export function renderHead(path, { noindex = false } = {}) {
  const route = findRoute(path);
  const meta = (key, value, property = false) =>
    `<meta data-route-head ${property ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}">`;
  const title = route?.title ?? `Page Not Found | ${site.name}`;
  const description =
    route?.description ??
    `This page could not be found. Explore ${site.name}’s services or contact our team.`;
  const tags = [
    `<title data-route-head>${escapeHtml(title)}</title>`,
    meta('description', description),
    meta('robots', noindex || !route ? 'noindex, follow' : 'index, follow'),
    meta('og:type', 'website', true),
    meta('og:site_name', site.name, true),
    meta('og:title', title, true),
    meta('og:description', description, true),
    meta('og:image', absoluteUrl(site.socialImage), true),
    meta('og:image:width', '1200', true),
    meta('og:image:height', '630', true),
    meta('og:image:alt', `${site.name} — Remote operations for the United States and Canada`, true),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title),
    meta('twitter:description', description),
    meta('twitter:image', absoluteUrl(site.socialImage)),
  ];
  if (route)
    tags.push(
      `<link data-route-head rel="canonical" href="${absoluteUrl(route.path)}">`,
      meta('og:url', absoluteUrl(route.path), true),
      `<script data-route-head type="application/ld+json">${serializeJson(structuredData(route))}</script>`,
    );
  return tags.join('\n');
}
