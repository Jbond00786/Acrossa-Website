const OperationalMetricsStrip = () => (
  <section className="w-full bg-[#2A1816] text-[#FFF2DF] py-10 px-6 md:px-12 lg:px-24 border-y border-[#D3A376]/20 relative z-20">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
      {[
        { value: '< 60s', label: 'Emergency Response', sub: 'Rapid protocol escalation' },
        { value: '99.8%', label: 'Roster Fill Rate', sub: 'Standby escalation loop' },
        { value: '24/7/365', label: 'Live Command Desk', sub: 'Nights, weekends & holidays' },
        { value: '100%', label: 'Audit Trails', sub: 'Photo & GPS verified DARs' },
      ].map((stat, i) => (
        <div
          key={i}
          className={`flex flex-col items-center text-center ${i > 0 ? 'pt-6 md:pt-0' : ''}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl md:text-4xl font-extrabold text-[#D3A376] font-mono tracking-tight">
              {stat.value}
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
          </div>
          <span className="font-bold text-xs md:text-sm text-[#FFF2DF] uppercase tracking-wider">
            {stat.label}
          </span>
          <span className="text-[11px] text-[#FFF2DF]/60 mt-0.5">{stat.sub}</span>
        </div>
      ))}
    </div>
  </section>
);

export default OperationalMetricsStrip;
