import { CheckCircle2 } from 'lucide-react';

const AnimatedProcess = () => {
  const steps = [
    {
      step: '01',
      title: 'Understand',
      desc: 'Learn about your operations, existing software tools, and recurring coordination challenges.',
    },
    {
      step: '02',
      title: 'Define',
      desc: 'Agree on exact deliverables, authorized access limits, service hours, and escalation paths.',
    },
    {
      step: '03',
      title: 'Organize',
      desc: 'Configure agreed workflows, secure operator logins, and test communication loops.',
    },
    {
      step: '04',
      title: 'Deliver',
      desc: 'Assume designated shifts, report exceptions in real time, and audit for continuous reliability.',
    },
  ];

  return (
    <div className="relative flex flex-col md:flex-row w-full gap-12 md:gap-0 mt-8 max-w-6xl mx-auto">
      <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[3px] z-0">
        <div className="w-full h-full bg-[#8C6E63]/20 rounded-full"></div>
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#10B981]/20 via-[#10B981] to-[#4ADE80] rounded-full transition-all duration-75 ease-linear"
          style={{ width: '100%' }}
          data-process-fill="horizontal"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_4px_rgba(16,185,129,0.9)]"></div>
        </div>
      </div>

      <div className="block md:hidden absolute left-[28px] top-[28px] bottom-[28px] w-[3px] z-0">
        <div className="w-full h-full bg-[#8C6E63]/20 rounded-full"></div>
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#10B981]/20 via-[#10B981] to-[#4ADE80] rounded-full transition-all duration-75 ease-linear"
          style={{ height: '100%' }}
          data-process-fill="vertical"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_4px_rgba(16,185,129,0.9)]"></div>
        </div>
      </div>

      {steps.map((item, i) => {
        const isActive = true;
        const isCompleted = true;

        return (
          <div
            key={i}
            className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center w-full md:w-1/4 group"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-xl transition-all duration-500 flex-shrink-0 border-4 mb-0 md:mb-6 
              ${isActive ? 'bg-[#10B981] border-[#10B981]/30 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-110' : 'bg-[#3E2522] border-[#FFF2DF] text-[#FFF2DF]'}`}
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <span
                  className={`absolute transition-opacity duration-300 ${isCompleted ? 'opacity-0' : 'opacity-100'}`}
                >
                  {item.step}
                </span>
                <CheckCircle2
                  size={24}
                  className={`absolute transition-all duration-300 ${isCompleted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                />
              </div>
            </div>

            <div
              className={`pl-6 md:pl-0 pt-1 md:pt-0 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}
            >
              <h4
                className={`font-bold text-xl mb-2 transition-colors duration-500 ${isActive ? 'text-[#10B981]' : 'text-[#3E2522]'}`}
              >
                {item.title}
              </h4>
              <p className="text-[#3E2522]/80 text-sm leading-relaxed max-w-[240px] mx-auto">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedProcess;
