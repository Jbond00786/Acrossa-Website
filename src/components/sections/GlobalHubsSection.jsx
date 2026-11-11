import { site, services } from '../../config/site.js';
import RevealOnScroll from '../visuals/RevealOnScroll.jsx';

const GlobalHubsSection = () => (
  <section className="w-full mt-24 mb-12">
    <div className="bg-[#2A1816] rounded-[2rem] p-10 md:p-16 border border-[#D3A376]/20 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D3A376]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <RevealOnScroll
        as="h2"
        direction="up"
        className="text-center text-[#FFF2DF]/70 text-lg md:text-xl font-medium tracking-wide mb-16 relative z-10"
      >
        The operational backbone behind growing companies worldwide.
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div className="space-y-6 text-[#FFF2DF]/80 leading-relaxed text-lg">
          <RevealOnScroll direction="left" delay={100}>
            <p>
              Founded in 2025 by <strong>Rafiullah Waheed</strong>—drawing on his{' '}
              <strong>Master of Business Administration (MBA)</strong> and over{' '}
              <strong>7 years of specialized experience</strong> in {services[0].name},
              administrative management, and global workforce coordination—{site.name} was created
              with one clear goal: helping companies run smoother, faster, and more professionally
              through trusted remote operations. We are not just another outsourcing company. We
              become a real part of your daily operations.
            </p>
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={200}>
            <p>
              Today, our {site.teamSize} member team works across Afghanistan, Pakistan,
              Philippines, India, Bangladesh, and Indonesia, supporting businesses that need
              reliable dispatching, scheduling, coordination, client communication, reporting, and
              operational support every single day.
            </p>
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={300}>
            <p>
              We help service companies manage their day-to-day operations by staying connected with
              field teams, handling schedules, responding to issues quickly, communicating with
              clients, and making sure operations continue smoothly 24/7. Our teams are trained to
              work in fast-paced western business environments with professionalism, discipline, and
              strong communication.
            </p>
          </RevealOnScroll>
        </div>

        <div>
          <RevealOnScroll
            as="h3"
            direction="right"
            className="text-[#FFF2DF] font-bold text-2xl mb-8"
          >
            Global Service Hubs
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Afghanistan', 'Pakistan', 'India', 'Philippines', 'Bangladesh', 'Indonesia'].map(
              (hub, i) => (
                <RevealOnScroll key={hub} direction="up" delay={150 + i * 80}>
                  <div className="flex items-center gap-6 bg-black/20 hover:bg-[#D3A376]/10 border border-[#FFF2DF]/10 hover:border-[#D3A376]/50 px-6 py-5 rounded-xl transition-all duration-500 cursor-default group shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(211,163,118,0.2)] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
                    <span className="text-sm font-mono text-[#D3A376]/50 group-hover:text-[#D3A376] transition-colors">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[#FFF2DF] font-medium tracking-wide">{hub}</span>
                  </div>
                </RevealOnScroll>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GlobalHubsSection;
