import { site, services, serviceDeck } from '../config/site.js';
import ServiceCard from '../components/sections/ServiceCard.jsx';
import ServiceIcon from '../components/visuals/ServiceIcon.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import PlatformIntegrationGrid from '../components/sections/PlatformIntegrationGrid.jsx';
import CoverageCalculator from '../components/sections/CoverageCalculator.jsx';
import DispatchAccordion from '../components/sections/DispatchAccordion.jsx';

export default function ServicesView() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <PageHeader eyebrow="Our Services" title={serviceDeck.title} subtitle={site.description} />
      <section className="service-deck service-deck--page" aria-label="Core services">
        <div className="service-deck__grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <DispatchAccordion
          id="service-scope"
          title={serviceDeck.scopeTitle}
          sector={serviceDeck.scopeLabel}
          icon={<ServiceIcon serviceId={services[0].id} size={22} />}
          desc={serviceDeck.scopeNote}
          delay={0}
        />
      </div>
      <PlatformIntegrationGrid />
      <CoverageCalculator />
      <FinalCTA />
    </div>
  );
}
