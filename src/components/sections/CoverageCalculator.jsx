import { useState, useMemo } from 'react';
import { ArrowRight, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoverageCalculator = () => {
  const [vertical, setVertical] = useState('security');
  const [shiftsPerDay, setShiftsPerDay] = useState(6);
  const [coverageWindow, setCoverageWindow] = useState('24/7');

  const calculation = useMemo(() => {
    let multiplier = 1;
    if (coverageWindow === '24/7') multiplier = 3;
    if (coverageWindow === 'after-hours') multiplier = 1.5;
    if (coverageWindow === 'business-hours') multiplier = 1;

    const monthlyShifts = shiftsPerDay * 30;
    const adminHoursSaved = Math.round(monthlyShifts * 0.45 * multiplier);
    const incidentAuditCapacity = monthlyShifts * 4;

    return {
      monthlyShifts,
      adminHoursSaved,
      incidentAuditCapacity,
    };
  }, [shiftsPerDay, coverageWindow]);

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-20 bg-[#FFE0B2]/20 border-t border-[#8C6E63]/10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-[#8C6E63]/15 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#8C6E63]/10">
          <div>
            <div className="flex items-center gap-2 text-[#D3A376] font-bold text-xs uppercase tracking-widest mb-2">
              <Sliders size={16} /> Operational Capacity Estimator
            </div>
            <h3 className="text-3xl font-extrabold text-[#3E2522]">
              Estimate Your Management Time Saved
            </h3>
          </div>
          <p className="text-sm text-[#3E2522]/70 max-w-xs">
            See how much administrative coordination Acrossa absorbs from your leadership team each
            month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="block text-sm font-bold text-[#3E2522] mb-2">Operational Sector</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'security', label: 'Security' },
                  { id: 'logistics', label: 'Logistics' },
                  { id: 'field', label: 'Field Trades' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setVertical(item.id)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all border ${
                      vertical === item.id
                        ? 'bg-[#3E2522] text-[#FFF2DF] border-[#3E2522]'
                        : 'bg-[#FFF2DF]/40 text-[#3E2522] border-[#8C6E63]/20 hover:border-[#D3A376]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="daily-shifts" className="text-sm font-bold text-[#3E2522]">
                  Daily Active Shifts / Units
                </label>
                <span className="font-mono font-bold text-lg text-[#D3A376]">
                  {shiftsPerDay} active/day
                </span>
              </div>
              <input
                id="daily-shifts"
                type="range"
                min="1"
                max="30"
                value={shiftsPerDay}
                onChange={(e) => setShiftsPerDay(parseInt(e.target.value, 10))}
                className="w-full accent-[#D3A376] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#3E2522]/50 font-mono mt-1">
                <span>1 shift</span>
                <span>15 shifts</span>
                <span>30+ shifts</span>
              </div>
            </div>

            <div>
              <p className="block text-sm font-bold text-[#3E2522] mb-2">
                Coverage Window Required
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'business-hours', label: 'Daytime (9–5)' },
                  { id: 'after-hours', label: 'Nights & Wknds' },
                  { id: '24/7', label: '24/7 Complete' },
                ].map((win) => (
                  <button
                    key={win.id}
                    onClick={() => setCoverageWindow(win.id)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all border ${
                      coverageWindow === win.id
                        ? 'bg-[#D3A376] text-[#3E2522] border-[#D3A376]'
                        : 'bg-[#FFF2DF]/40 text-[#3E2522] border-[#8C6E63]/20 hover:border-[#D3A376]'
                    }`}
                  >
                    {win.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#2A1816] text-[#FFF2DF] p-6 md:p-8 rounded-2xl border border-[#D3A376]/20 shadow-lg">
            <span className="text-[11px] font-mono tracking-widest text-[#D3A376] uppercase block mb-4">
              Estimated Monthly Impact
            </span>

            <div className="space-y-4 pb-6 border-b border-[#FFF2DF]/10">
              <div>
                <span className="text-xs text-[#FFF2DF]/60 block">Management Hours Reclaimed</span>
                <span className="text-3xl font-extrabold text-emerald-400">
                  ~{calculation.adminHoursSaved} hrs / mo
                </span>
              </div>
              <div>
                <span className="text-xs text-[#FFF2DF]/60 block">
                  Shifts Coordinated & Audited
                </span>
                <span className="text-2xl font-bold text-[#FFF2DF]">
                  {calculation.monthlyShifts} shifts
                </span>
              </div>
              <div>
                <span className="text-xs text-[#FFF2DF]/60 block">
                  Live Telemetry & Tour Checks
                </span>
                <span className="text-xl font-bold text-[#D3A376]">
                  {calculation.incidentAuditCapacity.toLocaleString()}+ points
                </span>
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full mt-6 py-3.5 bg-[#D3A376] hover:bg-[#FFE0B2] text-[#3E2522] font-bold rounded-lg text-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              Discuss Customized Coverage <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageCalculator;
