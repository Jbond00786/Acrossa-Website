import { site, serviceList } from '../config/site.js';
import { FileText, Target, Search, Mail } from 'lucide-react';
import RevealOnScroll from '../components/visuals/RevealOnScroll.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';
import WhatsAppLink from '../components/contact/WhatsAppLink.jsx';

const ContactView = () => {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <PageHeader
        eyebrow={`Contact ${site.name}`}
        title="Start the Conversation."
        subtitle={`Tell us what you need from ${serviceList}.`}
      />

      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 pb-28 grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-6">
          <RevealOnScroll direction="left">
            <h3 className="text-2xl font-bold text-[#3E2522] mb-4">Let's connect.</h3>
            <p className="text-[#3E2522]/70 mb-8 leading-relaxed">
              We begin every engagement with a brief discovery conversation to evaluate if our
              remote support aligns with your current operational needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#3E2522]/80">
                <Search size={20} className="text-[#D3A376]" />
                <span className="font-medium">Discovery Discussion</span>
              </div>
              <div className="flex items-center gap-3 text-[#3E2522]/80">
                <FileText size={20} className="text-[#D3A376]" />
                <span className="font-medium">Scope & Requirements</span>
              </div>
              <div className="flex items-center gap-3 text-[#3E2522]/80">
                <Target size={20} className="text-[#D3A376]" />
                <span className="font-medium">Secure Platform Setup</span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-[#FFE0B2]/30 rounded-2xl border border-[#D3A376]/25">
              <h4 className="font-bold text-[#3E2522] text-xs uppercase tracking-wider mb-2">
                Direct Inquiries
              </h4>
              {site.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#3E2522]"
                >
                  <Mail size={16} /> {email}
                </a>
              ))}
              <WhatsAppLink />
              <p className="text-xs text-[#3E2522]/60 mt-2">
                Service coverage: United States & Canada
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll
          direction="up"
          delay={200}
          className="md:col-span-3 bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-[#8C6E63]/15"
        >
          <ContactForm />
        </RevealOnScroll>
      </section>
    </div>
  );
};

export default ContactView;
