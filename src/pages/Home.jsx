import { site, services } from '../config/site.js';
import ServiceIcon from '../components/visuals/ServiceIcon.jsx';
import {
  ArrowRight,
  Layers,
  Activity,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  Users,
  FileText,
  Target,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../components/visuals/RevealOnScroll.jsx';
import AnimatedProcess from '../components/sections/AnimatedProcess.jsx';
import OperationalMetricsStrip from '../components/sections/OperationalMetricsStrip.jsx';
import OperationalRealityComparison from '../components/sections/OperationalRealityComparison.jsx';
import FAQAccordionSection from '../components/sections/FAQAccordionSection.jsx';
import EnterpriseSecurityBanner from '../components/sections/EnterpriseSecurityBanner.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import PlatformIntegrationGrid from '../components/sections/PlatformIntegrationGrid.jsx';
import CoverageCalculator from '../components/sections/CoverageCalculator.jsx';
import LiveDashboard from '../components/sections/LiveDashboard.jsx';
import HeroVisual from '../components/visuals/HeroVisual.jsx';

const HomeView = () => (
  <div className="w-full animate-in fade-in duration-500">
    <section
      id="home"
      aria-label="Introduction"
      className="w-full relative overflow-hidden min-h-[92vh] flex items-center bg-[#3E2522] pt-28 md:pt-36 pb-20"
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
        <HeroVisual />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 pointer-events-none">
        <div className="w-full lg:w-3/5 xl:w-1/2 flex flex-col items-start pointer-events-auto">
          <RevealOnScroll
            as="p"
            direction="left"
            delay={0}
            className="text-[#D3A376] font-bold tracking-[0.25em] text-xs md:text-sm uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-0.5 bg-[#D3A376] inline-block"></span>
            Remote Operations & Business Support
          </RevealOnScroll>

          <RevealOnScroll
            as="h1"
            direction="up"
            delay={100}
            className="text-4xl md:text-6xl lg:text-[4.2rem] font-extrabold leading-[1.08] tracking-tight mb-6 text-[#FFF2DF]"
          >
            Your Business Deserves Operations That Keep Up.
          </RevealOnScroll>

          <RevealOnScroll
            as="p"
            direction="up"
            delay={200}
            className="text-base md:text-xl text-[#FFF2DF]/85 leading-relaxed max-w-xl mb-8 font-medium"
          >
            {site.description}
          </RevealOnScroll>

          <RevealOnScroll
            direction="up"
            delay={300}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#D3A376] hover:bg-[#FFE0B2] text-[#3E2522] font-bold tracking-wider rounded-lg text-sm md:text-base transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
            >
              Discuss Your Operations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/services"
              className="text-[#FFF2DF] font-bold tracking-wide border-b-2 border-[#FFF2DF]/30 pb-1 hover:text-[#D3A376] hover:border-[#D3A376] transition-colors duration-300 flex items-center gap-2 text-sm md:text-base"
            >
              Explore All Services
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <OperationalMetricsStrip />
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFE0B2]/30 relative border-t border-[#8C6E63]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <RevealOnScroll
            as="h2"
            direction="left"
            className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#3E2522]"
          >
            When Operations Get Busy, Important Details Get Missed.
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            direction="left"
            delay={100}
            className="text-lg text-[#3E2522]/80 leading-relaxed mb-8"
          >
            Growing service companies often hit an administrative ceiling. You can't scale revenue
            when management is buried in daily coordination. We provide additional operational
            capacity to help you manage:
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Open Shifts & Delays',
              desc: 'Last-minute scheduling changes and field delays.',
              icon: (
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF2DF]/50 border border-[#8C6E63]/20 group-hover:bg-[#D3A376] group-hover:border-[#D3A376] transition-all duration-500">
                  <Clock className="w-6 h-6 text-[#D3A376] group-hover:text-white transition-colors duration-500 relative z-10" />
                  <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full w-3.5 h-3.5 bg-rose-500 border-2 border-white group-hover:border-[#D3A376] transition-colors duration-500"></span>
                  </div>
                </div>
              ),
            },
            {
              title: 'Endless Follow-ups',
              desc: 'Time-consuming field and team confirmations.',
              icon: (
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF2DF]/50 border border-[#8C6E63]/20 group-hover:bg-[#D3A376] group-hover:border-[#D3A376] transition-all duration-500">
                  <Users className="w-6 h-6 text-[#D3A376] group-hover:text-white transition-colors duration-500 relative z-10" />
                  <div className="absolute inset-[-4px] border-[2px] border-dashed border-[#D3A376]/40 rounded-xl animate-[spin_6s_linear_infinite] group-hover:border-white/50 transition-colors duration-500"></div>
                </div>
              ),
            },
            {
              title: 'Fragmented Comms',
              desc: 'Information scattered across multiple channels.',
              icon: (
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF2DF]/50 border border-[#8C6E63]/20 group-hover:bg-[#D3A376] group-hover:border-[#D3A376] transition-all duration-500">
                  <MessageSquare className="w-6 h-6 text-[#D3A376] group-hover:text-white transition-colors duration-500 relative z-10" />
                  <div
                    className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[#8C6E63]/60 rounded-full animate-bounce group-hover:bg-white"
                    style={{ animationDelay: '0ms' }}
                  ></div>
                  <div
                    className="absolute top-1 right-2 w-2 h-2 bg-[#D3A376] rounded-full animate-bounce group-hover:bg-white"
                    style={{ animationDelay: '150ms' }}
                  ></div>
                  <div
                    className="absolute bottom-2 right-1.5 w-1.5 h-1.5 bg-[#D3A376]/80 rounded-full animate-bounce group-hover:bg-white"
                    style={{ animationDelay: '300ms' }}
                  ></div>
                </div>
              ),
            },
            {
              title: 'Delayed Reporting',
              desc: 'Incomplete records and delayed administrative data.',
              icon: (
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF2DF]/50 border border-[#8C6E63]/20 group-hover:bg-[#D3A376] group-hover:border-[#D3A376] transition-all duration-500">
                  <FileText className="w-6 h-6 text-[#D3A376] group-hover:text-white transition-colors duration-500 relative z-10" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white group-hover:border-[#D3A376] transition-colors duration-500 flex items-center justify-center animate-bounce shadow-sm">
                    <span className="text-[10px] text-white font-bold block mb-[1px]">!</span>
                  </div>
                </div>
              ),
            },
          ].map((item, i) => (
            <RevealOnScroll
              key={i}
              direction="up"
              delay={120 * i}
              className="group relative bg-white p-6 md:p-8 rounded-2xl border border-[#8C6E63]/10 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(211,163,118,0.3)] hover:-translate-y-2 hover:border-[#D3A376]/50 transition-all duration-500 ease-out overflow-hidden cursor-default"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FFE0B2]/40 to-transparent rounded-bl-full -mr-12 -mt-12 transition-transform duration-700 ease-out group-hover:scale-[2]"></div>

              <div className="relative z-10">
                <div className="mb-5">{item.icon}</div>
                <h4 className="font-bold text-lg md:text-xl mb-2 text-[#3E2522] group-hover:text-[#8C6E63] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[#3E2522]/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>

    <OperationalRealityComparison />
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF]">
      <div className="w-full flex flex-col items-center mb-16 text-center max-w-3xl mx-auto">
        <RevealOnScroll
          as="h2"
          direction="up"
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#3E2522] mb-6"
        >
          Practical Support for Everyday Operations.
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
        {services.map((service, i) => (
          <RevealOnScroll key={i} direction="up" delay={150 * i} className="h-full">
            <Link
              to={`/services#${service.id}`}
              className="group bg-white border border-[#8C6E63]/10 rounded-xl p-10 flex flex-col justify-between hover:shadow-xl hover:border-[#D3A376]/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full"
            >
              <div>
                <div className="w-14 h-14 bg-[#FFE0B2]/30 border border-[#D3A376]/30 rounded-lg flex items-center justify-center mb-8 text-[#3E2522] group-hover:bg-[#D3A376] group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  <ServiceIcon serviceId={service.id} size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#3E2522]">{service.name}</h3>
                <p className="text-[#3E2522]/70 leading-relaxed font-medium mb-8">
                  {service.description}
                </p>
              </div>
              <span className="font-bold text-[#8C6E63] group-hover:text-[#D3A376] flex items-center gap-2 transition-colors duration-300 w-fit uppercase text-xs tracking-wider">
                View Deliverables{' '}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </span>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#3E2522] text-[#FFF2DF]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-5/12">
          <RevealOnScroll
            as="h2"
            direction="left"
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6"
          >
            Built for Growing Teams That Need Reliable Support.
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            direction="left"
            delay={100}
            className="text-lg opacity-80 leading-relaxed mb-8"
          >
            We partner with businesses that manage recurring schedules, field teams, multiple client
            sites, and ongoing administrative tasks.
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={200}>
            <Link
              to="/about"
              className="text-[#D3A376] font-bold tracking-wide border-b border-[#D3A376]/30 pb-1 hover:text-[#FFE0B2] transition-colors flex items-center gap-2"
            >
              Learn about our agency <ArrowRight size={16} />
            </Link>
          </RevealOnScroll>
        </div>
        <div className="lg:w-7/12 grid grid-cols-2 gap-4 w-full">
          {[
            { label: 'Founders & Owners', icon: <ShieldCheck size={28} /> },
            { label: 'Operations Managers', icon: <Target size={28} /> },
            { label: 'Dispatch Supervisors', icon: <Activity size={28} /> },
            { label: 'Administrative Teams', icon: <Users size={28} /> },
          ].map((item, i) => (
            <RevealOnScroll
              key={i}
              direction="up"
              delay={100 * i}
              className="bg-[#FFF2DF]/5 border border-[#FFF2DF]/10 p-6 rounded-xl text-center flex flex-col items-center justify-center gap-4 hover:border-[#D3A376]/50 transition-colors"
            >
              <div className="text-[#D3A376]">{item.icon}</div>
              <span className="font-bold text-sm">{item.label}</span>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <RevealOnScroll
            as="h2"
            direction="up"
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3E2522] mb-4"
          >
            A Clear Process. Dependable Follow-Through.
          </RevealOnScroll>
        </div>

        <RevealOnScroll direction="up" delay={200}>
          <AnimatedProcess />
        </RevealOnScroll>
      </div>
    </section>
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFE0B2]/30 border-t border-[#8C6E63]/10">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <RevealOnScroll
          as="h2"
          direction="up"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3E2522] mb-6"
        >
          Operational Support Built Around Accountability.
        </RevealOnScroll>
        <RevealOnScroll
          as="p"
          direction="up"
          delay={100}
          className="text-lg text-[#3E2522]/80 font-medium"
        >
          We don't just complete tasks; we take ownership of the process. Our approach is grounded
          in these core principles.
        </RevealOnScroll>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Clear Communication',
            desc: 'Strict adherence to agreed protocols and structured reporting channels.',
            icon: <MessageSquare className="w-6 h-6" />,
          },
          {
            title: 'Documented Processes',
            desc: 'Organized shift handoffs and rigorously maintained standard operating procedures.',
            icon: <FileText className="w-6 h-6" />,
          },
          {
            title: 'Consistent Follow-Through',
            desc: 'Reliable execution and meticulous tracking of all open operational tasks.',
            icon: <CheckCircle2 className="w-6 h-6" />,
          },
          {
            title: 'Defined Escalation',
            desc: 'Pre-agreed responsibility matrices and clear paths for emergencies.',
            icon: <AlertCircle className="w-6 h-6" />,
          },
          {
            title: 'Flexible Support',
            desc: 'Adaptable coordination that scales with your specific business requirements.',
            icon: <Layers className="w-6 h-6" />,
          },
          {
            title: 'Strict Confidentiality',
            desc: 'Secure, discreet, and professional handling of all client and field data.',
            icon: <ShieldCheck className="w-6 h-6" />,
          },
        ].map((item, i) => (
          <RevealOnScroll
            key={i}
            direction="up"
            delay={120 + i * 80}
            className="group relative bg-white p-8 rounded-2xl border border-[#8C6E63]/10 overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_20px_40px_-15px_rgba(211,163,118,0.4)] hover:-translate-y-2 hover:border-[#D3A376]/50 cursor-default"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFE0B2]/50 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 ease-out group-hover:scale-[2.5]"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-[#FFF2DF] text-[#D3A376] flex items-center justify-center mb-6 transition-all duration-500 ease-out shadow-sm border border-[#8C6E63]/10 group-hover:bg-[#D3A376] group-hover:text-white group-hover:scale-110 group-hover:border-transparent">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#3E2522] mb-3 group-hover:text-[#8C6E63] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[#3E2522]/70 leading-relaxed text-sm font-medium">{item.desc}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF]">
      <div className="max-w-7xl mx-auto">
        <div className="lg:w-1/2 pr-0 lg:pr-8 mb-12">
          <RevealOnScroll
            as="h2"
            direction="left"
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3E2522] mb-6"
          >
            Visibility Into the Daily Work.
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            direction="left"
            delay={100}
            className="text-lg text-[#3E2522]/80 leading-relaxed"
          >
            We provide structured, verifiable outputs. You never have to guess what was completed or
            where an escalation stands.
            <span className="block mt-4 text-sm font-bold text-[#8C6E63] uppercase tracking-wider">
              *Illustrative Deliverables Include:
            </span>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-4">
            {[
              {
                title: 'Live Exception Tracking',
                desc: 'Real-time logging and immediate alerts for field anomalies.',
                icon: (
                  <div className="relative flex items-center justify-center w-full h-full">
                    <Activity className="w-6 h-6 text-[#D3A376] z-10" />
                    <div className="absolute w-10 h-10 border-2 border-[#D3A376]/40 rounded-full animate-ping"></div>
                    <div className="absolute w-6 h-6 bg-[#D3A376]/20 rounded-full animate-pulse"></div>
                  </div>
                ),
              },
              {
                title: 'Daily Coverage Reports',
                desc: 'Verified completion rates and shift attendance data.',
                icon: (
                  <div className="relative flex items-center justify-center w-full h-full">
                    <CheckCircle2 className="w-6 h-6 text-[#10B981] z-10" />
                    <div className="absolute w-10 h-10 border-[2px] border-dashed border-[#10B981]/40 rounded-full animate-[spin_6s_linear_infinite]"></div>
                  </div>
                ),
              },
              {
                title: 'Structured Pass-Downs',
                desc: 'Seamless, documented handovers between shifts and teams.',
                icon: (
                  <div className="relative flex items-center justify-center w-full h-full">
                    <div className="absolute transform -translate-x-3 translate-y-1 text-[#8C6E63]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="absolute transform translate-x-3 -translate-y-1 text-[#D3A376] opacity-80">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="absolute flex animate-[pulse_1.5s_ease-in-out_infinite]">
                      <ArrowRight className="w-4 h-4 text-[#3E2522]" />
                    </div>
                  </div>
                ),
              },
              {
                title: 'Weekly Operational Summaries',
                desc: 'High-level metrics and verified performance data for leadership.',
                icon: (
                  <div className="flex items-end justify-center gap-1 w-full h-full p-2.5">
                    <div className="w-1.5 bg-[#D3A376] rounded-sm h-[40%] animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                    <div className="w-1.5 bg-[#8C6E63] rounded-sm h-[70%] animate-[pulse_1.5s_ease-in-out_infinite_0.3s]"></div>
                    <div className="w-1.5 bg-[#3E2522] rounded-sm h-[100%] animate-[pulse_1.5s_ease-in-out_infinite_0.6s]"></div>
                  </div>
                ),
              },
            ].map((item, i) => (
              <RevealOnScroll
                key={i}
                direction="left"
                delay={120 + i * 80}
                className="group flex items-start gap-5 bg-white p-5 rounded-2xl border border-[#8C6E63]/10 hover:border-[#D3A376]/50 hover:shadow-[0_10px_30px_-10px_rgba(211,163,118,0.3)] transition-all duration-500 ease-out hover:-translate-y-1"
              >
                <div className="relative w-14 h-14 rounded-xl bg-[#FFF2DF]/50 flex items-center justify-center flex-shrink-0 border border-[#8C6E63]/10 overflow-hidden">
                  {item.icon}
                </div>
                <div className="pt-0.5">
                  <h4 className="text-[#3E2522] font-bold text-base md:text-lg mb-1 group-hover:text-[#8C6E63] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-[#3E2522]/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll direction="right" className="hidden md:block">
            <LiveDashboard />
          </RevealOnScroll>
        </div>
      </div>
    </section>

    <PlatformIntegrationGrid />
    <CoverageCalculator />
    <FAQAccordionSection />
    <EnterpriseSecurityBanner />
    <FinalCTA />
  </div>
);

export default HomeView;
