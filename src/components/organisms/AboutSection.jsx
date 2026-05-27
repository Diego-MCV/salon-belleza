import SectionTitle from '../atoms/SectionTitle'

function AboutSection({ values }) {
  return (
    <section className="space-y-10 py-20">
      <SectionTitle title="Tu mejor versión comienza aquí" subtitle="Un espacio pensado para armonizar belleza y bienestar." />
      <div className="grid gap-6 md:grid-cols-3">
        {values.map((item) => (
          <article key={item.label} className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">{item.label}</h3>
            <p className="mt-4 text-slate-600 leading-7">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AboutSection
