import RevealOnScroll from '../components/visuals/RevealOnScroll.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import PlatformIntegrationGrid from '../components/sections/PlatformIntegrationGrid.jsx';

const HowWeWorkView = () => (
  <div className="w-full animate-in fade-in duration-500">
    <PageHeader
      eyebrow="How We Work"
      title="Structured Onboarding. Predictable Execution."
      subtitle="We believe in clear boundaries, structured communication, and documented processes to ensure a reliable remote partnership."
    />

    <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-12">
      <div className="space-y-8">
        {[
          {
            num: '01',
            title: 'Discovery & Workflow Audit',
            desc: 'We evaluate your current tools, communication channels, and recurring friction points to map out where remote coordination delivers maximum relief.',
          },
          {
            num: '02',
            title: 'Defined Scope of Work (SOW)',
            desc: 'We document exact deliverables, authorized access limits, active operational hours, and emergency escalation matrices before touching live systems.',
          },
          {
            num: '03',
            title: 'Secure System Onboarding',
            desc: 'We configure authorized operator logins inside your software, set up private communication channels, and perform end-to-end communication tests.',
          },
          {
            num: '04',
            title: 'Active Handover & Periodic Audits',
            desc: 'Our operators take over designated shifts. We provide structured daily handover reports and conduct regular cadence reviews with your operations leadership.',
          },
        ].map((step, i) => (
          <RevealOnScroll
            key={i}
            direction="up"
            delay={80 * i}
            className="flex flex-col md:flex-row gap-6 md:gap-10 items-start bg-white p-8 rounded-2xl border border-[#8C6E63]/10 shadow-sm"
          >
            <span className="text-4xl md:text-5xl font-extrabold text-[#D3A376] opacity-60 font-mono">
              {step.num}
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#3E2522] mb-2">{step.title}</h3>
              <p className="text-[#3E2522]/80 leading-relaxed text-sm md:text-base">{step.desc}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>

    <PlatformIntegrationGrid />
    <FinalCTA />
  </div>
);

export default HowWeWorkView;
