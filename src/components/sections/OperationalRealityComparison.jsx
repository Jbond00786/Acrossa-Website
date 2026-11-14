import { site } from '../../config/site.js';
import { X, CheckCircle2 } from 'lucide-react';

const OperationalRealityComparison = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-[0.25em] text-[#8C6E63] mb-3">
            Operational Contrast
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3E2522] tracking-tight">
            The Reality of Service Scaling
          </h2>
          <p className="text-[#3E2522]/80 mt-4 text-base">
            Comparing daily headaches before and after establishing a dedicated remote operations
            desk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-rose-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-rose-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-bold border border-rose-200">
                  <X size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold block">
                    Internal Management
                  </span>
                  <h3 className="text-xl font-bold text-[#3E2522]">Without {site.name}</h3>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                REACTIVE
              </span>
            </div>

            <ul className="space-y-5 text-sm">
              {[
                {
                  title: '2:00 AM Call-Out Panic',
                  desc: 'Managers and owners awakened to patch dropped shifts and find replacement guards/drivers.',
                },
                {
                  title: 'Unchecked Shift Drift',
                  desc: 'No proactive confirmation loops; no-shows discovered only when clients call to complain.',
                },
                {
                  title: 'Scattered Messaging Channels',
                  desc: 'Critical updates fragmented across SMS, radio, and personal WhatsApp threads.',
                },
                {
                  title: 'Unbillable Overtime Leaks',
                  desc: 'Frantic shift coverage creates unauthorized double-shifts and bloated payroll expenses.',
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </div>
                  <div>
                    <strong className="block text-[#3E2522] font-bold text-base mb-0.5">
                      {item.title}
                    </strong>
                    <span className="text-[#3E2522]/70 leading-relaxed text-xs md:text-sm">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#2A1816] text-[#FFF2DF] rounded-3xl p-8 md:p-10 border-2 border-[#D3A376]/40 shadow-2xl relative overflow-hidden group hover:border-[#D3A376] transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D3A376]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D3A376]/20 flex items-center justify-center text-[#D3A376] font-bold border border-[#D3A376]/30">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D3A376] font-bold block">
                    {site.name} Remote Desk
                  </span>
                  <h3 className="text-xl font-bold text-[#FFF2DF]">With {site.name}</h3>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{' '}
                SYSTEMIZED
              </span>
            </div>

            <ul className="space-y-5 text-sm relative z-10">
              {[
                {
                  title: '24/7 Standby Auto-Escalation',
                  desc: 'Pre-approved backup rosters activated immediately by trained operators without waking leadership.',
                },
                {
                  title: 'Pre-Shift Verification Loops',
                  desc: 'Staff availability confirmed 2–4 hours ahead; zero undetected open posts.',
                },
                {
                  title: 'Single Source of Truth',
                  desc: 'All shift activity, DARs, and work tickets logged inside your existing native platforms.',
                },
                {
                  title: 'Audited Overtime Control',
                  desc: 'Rosters and punch clocks reconciled before payroll to safeguard operating margins.',
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <strong className="block text-[#FFF2DF] font-bold text-base mb-0.5">
                      {item.title}
                    </strong>
                    <span className="text-[#FFF2DF]/75 leading-relaxed text-xs md:text-sm">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationalRealityComparison;
