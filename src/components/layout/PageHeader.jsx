import RevealOnScroll from '../visuals/RevealOnScroll.jsx';

const PageHeader = ({ eyebrow, title, subtitle }) => (
  <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-5xl relative">
    <RevealOnScroll
      as="p"
      direction="left"
      className="text-[#8C6E63] font-bold tracking-[0.25em] text-xs md:text-sm uppercase mb-4 flex items-center gap-3"
    >
      <span className="w-8 h-0.5 bg-[#8C6E63] inline-block"></span> {eyebrow}
    </RevealOnScroll>
    <RevealOnScroll
      as="h1"
      direction="up"
      delay={100}
      className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-[#3E2522]"
    >
      {title}
    </RevealOnScroll>
    <RevealOnScroll
      as="p"
      direction="up"
      delay={200}
      className="text-lg md:text-xl text-[#3E2522]/80 leading-relaxed max-w-3xl font-medium"
    >
      {subtitle}
    </RevealOnScroll>
  </div>
);

export default PageHeader;
