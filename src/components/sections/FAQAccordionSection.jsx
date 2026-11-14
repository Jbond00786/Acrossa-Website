import { site } from '../../config/site.js';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQAccordionSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: `How quickly can ${site.name} integrate into our current software?`,
      a: "Most engagements launch within 48 to 72 hours. We don't require you to migrate to proprietary software; we simply onboard our vetted operators into your existing systems (such as TrackTik, Samsara, Microsoft 365, or Connecteam) using client-authorized credentials.",
    },
    {
      q: `How does ${site.name} handle critical operational emergencies?`,
      a: 'During onboarding, we establish a rigid, documented Escalation Matrix. When a high-severity incident occurs—such as an uncontained facility alarm or a vehicular accident—our desk immediately coordinates with frontline staff and executes direct warm-transfers to your designated on-call contacts per your protocol.',
    },
    {
      q: 'Do we get dedicated dispatchers or shared desk coverage?',
      a: 'We offer both models depending on your volume. High-volume operations needing continuous focus receive dedicated operators assigned exclusively to their account. Growing teams with intermittent or weekend coverage needs can utilize our shared command desk for flexible, cost-effective uptime.',
    },
    {
      q: 'How do we verify what tasks were completed each day?',
      a: 'You have complete transparency. Since our operators work directly inside your platforms, you maintain real-time visibility. Additionally, our desk delivers a comprehensive shift pass-down and Daily Activity Report (DAR) at the end of every operating window.',
    },
    {
      q: 'What contract commitments are required?',
      a: 'We believe in earning our place in your daily operations. Engagements begin with an initial 30-day proof-of-performance period, after which services continue on flexible month-to-month scopes with transparent terms.',
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFE0B2]/20 border-t border-[#8C6E63]/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-[#8C6E63] font-bold text-xs uppercase tracking-widest mb-3">
            <HelpCircle size={16} /> Operational Clarifications
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3E2522]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#D3A376] shadow-md'
                    : 'border-[#8C6E63]/15 hover:border-[#D3A376]/60'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FFF2DF]/30 transition-colors"
                >
                  <span className="text-base md:text-lg font-bold text-[#3E2522] pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#D3A376] text-white' : 'bg-[#FFF2DF] text-[#8C6E63]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm md:text-base text-[#3E2522]/80 leading-relaxed border-t border-[#8C6E63]/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordionSection;
