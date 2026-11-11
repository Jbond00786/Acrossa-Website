import { useState } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import RevealOnScroll from '../visuals/RevealOnScroll.jsx';

const PlatformIntegrationGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  const platforms = [
    {
      name: 'TrackTik',
      category: 'security',
      catLabel: 'Security Operations',
      badge: 'Guard & DAR Audits',
      desc: 'Live tour checkpoint monitoring, geofence patrol tracking, and real-time incident report verification.',
      color: 'from-blue-600 to-indigo-700',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0F172A" />
          <path d="M12 14h16M20 14v16" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="20" cy="14" r="2.5" fill="#FFFFFF" />
          <circle cx="20" cy="22" r="1.5" fill="#38BDF8" />
          <path
            d="M15 28c2.5 2 7.5 2 10 0"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      ),
    },
    {
      name: 'Silvertrac',
      category: 'security',
      catLabel: 'Security Patrols',
      badge: 'Incident Logging',
      desc: 'Daily Activity Report (DAR) auditing, automated post orders, and priority supervisor dispatch.',
      color: 'from-slate-700 to-slate-900',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#1E293B" />
          <path
            d="M20 8l10 4v8c0 7-5 12-10 14-5-2-10-7-10-14v-8l10-4z"
            stroke="#CBD5E1"
            strokeWidth="2"
            fill="#0F172A"
          />
          <path
            d="M16 20l3 3 6-6"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'Connecteam',
      category: 'workforce',
      catLabel: 'Workforce & Rosters',
      badge: 'Shift Attendance',
      desc: 'Live mobile punch-clock reconciliation, open-shift fill coordination, and operational team communications.',
      color: 'from-sky-500 to-blue-600',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0284C7" />
          <circle cx="15" cy="16" r="3.5" fill="#FFFFFF" />
          <circle cx="25" cy="16" r="3.5" fill="#FFFFFF" />
          <path
            d="M11 27c0-3 3-5 6-5s6 2 6 5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M23 27c0-2.5 2-4 5-4s5 1.5 5 4"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      name: 'Samsara',
      category: 'logistics',
      catLabel: 'Fleet Telematics',
      badge: 'ELD & Route Telemetry',
      desc: 'Hours of Service (HOS) monitoring, real-time geofence tracking, and driver safety exception alerts.',
      color: 'from-neutral-800 to-neutral-950',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0A0F1D" />
          <circle cx="20" cy="20" r="9" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="4.5" fill="#10B981" />
          <circle cx="20" cy="11" r="2" fill="#FFFFFF" />
          <circle cx="29" cy="20" r="2" fill="#FFFFFF" />
          <circle cx="20" cy="29" r="2" fill="#FFFFFF" />
          <circle cx="11" cy="20" r="2" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'ServiceTitan',
      category: 'field-service',
      catLabel: 'Field Trades Ops',
      badge: 'Capacity Dispatch',
      desc: 'Trade technician routing, emergency job assignment, arrival window alerts, and quote tracking.',
      color: 'from-blue-700 to-blue-950',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0F172A" />
          <path
            d="M20 9l8 4.5v9c0 5.5-4 10-8 11.5-4-1.5-8-6-8-11.5v-9l8-4.5z"
            fill="#1E3A8A"
            stroke="#3B82F6"
            strokeWidth="1.5"
          />
          <path d="M20 14v12M15 17h10" stroke="#F97316" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Jobber',
      category: 'field-service',
      catLabel: 'Contractor Operations',
      badge: 'Job & ETA Routing',
      desc: 'Scheduling density optimization, customer ETA messaging, work order logs, and invoice close-outs.',
      color: 'from-emerald-600 to-teal-700',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#064E3B" />
          <path
            d="M15 13h10v4h-5v9c0 2-1 3-3 3s-3-1-3-3"
            stroke="#34D399"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="25" cy="15" r="2" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'Zendesk',
      category: 'support',
      catLabel: 'Helpdesk & Triage',
      badge: '24/7 Tier-1 Desk',
      desc: 'Fast inquiry intake, priority ticket classification, customer queue management, and warm supervisor handoffs.',
      color: 'from-green-700 to-emerald-900',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#03363D" />
          <path
            d="M12 28V12l10 16V12"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.4"
          />
          <circle cx="15" cy="15" r="3" fill="#10B981" />
          <path d="M25 12c-4 0-7 3-7 7h7v-7z" fill="#0284C7" />
          <path d="M15 28c4 0 7-3 7-7h-7v7z" fill="#10B981" />
          <circle cx="25" cy="25" r="3" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'RingCentral',
      category: 'support',
      catLabel: 'VoIP & Communications',
      badge: 'Inbound Call Desk',
      desc: 'Live phone answering, IVR call overflow, dispatch audio recordings, and SMS communication queues.',
      color: 'from-orange-500 to-amber-600',
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0C1E38" />
          <circle cx="20" cy="20" r="9" stroke="#F97316" strokeWidth="2.5" fill="none" />
          <circle
            cx="20"
            cy="20"
            r="5"
            stroke="#38BDF8"
            strokeWidth="2"
            fill="none"
            strokeDasharray="2 3"
          />
          <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
          <path d="M27 13c2 2 3 4.5 3 7" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const categories = [
    { id: 'all', label: 'All Ecosystems' },
    { id: 'security', label: 'Security & Patrols' },
    { id: 'logistics', label: 'Fleet & Trucking' },
    { id: 'field-service', label: 'Field Trades' },
    { id: 'support', label: 'Support & Voice' },
  ];

  const filtered =
    activeCategory === 'all' ? platforms : platforms.filter((p) => p.category === activeCategory);

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF] border-t border-[#8C6E63]/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D3A376]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#8C6E63]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <RevealOnScroll direction="up">
            <span className="text-xs font-mono uppercase font-bold tracking-[0.25em] text-[#D3A376] block mb-3">
              Zero Migration Required • 100% Native Access
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#3E2522] tracking-tight">
              We Work Directly Inside Your Systems
            </h3>
            <p className="text-[#3E2522]/75 text-base md:text-lg mt-4 leading-relaxed">
              No new software to purchase. No disruption to your team. Our trained coordinators
              securely log into your existing tools and execute your standard operating procedures
              from Day 1.
            </p>
          </RevealOnScroll>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#3E2522] text-[#FFF2DF] shadow-md scale-105 ring-2 ring-[#D3A376]/40'
                      : 'bg-white/80 text-[#3E2522]/70 hover:text-[#3E2522] hover:bg-white border border-[#8C6E63]/15'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((plat, idx) => {
            const isHovered = hoveredPlatform === plat.name;
            return (
              <RevealOnScroll key={plat.name} direction="up" delay={idx * 60}>
                <div
                  onMouseEnter={() => setHoveredPlatform(plat.name)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  className={`group relative bg-white rounded-2xl p-6 border transition-all duration-500 ease-out flex flex-col justify-between h-full cursor-default overflow-hidden ${
                    isHovered
                      ? 'border-[#D3A376] shadow-[0_20px_40px_-15px_rgba(211,163,118,0.45)] -translate-y-2'
                      : 'border-[#8C6E63]/15 shadow-sm hover:border-[#D3A376]/60 hover:shadow-md'
                  }`}
                >
                  {/* Hover ambient color flare */}
                  <div
                    className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-xl transition-all duration-700 pointer-events-none opacity-20 group-hover:opacity-40 bg-gradient-to-br ${plat.color}`}
                  ></div>

                  <div>
                    {/* Header: Logo + Live Connection Beacon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="relative flex items-center justify-center p-1 rounded-xl transition-transform duration-500 group-hover:scale-110 shadow-sm">
                        {plat.logo}
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF2DF] border border-[#8C6E63]/15 text-[10px] font-mono text-[#8C6E63]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="font-semibold">{plat.badge}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#D3A376] font-bold block mb-1">
                      {plat.catLabel}
                    </span>
                    <h4 className="text-xl font-bold text-[#3E2522] mb-2 group-hover:text-[#8C6E63] transition-colors">
                      {plat.name}
                    </h4>
                    <p className="text-xs md:text-sm text-[#3E2522]/70 leading-relaxed">
                      {plat.desc}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-[#8C6E63]/10 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                      <CheckCircle2 size={13} /> Native Session
                    </span>
                    <span className="text-[10px] font-mono text-[#8C6E63]/80 group-hover:text-[#D3A376] transition-colors">
                      Zero Migration →
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Live Ecosystem Telemetry Bar */}
        <div className="mt-12 bg-[#2A1816] text-[#FFF2DF] rounded-2xl p-6 md:p-8 border border-[#D3A376]/25 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#D3A376]/20 border border-[#D3A376]/30 text-[#D3A376] flex items-center justify-center font-bold flex-shrink-0">
              <Layers size={22} className="animate-pulse" />
            </div>
            <div>
              <h5 className="font-bold text-base md:text-lg text-[#FFF2DF]">
                Custom or In-House Proprietary Software?
              </h5>
              <p className="text-xs md:text-sm text-[#FFF2DF]/70 mt-0.5 max-w-xl">
                We also operate inside internal portals, custom ERPs, and bespoke web apps. We
                ingest your runbooks and SOPs in 72 hours.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono relative z-10 flex-shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Encrypted VDI & SSO
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#D3A376]">
              Audit Logs Retained
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformIntegrationGrid;
