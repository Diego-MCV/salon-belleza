function ServiceCard({ icon, title, description }) {
  return (
    <article className="flex gap-5 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-sm">
      <div className="grid h-14 w-14 place-items-center rounded-3xl bg-rose-100 text-2xl">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </article>
  )
}

export default ServiceCard
