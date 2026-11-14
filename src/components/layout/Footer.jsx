import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import PolicyModal from './PolicyModal.jsx';
import { routes } from '../../config/routes.js';
import { site } from '../../config/site.js';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  return (
    <>
      <footer className="w-full bg-[#2A1816] text-[#FFF2DF] py-14 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-[#FFF2DF]/10 pb-10 mb-8">
          <div className="md:col-span-2">
            <Link
              to="/"
              aria-label={`${site.name} home`}
              className="flex items-center cursor-pointer group mb-4"
            >
              <Logo
                dark={true}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-xs md:text-sm opacity-65 font-medium max-w-sm leading-relaxed">
              {site.description}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 tracking-wider uppercase text-xs text-[#D3A376]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs opacity-80 font-medium">
              {routes
                .filter(({ path }) => path !== '/contact')
                .map((route) => (
                  <li key={route.path}>
                    <Link to={route.path} className="hover:text-[#D3A376] transition-colors">
                      {route.path === '/about' ? `About ${site.name}` : route.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 tracking-wider uppercase text-xs text-[#D3A376]">
              Inquiries
            </h4>
            <ul className="space-y-2 text-xs opacity-80 font-medium">
              <li>
                <Link to="/contact" className="hover:text-[#D3A376] transition-colors">
                  Inquiry Form
                </Link>
              </li>
              {site.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="hover:text-[#D3A376] transition-colors">
                    {email}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D3A376] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-[11px] opacity-80">US & Canada Operational Coverage</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs opacity-50 font-medium tracking-wide">
          <p>
            © {site.foundingDate}–2026 {site.name}. {new URL(site.url).hostname}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-[#FFF2DF] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-[#FFF2DF] transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {activeModal === 'privacy' && (
        <PolicyModal
          title="Privacy Policy"
          onClose={() => setActiveModal(null)}
          content={
            <>
              <p>
                {site.name} respects your privacy. When you contact us or submit an operations
                inquiry, we collect company details, contact names, email addresses, and operational
                descriptions solely to evaluate your service requirements and formulate a tailored
                Scope of Work.
              </p>
              <p>
                We do not sell, rent, or distribute client contact data to third parties. All
                operational records, shift data, and platform access credentials shared during trial
                or active phases are governed by mutual Non-Disclosure Agreements (NDAs).
              </p>
            </>
          }
        />
      )}

      {activeModal === 'terms' && (
        <PolicyModal
          title="Terms of Service"
          onClose={() => setActiveModal(null)}
          content={
            <>
              <p>
                {site.name} provides remote business operations, scheduling maintenance, and
                dispatch support acting as an authorized operational contractor within
                client-designated software tools.
              </p>
              <p>
                {site.name} executes tasks based strictly on agreed standard operating procedures
                (SOPs) and post orders provided by the client. Client management retains full
                authority for statutory employment decisions, guard licensing, vehicle maintenance,
                and final disciplinary actions.
              </p>
            </>
          }
        />
      )}
    </>
  );
}
