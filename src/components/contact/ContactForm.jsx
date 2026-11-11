import { site, services, serviceList } from '../../config/site.js';
import { useState } from 'react';
import { CheckCircle2, Shield, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.target);
    const web3FormsKey =
      import.meta.env?.VITE_WEB3FORMS_KEY || 'f02e1205-164f-4bd7-af41-abac17113875';
    formData.append('access_key', web3FormsKey);
    formData.append('subject', `New Inquiry from ${site.name} Website`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        setIsSubmitting(false);
        setErrorMessage(
          data.message ||
            `Failed to submit inquiry. Please email us directly at ${site.emails[0]}.`,
        );
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage(`Network error connecting to form service. Please email ${site.emails[0]}.`);
    }
  };

  return (
    <>
      {isSubmitted ? (
        <div className="h-full flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-[#FFE0B2] text-[#D3A376] rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h3 role="status" className="text-2xl font-bold text-[#3E2522] mb-2">
            Inquiry Received
          </h3>
          <p className="text-[#3E2522]/70 text-sm max-w-sm mb-6">
            Thank you for reaching out. We will review your requirements and follow up within one
            business day.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2.5 bg-[#3E2522] text-[#FFF2DF] text-xs font-bold rounded-lg uppercase tracking-wider"
          >
            Send Another Note
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            style={{ display: 'none' }}
          />

          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span role="alert">{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5"
              >
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5"
              >
                Business Email *
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]"
                placeholder="jane@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-company"
                className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5"
              >
                Company Name *
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                autoComplete="organization"
                required
                className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5"
              >
                Direct Phone *
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-service_needed"
                className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5"
              >
                Services Needed *
              </label>
              <select
                id="contact-service_needed"
                name="service_needed"
                required
                className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3 py-2.5 text-sm text-[#3E2522] focus:outline-none focus:border-[#D3A376]"
              >
                <option value="">Choose one of our four services...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="contact-coverage_window"
                className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5"
              >
                Coverage Window *
              </label>
              <select
                id="contact-coverage_window"
                name="coverage_window"
                required
                className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3 py-2.5 text-sm text-[#3E2522] focus:outline-none focus:border-[#D3A376]"
              >
                <option value="">Select coverage...</option>
                <option value="24-7">24/7/365 Continuous</option>
                <option value="after-hours">Nights & Weekends</option>
                <option value="business-hours">Daytime Business Hours</option>
                <option value="surge-overflow">Surge / Call-Out Overflow</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-current_software"
              className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5"
            >
              Current Software Tools Used
            </label>
            <input
              id="contact-current_software"
              type="text"
              name="current_software"
              className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]"
              placeholder="e.g. TrackTik, Samsara, Microsoft 365, Zendesk"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5"
            >
              Main Operational Challenge *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows="3"
              className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376] resize-none"
              placeholder={`Describe your needs for ${serviceList}.`}
            ></textarea>
          </div>

          <div className="text-[11px] text-[#8C6E63] flex items-center gap-1.5 pt-1">
            <Shield size={14} className="flex-shrink-0" />
            <span>
              Your information is handled confidentially and used solely to evaluate your business
              inquiry.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 bg-[#3E2522] text-[#FFF2DF] font-bold rounded-lg transition-all duration-300 shadow-md text-sm ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#8C6E63]'
            }`}
          >
            {isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
          </button>
        </form>
      )}
    </>
  );
};

export default ContactForm;
