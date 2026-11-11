export const site = {
  name: 'ACROSSA',
  url: 'https://acrossaops.com',
  foundingDate: '2025',
  emails: ['contact@acrossaops.com', 'info@acrossaops.com'],
  whatsapp: 'https://wa.me/message/ZC6GPMPHCVXGA1',
  logo: '/brand/acrossa-mark.png',
  socialImage: '/brand/acrossa-social.png',
  areaServed: ['US', 'CA'],
  description:
    'ACROSSA’s 45+ member remote team provides security dispatching, truck logistics coordination, field service support, and customer care across the United States and Canada, working directly inside clients’ existing software platforms.',
};
export const absoluteUrl = (path = '/') => new URL(path, `${site.url}/`).href;
