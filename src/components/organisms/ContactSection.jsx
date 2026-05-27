import SectionTitle from '../atoms/SectionTitle'
import Button from '../atoms/Button'

function ContactSection() {
  return (
    <section className="space-y-10 py-20" id="contact">
      <SectionTitle title="Reserva tu experiencia" subtitle="Estamos listos para recibirte." />
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-sm">
          <p className="text-lg leading-8 text-slate-600">
            Nuestro salón ofrece horarios extendidos para que reserves cuando más te convenga.
            Llama, escribe o reserva en línea para asegurar tu espacio.
          </p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>📍 Calle Elegancia 128, Centro</li>
            <li>📞 +57 300 123 4567</li>
            <li>🕒 Lun-Sáb 9:00 - 20:00</li>
          </ul>
        </div>
        <div className="rounded-[2rem] bg-rose-50 p-8 text-slate-950 shadow-sm">
          <h3 className="text-2xl font-semibold">Listo para tu cita</h3>
          <p className="mt-4 text-slate-600">
            Haz tu reserva ahora y obtén una consulta personalizada sin costo adicional.
          </p>
          <div className="mt-8">
            <Button label="Llamar ahora" href="tel:+573001234567" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
