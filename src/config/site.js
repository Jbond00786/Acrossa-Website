export const services = [
  {
    id: 'security-dispatching',
    name: 'Security Dispatching',
    sector: 'Physical Security & Patrols',
    description:
      'Coordinate guard shifts, monitor tour reports, handle incident intake, and escalate issues inside your existing security platforms.',
    features: [
      {
        title: 'Guard Tour Auditing',
        description:
          'Review checkpoint scans, timestamps, and missed patrol reports against your post orders.',
      },
      {
        title: 'Incident Escalation',
        description:
          'Log incidents and notify authorized supervisors using your escalation procedures.',
      },
      {
        title: 'Shift Coverage',
        description:
          'Confirm attendance, follow up on call-offs, and coordinate approved backup officers.',
      },
      {
        title: 'Systems',
        description:
          'Work directly in your TrackTik, Silvertrac, Connecteam, Quo, or existing security tools.',
      },
    ],
  },
  {
    id: 'truck-dispatching',
    name: 'Truck Dispatching',
    sector: 'Freight & Logistics',
    description:
      'Coordinate driver check-ins, track pickup and delivery milestones, document delays, and keep brokers and customers informed.',
    features: [
      {
        title: 'Driver Check-ins',
        description:
          'Confirm pickup arrival, loading progress, route status, and delivery completion.',
      },
      {
        title: 'Delay Tracking',
        description:
          'Document detention and other delays with clear timestamps and supporting notes.',
      },
      {
        title: 'Broker & Customer Updates',
        description: 'Communicate ETAs and exceptions using your approved contacts and procedures.',
      },
      {
        title: 'Systems',
        description:
          'Work in your existing transportation management, load-board, and fleet tracking platforms.',
      },
    ],
  },
  {
    id: 'remote-it-support',
    name: 'Remote IT Support',
    sector: 'Helpdesk & Technical Assistance',
    description:
      'Help users troubleshoot everyday software, email, and connectivity issues, document support tickets, and escalate specialist problems to your IT team.',
    features: [
      {
        title: 'User Troubleshooting',
        description:
          'Guide users through approved steps for common application, email, and connectivity problems.',
      },
      {
        title: 'Ticket Management',
        description:
          'Record symptoms, troubleshooting steps, priority, and resolution notes in your helpdesk.',
      },
      {
        title: 'Authorized Access Support',
        description:
          'Follow your identity checks and access procedures for account and sign-in assistance.',
      },
      {
        title: 'Specialist Escalation',
        description:
          'Route unresolved or security-sensitive issues to your designated IT specialists. Remote access requires your authorization.',
      },
    ],
  },
  {
    id: 'call-center-customer-care',
    name: 'Call Center & Customer Care',
    sector: 'Voice & Digital Customer Support',
    description:
      'Answer customer calls, email, and chat, capture inquiries, follow up on requests, and route complaints using your scripts and CRM.',
    features: [
      {
        title: 'Call Handling',
        description:
          'Answer inbound calls and overflow queues during agreed coverage hours using your brand tone.',
      },
      {
        title: 'Email & Chat',
        description:
          'Respond to routine questions and keep customers informed through your existing channels.',
      },
      {
        title: 'CRM & Follow-up',
        description: 'Log inquiries, update customer records, and track agreed follow-up actions.',
      },
      {
        title: 'Complaint Escalation',
        description:
          'Route complex requests and complaints to the right person with clear context and handover notes.',
      },
    ],
  },
];
export const serviceList = `${services
  .slice(0, -1)
  .map(({ name }) => name)
  .join(', ')}, and ${services.at(-1).name}`;
export const site = {
  name: 'ACROSSA',
  url: 'https://acrossaops.com',
  foundingDate: '2025',
  teamSize: '45+',
  emails: ['contact@acrossaops.com', 'info@acrossaops.com'],
  whatsapp: 'https://wa.me/message/ZC6GPMPHCVXGA1',
  logo: '/brand/acrossa-mark.png',
  socialImage: '/brand/acrossa-social.png',
  areaServed: ['US', 'CA'],
  get description() {
    return `${this.name}’s ${this.teamSize} member team provides ${serviceList} across the US and Canada, working in your existing platforms.`;
  },
};
export const absoluteUrl = (path = '/') => new URL(path, `${site.url}/`).href;
