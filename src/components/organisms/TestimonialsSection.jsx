import SectionTitle from '../atoms/SectionTitle'
import TestimonialCard from '../molecules/TestimonialCard'

function TestimonialsSection({ testimonials }) {
  return (
    <section className="space-y-10 py-20">
      <SectionTitle title="Lo que dicen nuestras clientas" subtitle="Opiniones reales y recomendaciones." />
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} {...testimonial} />
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection
