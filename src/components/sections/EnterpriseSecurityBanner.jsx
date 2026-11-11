import { ShieldCheck } from 'lucide-react';

const EnterpriseSecurityBanner = () => (
  <section className="w-full px-6 md:px-12 lg:px-24 py-16 bg-[#2A1816] text-[#FFF2DF] border-t border-[#D3A376]/20">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-5">
        <div className="relative w-16 h-16 rounded-2xl bg-[#D3A376]/10 border border-[#D3A376]/30 flex items-center justify-center flex-shrink-0">
          <ShieldCheck size={32} className="text-[#D3A376] relative z-10" />
          <div className="absolute inset-0 rounded-2xl border border-dashed border-[#D3A376]/40 animate-radar"></div>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D3A376] font-bold block mb-1">
            Confidentiality & Compliance
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-[#FFF2DF]">
            Enterprise Data Protection Guarantee
          </h3>
          <p className="text-xs md:text-sm text-[#FFF2DF]/70 mt-1 max-w-xl">
            We enforce strict role-based access, encrypted connections, and mandatory mutual
            Non-Disclosure Agreements (NDAs). Zero local storage of client customer data.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-[#FFF2DF]/80">
          🔒 Strict NDA Protection
        </span>
        <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-[#D3A376]">
          🛡️ Authorized Logins
        </span>
      </div>
    </div>
  </section>
);

export default EnterpriseSecurityBanner;
