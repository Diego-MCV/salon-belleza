function TestimonialCard({ quote, author, role }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-sm">
      <p className="text-base leading-8 text-slate-600">“{quote}”</p>
      <div className="mt-8 space-y-1">
        <strong className="block text-base text-slate-950">{author}</strong>
        <span className="text-sm text-slate-500">{role}</span>
      </div>
    </article>
  )
}

export default TestimonialCard
