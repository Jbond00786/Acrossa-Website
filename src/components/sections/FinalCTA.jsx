import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../visuals/RevealOnScroll.jsx';

const FinalCTA = () => (
  <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#3E2522] text-[#FFF2DF] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-[#D3A376] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8C6E63] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <RevealOnScroll
        as="h2"
        direction="up"
        className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight"
      >
        Let's Make Your Day-to-Day Operations Easier.
      </RevealOnScroll>
      <RevealOnScroll
        as="p"
        direction="up"
        delay={150}
        className="text-base md:text-lg opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        Tell us where your team needs additional operational support. We'll review your software
        tools, shifts, and priorities to evaluate fit.
      </RevealOnScroll>
      <RevealOnScroll direction="up" delay={300}>
        <Link
          to="/contact"
          className="px-8 py-4 bg-[#D3A376] hover:bg-[#FFE0B2] text-[#3E2522] font-bold tracking-wider rounded-lg text-sm md:text-base transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group mx-auto"
        >
          Discuss Your Operations
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </RevealOnScroll>
    </div>
  </section>
);

export default FinalCTA;
