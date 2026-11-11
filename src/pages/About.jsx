import RevealOnScroll from '../components/visuals/RevealOnScroll.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import GlobalHubsSection from '../components/sections/GlobalHubsSection.jsx';

const AboutView = () => (
  <div className="w-full animate-in fade-in duration-500">
    <PageHeader
      eyebrow="About Acrossa"
      title="A Dedicated Remote Operations Partner."
      subtitle="Founded in 2025, ACROSSA is a 45+ member remote team supporting service businesses across the United States and Canada."
    />

    <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <RevealOnScroll
            as="h2"
            direction="left"
            className="text-3xl font-bold text-[#3E2522] mb-6"
          >
            Our Mission
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            direction="left"
            delay={100}
            className="text-[#3E2522]/80 leading-relaxed mb-6"
          >
            Acrossa was founded to help growing service businesses solve a specific problem: scaling
            field operations without collapsing the back office. We recognized that generic virtual
            assistants often lack the focus required to handle the rigid scheduling, dispatch
            coordination, and reporting needed in industries like security, logistics, and field
            maintenance.
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            direction="left"
            delay={200}
            className="text-[#3E2522]/80 leading-relaxed"
          >
            Our approach is grounded in professional execution, clear documentation, and accountable
            follow-through. We exist to absorb the recurring administrative pressure so your
            leadership can focus on client acquisition and strategic growth.
          </RevealOnScroll>
        </div>
        <RevealOnScroll
          direction="right"
          className="bg-[#FFE0B2]/30 p-10 rounded-2xl border border-[#8C6E63]/10"
        >
          <h3 className="text-xl font-bold text-[#3E2522] mb-6">Our Core Principles</h3>
          <ul className="space-y-6">
            {[
              {
                title: 'Clarity Over Complexity',
                desc: 'We prioritize documented systems and clear communication over chaotic, unstructured work.',
              },
              {
                title: 'Native Integration',
                desc: "We work inside your existing tools. We don't force proprietary software on your business.",
              },
              {
                title: 'Strict Boundaries',
                desc: 'We focus purely on operations coordination. We do not dilute our expertise.',
              },
            ].map((val, i) => (
              <li key={i}>
                <strong className="block text-[#3E2522]">{val.title}</strong>
                <span className="text-[#3E2522]/70 text-sm">{val.desc}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>

      <GlobalHubsSection />
    </section>

    <FinalCTA />
  </div>
);

export default AboutView;
