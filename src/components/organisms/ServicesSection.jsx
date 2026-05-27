import SectionTitle from '../atoms/SectionTitle'
import ServiceCard from '../molecules/ServiceCard'

function ServicesSection({ services }) {
  return (
    <section className="space-y-10 py-20" id="servicios">
      <SectionTitle title="Servicios destacados" subtitle="Cuidado completo para cabello, piel y estilo." />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
