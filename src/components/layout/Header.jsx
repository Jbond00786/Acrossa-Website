import { site } from '../../config/site.js';
import { useEffect, useState } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';

function NavigationLink({ label, target, navTextColor }) {
  return (
    <RouterNavLink
      to={target === 'home' ? '/' : `/${target}`}
      end
      className={({ isActive }) =>
        `transition-colors duration-300 font-bold tracking-wide flex items-center gap-1 text-xs md:text-sm uppercase ${isActive ? 'text-[#D3A376]' : `${navTextColor} hover:text-[#D3A376]`}`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && <ChevronRight size={14} />}
        </>
      )}
    </RouterNavLink>
  );
}
export default function Header() {
  const { pathname } = useLocation();
  const view = pathname === '/' ? 'home' : pathname.slice(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const isDarkText = view !== 'home' && !isScrolled;
  const navTextColor = isDarkText ? 'text-[#3E2522]' : 'text-[#FFF2DF]';
  const navBg = isScrolled
    ? 'bg-[#2A1816]/95 backdrop-blur-md shadow-md border-b border-[#FFF2DF]/10 py-3.5'
    : 'bg-transparent py-5';
  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`w-full px-6 md:px-12 lg:px-24 flex justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <Link to="/" aria-label={`${site.name} home`} className="flex items-center group">
          <Logo
            dark={!isDarkText}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="hidden md:flex gap-7 items-center">
          <NavigationLink navTextColor={navTextColor} label="Home" target="home" />
          <NavigationLink navTextColor={navTextColor} label="Services" target="services" />
          <NavigationLink navTextColor={navTextColor} label="How We Work" target="how-we-work" />
          <NavigationLink navTextColor={navTextColor} label="About" target="about" />
          <Link
            to="/contact"
            className={`ml-2 px-5 py-2.5 rounded-lg transition-all duration-300 uppercase tracking-widest text-xs font-bold shadow-md ${
              isDarkText
                ? 'bg-[#3E2522] text-[#FFF2DF] hover:bg-[#8C6E63]'
                : 'bg-[#D3A376] text-[#3E2522] hover:bg-[#FFE0B2]'
            }`}
          >
            Discuss Operations
          </Link>
        </div>

        <button
          className={`md:hidden ${navTextColor}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden fixed top-[68px] left-0 w-full bg-[#FFF2DF] z-40 border-b border-[#8C6E63]/20 flex flex-col px-6 py-6 shadow-xl animate-in slide-in-from-top-4"
        >
          {['home', 'services', 'how-we-work', 'about', 'contact'].map((v) => (
            <Link
              key={v}
              to={v === 'home' ? '/' : `/${v}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3.5 font-bold text-left border-b border-[#3E2522]/10 uppercase text-xs tracking-wider ${
                view === v ? 'text-[#D3A376]' : 'text-[#3E2522]'
              }`}
            >
              {v.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
