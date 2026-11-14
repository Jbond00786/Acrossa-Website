import { useState, useEffect, useMemo } from 'react';

const getStatusColor = (status) => {
  switch (status) {
    case 'RESOLVED':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25';
    case 'LOGGED':
      return 'text-[#D3A376] bg-[#D3A376]/10 border-[#D3A376]/25';
    case 'ESCALATED':
      return 'text-rose-400 bg-rose-400/10 border-rose-400/25';
    case 'REFERRED':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/25';
    case 'SEEN':
      return 'text-[#FFE0B2] bg-[#FFE0B2]/10 border-[#FFE0B2]/25';
    default:
      return 'text-[#FFF2DF] bg-[#FFF2DF]/10 border-[#FFF2DF]/25';
  }
};

const initialLogs = [
  {
    id: 'init-1',
    time: '05:38',
    status: 'RESOLVED',
    note: 'Email sign-in issue resolved using the client’s approved recovery procedure.',
  },
  {
    id: 'init-2',
    time: '05:32',
    status: 'LOGGED',
    note: 'Routine DAR submitted for North Logistics Hub. Checkpoints verified on TrackTik.',
  },
  {
    id: 'init-3',
    time: '05:25',
    status: 'ESCALATED',
    note: 'Missed geofence check-in at Warehouse 4. Supervisor notified and confirmed on site.',
  },
].map((item) => ({ ...item, color: getStatusColor(item.status) }));

const LiveDashboard = () => {
  const [stats, setStats] = useState({ shifts: 46, exceptions: 3, rate: 98 });
  const [feedData, setFeedData] = useState(initialLogs);

  const multiIndustryLogPool = useMemo(
    () => [
      {
        status: 'RESOLVED',
        note: 'Truck #104 gate arrival logged at Chicago terminal. Seal number confirmed.',
      },
      {
        status: 'LOGGED',
        note: 'Routine DAR audited for Gateway Retail Post #12. 100% checkpoints scanned.',
      },
      {
        status: 'ESCALATED',
        note: 'Unscheduled late check-in on Route 4. Standby driver placed on 15m standby.',
      },
      {
        status: 'RESOLVED',
        note: 'Software access ticket #882 triaged. User updated and specialist escalation recorded.',
      },
      {
        status: 'REFERRED',
        note: 'Tier-1 customer escalation logged in Zendesk. Dispatched on-call supervisor.',
      },
      {
        status: 'LOGGED',
        note: 'Silvertrac geofence departure verified for Mobile Patrol Unit #3.',
      },
      {
        status: 'SEEN',
        note: 'Connectivity ticket #412 reviewed. Troubleshooting notes added to the helpdesk.',
      },
      {
        status: 'RESOLVED',
        note: 'Guard roster call-off at Logistics Hub C. Standby officer confirmed within 12 minutes.',
      },
      {
        status: 'LOGGED',
        note: 'Samsara telematics check: Freight Unit #209 cleared inspection stop on I-80.',
      },
      {
        status: 'ESCALATED',
        note: 'Facility alarm alert received at 03:42. Keyholder contacted per escalation tree.',
      },
      {
        status: 'RESOLVED',
        note: 'Timesheet reconciliation complete for weekend overnight crew. 0 overtime discrepancies.',
      },
      {
        status: 'LOGGED',
        note: 'Inbound emergency line answered in 14s. Customer request #1093 assigned to the account team.',
      },
    ],
    [],
  );

  useEffect(() => {
    let logIndex = 0;
    const tickerInterval = setInterval(() => {
      if (document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const logTemplate = multiIndustryLogPool[logIndex % multiIndustryLogPool.length];
      logIndex++;

      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        time: timeString,
        status: logTemplate.status,
        color: getStatusColor(logTemplate.status),
        note: logTemplate.note,
      };

      setFeedData((prev) => [newEntry, ...prev].slice(0, 8));

      setStats((prev) => {
        const shiftBump = Math.random() > 0.65 ? 1 : 0;
        let newExceptions =
          prev.exceptions + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0);
        newExceptions = Math.max(1, Math.min(8, newExceptions));
        const newRate = Math.min(100, Math.max(94, 98 + (newExceptions > 4 ? -2 : 1)));
        return { shifts: prev.shifts + shiftBump, exceptions: newExceptions, rate: newRate };
      });
    }, 5000);

    return () => clearInterval(tickerInterval);
  }, [multiIndustryLogPool]);

  return (
    <div style={{ perspective: '1200px' }} className="relative">
      <div
        style={{ transform: 'rotateY(-8deg) rotateX(4deg)' }}
        className="w-full bg-[#2A1816] rounded-2xl shadow-2xl border border-[#D3A376]/20 overflow-hidden transition-all duration-700 hover:[transform:none]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#FFF2DF]/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.7)]"></div>
            <h4 className="font-mono text-xs text-[#FFF2DF]/90 tracking-widest uppercase">
              Example Operational Feed
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-[#D3A376] font-mono tracking-widest uppercase">
              24/7 COMMAND
            </span>
            <span className="text-[10px] text-[#D3A376] font-mono border border-[#D3A376]/30 px-2 py-0.5 rounded bg-[#D3A376]/10">
              DEMO
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px bg-[#FFF2DF]/5 border-b border-[#FFF2DF]/10">
          <div className="p-4 bg-[#2A1816]">
            <span className="block text-[10px] text-[#FFF2DF]/50 font-mono mb-1">TOTAL SHIFTS</span>
            <span className="text-xl font-bold text-[#FFF2DF]">{stats.shifts}</span>
          </div>
          <div className="p-4 bg-[#2A1816]">
            <span className="block text-[10px] text-[#FFF2DF]/50 font-mono mb-1">
              OPEN EXCEPTIONS
            </span>
            <span className="text-xl font-bold text-[#D3A376]">
              {String(stats.exceptions).padStart(2, '0')}
            </span>
          </div>
          <div className="p-4 bg-[#2A1816]">
            <span className="block text-[10px] text-[#FFF2DF]/50 font-mono mb-1">
              SLA COMPLIANCE
            </span>
            <span className="text-xl font-bold text-emerald-400">{stats.rate}%</span>
          </div>
        </div>

        <div className="h-[290px] relative overflow-hidden bg-[#2A1816] px-4 py-2">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#2A1816] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#2A1816] to-transparent z-10 pointer-events-none"></div>

          <div className="pt-2 pb-6 flex flex-col gap-2.5">
            {feedData.map((item) => (
              <div
                key={item.id}
                className="animate-new-log flex gap-3 items-start border-b border-[#FFF2DF]/5 pb-2.5"
              >
                <span className="text-xs font-mono text-[#FFF2DF]/50 mt-0.5 whitespace-nowrap">
                  {item.time}
                </span>
                <div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${item.color} mb-1 inline-block font-semibold`}
                  >
                    {item.status}
                  </span>
                  <p className="text-xs md:text-sm text-[#FFF2DF]/90 leading-snug font-medium pr-1">
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
