import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RevealOnScroll from '../visuals/RevealOnScroll.jsx';

const DispatchAccordion = ({ title, sector, desc, icon: Icon, delay }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <RevealOnScroll
      direction="right"
      delay={delay}
      className={`bg-white rounded-xl border transition-all duration-300 ease-out overflow-hidden mb-4 ${isOpen ? 'border-[#D3A376] shadow-md' : 'border-[#8C6E63]/10 hover:border-[#D3A376]/50'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FFF2DF]/25 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#D3A376] text-[#FFF2DF]' : 'bg-[#FFE0B2]/30 text-[#D3A376]'}`}
          >
            <Icon size={22} />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#8C6E63] font-bold block">
              {sector}
            </span>
            <strong className="text-[#3E2522] text-lg font-bold">{title}</strong>
          </div>
        </div>
        <ChevronDown
          className={`text-[#8C6E63] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-2 text-[#3E2522]/80 leading-relaxed text-sm">{desc}</div>
      </div>
    </RevealOnScroll>
  );
};

export default DispatchAccordion;
