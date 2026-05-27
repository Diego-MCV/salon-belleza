import heroImg from '../../assets/hero.png'
import Button from '../atoms/Button'

function Hero({ content }) {
  return (
    <section className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center" id="inicio">
      <div className="max-w-2xl">
        <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-700">
          Salón Belleza
        </span>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl">
          {content.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          {content.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button label={content.primaryAction.label} href={content.primaryAction.href} />
          <Button label={content.secondaryAction.label} href={content.secondaryAction.href} variant="secondary" />
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src={heroImg}
          alt="Estilo de salón Belleza"
          className="w-full max-w-[520px] rounded-[2rem] shadow-[0_32px_80px_rgba(67,34,25,0.12)]"
        />
      </div>
    </section>
  )
}

export default Hero
