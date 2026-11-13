export const services = [
  {
    id: 'security-dispatching',
    code: 'OPS-01',
    title: 'Security Dispatching',
    tagline: '24/7 Live Guard Monitoring, Shift Control & Incident Response',
    summary:
      'We act as your live remote command center. Our dispatchers monitor your field officers in real time, fill open shifts fast, verify GPS patrols, and write clear incident reports directly inside your existing guard management platforms.',
    tasks: [
      {
        title: 'Live Guard & GPS Tracking',
        description:
          'Real-time geofence, tour, and checkpoint monitoring to ensure officers are on-site and on schedule.',
      },
      {
        title: 'Shift Scheduling & Call-Off Coverage',
        description:
          'Immediate replacement of no-shows or late guards so no client post goes uncovered.',
      },
      {
        title: 'Alarm & Incident Escalation',
        description:
          'Instant response to field emergencies, panic alerts, and property incidents following your exact escalation protocol.',
      },
      {
        title: 'DARs & Payroll Auditing',
        description:
          'Reviewing Daily Activity Reports, patrol logs, and shift hours for accurate client billing and payroll verification.',
      },
    ],
    platforms: ['TrackTik', 'Silvertrac', 'Connecteam', 'Quo', 'RingCentral'],
    platformNote:
      'We can also operate seamlessly inside any other guard tour, scheduling, or dispatch software your company already uses.',
  },
  {
    id: 'truck-dispatching',
    code: 'OPS-02',
    title: 'Truck Dispatching',
    tagline: 'End-to-End Load Coordination, Route Tracking & Broker Communication',
    summary:
      'We keep your trucks moving and your drivers focused on the road. Our dispatch team negotiates loads, tracks routes in real time, handles broker updates, and organizes all trip paperwork inside your transportation tools.',
    tasks: [
      {
        title: 'Load Booking & Rate Negotiation',
        description:
          'Finding profitable freight on major load boards and securing strong rates with brokers and shippers.',
      },
      {
        title: 'Live Route & ELD Monitoring',
        description:
          'Tracking driver progress, weather delays, and Hours of Service (HOS) compliance from pickup to delivery.',
      },
      {
        title: 'Broker & Shipper Check Calls',
        description:
          'Managing detention requests, layover updates, appointment scheduling, and live check calls.',
      },
      {
        title: 'Dispatch Paperwork & Billing Prep',
        description:
          'Processing rate confirmations, Bills of Lading (BOLs), Proof of Delivery (PODs), and carrier packets.',
      },
    ],
    platforms: ['Samsara', 'Motive', 'DAT One', 'Truckstop', 'McLeod / AscendTMS', 'RingCentral'],
    platformNote:
      'We can also operate seamlessly inside any other TMS, ELD, load board, or fleet platform your team already runs.',
  },
  {
    id: 'remote-it-support',
    code: 'OPS-03',
    title: 'Remote IT Support',
    tagline: 'Fast Helpdesk Triage, System Troubleshooting & User Administration',
    summary:
      'We resolve technical issues before they slow down your team. Our specialists handle incoming support tickets, troubleshoot workstation and software issues remotely, and manage user accounts across your IT environment.',
    tasks: [
      {
        title: 'Tier 1 & Tier 2 Helpdesk Triage',
        description:
          'Responding to incoming IT tickets, diagnosing software glitches, and resolving daily technical blockers.',
      },
      {
        title: 'Remote Desktop Troubleshooting',
        description:
          'Securely connecting to employee devices to fix configuration, printer, VPN, and connectivity issues.',
      },
      {
        title: 'Account & Access Management',
        description:
          'Setting up new user credentials, resetting passwords, and managing permissions across cloud workspaces.',
      },
      {
        title: 'System Uptime & Alert Monitoring',
        description:
          'Watching server, network, and endpoint alerts to escalate critical outages immediately.',
      },
    ],
    platforms: [
      'Jira Service Management',
      'Zendesk',
      'Freshservice',
      'TeamViewer',
      'AnyDesk',
      'Microsoft 365 & Google Workspace',
    ],
    platformNote:
      'We can also operate seamlessly inside any other ticketing, RMM, remote access, or internal IT system your organization uses.',
  },
  {
    id: 'call-center-customer-care',
    code: 'OPS-04',
    title: 'Call Center & Customer Care',
    tagline: '24/7 Inbound Reception, Order Support & Multi-Channel Client Care',
    summary:
      'We make sure your customers never reach a voicemail. Our agents answer calls, reply to live chats and emails, book appointments, and log every interaction cleanly inside your CRM and phone systems.',
    tasks: [
      {
        title: '24/7 Live Call Answering',
        description:
          'Professional inbound reception, call routing, and after-hours overflow support with zero missed inquiries.',
      },
      {
        title: 'Multi-Channel Ticket & Chat Resolution',
        description:
          'Fast, courteous responses across email, SMS, WhatsApp, and website live chat.',
      },
      {
        title: 'Appointment & Service Booking',
        description:
          'Scheduling field visits, consultations, and customer callbacks directly on your team calendar.',
      },
      {
        title: 'CRM Logging & Quality Follow-Ups',
        description:
          'Recording call notes, updating customer records, and conducting post-service satisfaction checks.',
      },
    ],
    platforms: ['RingCentral', 'Quo', 'Five9', 'Aircall', 'Zendesk', 'HubSpot', 'Salesforce'],
    platformNote:
      'We can also operate seamlessly inside any other VoIP phone system, CRM, booking tool, or helpdesk software you already use.',
  },
].map((service) => ({
  ...service,
  // Preserve the existing contact and schema interface without duplicate copy.
  name: service.title,
  description: service.summary,
}));

export const serviceDeck = {
  eyebrow: 'Four services. One connected team.',
  title: 'Your live command deck.',
  intro:
    'Choose the operational support you need. We work inside your systems, following your workflows.',
  status: '24/7 LIVE COVERAGE',
  tasksLabel: 'Core tasks',
  platformsLabel: 'Platforms We Operate Inside — We Can Also Operate in Your Existing Platforms',
  existingPlatform: '+ Your Existing Platform',
  previewAction: 'Explore service',
  contactAction: 'Discuss this service',
  scopeTitle: 'Clear responsibility boundaries',
  scopeLabel: 'Your protocols. Your platforms.',
  scopeNote:
    'We agree on coverage hours, authorized access, and escalation procedures before work begins. Your team retains final operational authority. We do not provide HR onboarding services.',
};

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
