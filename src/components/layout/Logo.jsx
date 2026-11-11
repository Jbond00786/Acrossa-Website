import { site } from '../../config/site.js';
import AcrossaLogoEmblem from './AcrossaLogoEmblem.jsx';

const Logo = ({ className = '', dark = false }) => {
  return (
    <div
      className={`flex items-center gap-3.5 md:gap-4.5 cursor-pointer select-none group ${className}`}
    >
      <div className="w-14 md:w-16 h-14 md:h-16 flex-shrink-0 relative flex items-center justify-center -translate-y-0.5">
        <AcrossaLogoEmblem className="w-full h-full" dark={dark} />
      </div>

      <div
        className={`text-2xl md:text-[2rem] tracking-[0.16em] leading-none flex items-center ${dark ? 'text-[#FFF2DF]' : 'text-[#3E2522]'}`}
        style={{ fontFamily: "'Adcure', 'Syncopate', sans-serif" }}
      >
        <span className="font-extrabold text-[#D3A376]">{site.name[0]}</span>
        <span className="font-normal">{site.name.slice(1)}</span>
      </div>
    </div>
  );
};

export default Logo;
