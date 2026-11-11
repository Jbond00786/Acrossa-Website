import { site, services } from '../config/site.js';
import ServiceIcon from '../components/visuals/ServiceIcon.jsx';
import { CalendarDays, Layers, Activity, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../components/visuals/RevealOnScroll.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import PlatformIntegrationGrid from '../components/sections/PlatformIntegrationGrid.jsx';
import CoverageCalculator from '../components/sections/CoverageCalculator.jsx';
import DispatchAccordion from '../components/sections/DispatchAccordion.jsx';

const ServicesView = () => (
  <div className="w-full animate-in fade-in duration-500">
    <PageHeader
      eyebrow="Our Services"
      title="Structured Support for Daily Workflows."
      subtitle={`${site.description} We do not provide HR onboarding services.`}
    />

    <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pb-24 space-y-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <RevealOnScroll
            as="h2"
            direction="left"
            className="text-3xl font-bold mb-4 text-[#3E2522] flex items-center gap-3"
          >
            <CalendarDays className="text-[#D3A376]" size={32} /> Scheduling & Coverage Coordination
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            direction="left"
            delay={100}
            className="text-[#3E2522]/80 mb-6 leading-relaxed"
          >
            Eliminate scramble hours. We maintain real-time rosters, confirm upcoming shifts in
            advance, and coordinate backup coverage according to your post orders.
          </RevealOnScroll>
          <ul className="space-y-4">
            {[
              {
                title: 'Pre-Shift Confirmations',
                desc: 'Verifying availability 2–4 hours prior to roll call to preempt no-shows.',
              },
              {
                title: 'Open-Shift & Call-Out Management',
                desc: 'Activating pre-approved standby rosters immediately when absences occur.',
              },
              {
                title: 'Platform Roster Sync',
                desc: 'Updating scheduling tools (Connecteam, TrackTik, Quo) to prevent payroll mismatches.',
              },
            ].map((item, i) => (
              <RevealOnScroll
                key={i}
                as="li"
                direction="left"
                delay={150 + i * 75}
                className="group flex items-start gap-4 bg-white p-5 rounded-xl border border-[#8C6E63]/10 hover:border-[#D3A376]/50 shadow-sm transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF2DF]/60 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                <div className="w-10 h-10 rounded-lg bg-[#FFF2DF]/50 flex items-center justify-center flex-shrink-0 border border-[#8C6E63]/10 group-hover:bg-[#D3A376] group-hover:scale-110 transition-all">
                  <CheckSquare className="text-[#D3A376] group-hover:text-white" size={18} />
                </div>
                <div className="relative z-10">
                  <strong className="block text-[#3E2522] text-base mb-1">{item.title}</strong>
                  <span className="text-[#3E2522]/70 text-xs md:text-sm">{item.desc}</span>
                </div>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
        <RevealOnScroll
          direction="right"
          className="bg-[#FFE0B2]/30 p-8 rounded-2xl border border-[#D3A376]/25 lg:mt-8"
        >
          <h3 className="text-xl font-bold text-[#3E2522] mb-3">Clear Responsibility Boundaries</h3>
          <p className="text-[#3E2522]/80 text-sm leading-relaxed mb-4">
            {site.name} operates strictly on your designated escalation protocols and roster rules.
            We do not make hiring or disciplinary decisions; final operational authority remains
            100% in your hands.
          </p>
          <span className="text-xs font-mono text-[#8C6E63] font-bold uppercase tracking-wider block">
            • Strict SOP Compliance • Zero Management Drift
          </span>
        </RevealOnScroll>
      </section>

      <section>
        <div className="max-w-2xl mb-10">
          <RevealOnScroll
            as="h2"
            direction="left"
            className="text-3xl font-bold mb-3 text-[#3E2522] flex items-center gap-3"
          >
            <Activity className="text-[#D3A376]" size={32} /> Four Core Services
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            direction="left"
            delay={50}
            className="text-[#3E2522]/80 leading-relaxed"
          >
            Choose the support your team needs, delivered inside your existing platforms:
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {services.map((service, index) => (
            <DispatchAccordion
              key={service.id}
              id={service.id}
              delay={100 + index * 50}
              sector={service.sector}
              title={service.name}
              icon={<ServiceIcon serviceId={service.id} size={22} />}
              desc={
                <div className="space-y-3">
                  <p className="font-semibold text-[#3E2522]">{service.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                    {service.features.map((feature) => (
                      <div
                        key={feature.title}
                        className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10"
                      >
                        <strong>{feature.title}:</strong> {feature.description}
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <RevealOnScroll
            as="h2"
            direction="left"
            className="text-3xl font-bold mb-4 text-[#3E2522] flex items-center gap-3"
          >
            <Layers className="text-[#D3A376]" size={32} /> Operations Administration
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            direction="left"
            delay={50}
            className="text-[#3E2522]/80 mb-6 leading-relaxed"
          >
            Raw platform data turned into clean, actionable leadership summaries.
          </RevealOnScroll>
          <ul className="space-y-3">
            {[
              {
                title: 'Timesheet Reconciliation',
                desc: 'Comparing punch-clock records against assigned rosters to catch unauthorized overtime.',
              },
              {
                title: 'Weekly KPI Summaries',
                desc: 'Compiling shift fill rates, average response delays, and exception frequencies.',
              },
              {
                title: 'Standard Operating Procedure Maintenance',
                desc: 'Keeping site post orders, customer instructions, and emergency trees updated.',
              },
            ].map((item, i) => (
              <RevealOnScroll
                key={i}
                as="li"
                direction="left"
                delay={100 + i * 50}
                className="group flex items-start gap-4 bg-white p-5 rounded-xl border border-[#8C6E63]/10 shadow-sm hover:border-[#D3A376]/50 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF2DF]/60 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                <div className="w-10 h-10 rounded-lg bg-[#FFF2DF]/50 flex items-center justify-center flex-shrink-0 border border-[#8C6E63]/10 group-hover:bg-[#D3A376] group-hover:scale-110 transition-all">
                  <CheckSquare className="text-[#D3A376] group-hover:text-white" size={18} />
                </div>
                <div className="relative z-10">
                  <strong className="block text-[#3E2522] text-base mb-1">{item.title}</strong>
                  <span className="text-[#3E2522]/70 text-xs md:text-sm">{item.desc}</span>
                </div>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
        <div className="bg-[#3E2522] p-8 rounded-2xl text-[#FFF2DF] lg:mt-6">
          <h3 className="text-xl font-bold mb-3 text-[#D3A376]">Need a Custom Scope?</h3>
          <p className="text-[#FFF2DF]/80 text-sm leading-relaxed mb-6">
            Every service business runs on unique software combinations and custom post orders. We
            craft bespoke operational scopes based on your specific requirements.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 bg-[#D3A376] hover:bg-[#FFE0B2] text-[#3E2522] font-bold rounded text-sm transition-all"
          >
            Request Custom Scope
          </Link>
        </div>
      </section>
    </div>

    <PlatformIntegrationGrid />
    <CoverageCalculator />
    <FinalCTA />
  </div>
);

export default ServicesView;
