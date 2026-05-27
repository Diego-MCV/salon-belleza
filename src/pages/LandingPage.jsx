import Hero from '../components/molecules/Hero'
import ServicesSection from '../components/organisms/ServicesSection'
import AboutSection from '../components/organisms/AboutSection'
import TestimonialsSection from '../components/organisms/TestimonialsSection'
import ContactSection from '../components/organisms/ContactSection'
import Footer from '../components/organisms/Footer'
import { heroContent, servicesList, testimonials, values } from '../data/content'

function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 sm:px-8 lg:px-12">
      <Hero content={heroContent} />
      <ServicesSection services={servicesList} />
      <AboutSection values={values} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default LandingPage
