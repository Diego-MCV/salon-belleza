function Button({ label, href, variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300'
  const className =
    variant === 'secondary'
      ? `${base} border border-rose-200 bg-white text-rose-700 shadow-sm hover:bg-rose-50`
      : `${base} bg-rose-600 text-white shadow-lg shadow-rose-200/60 hover:bg-rose-700`

  return href ? (
    <a className={className} href={href} {...props}>
      {label}
    </a>
  ) : (
    <button className={className} type="button" {...props}>
      {label}
    </button>
  )
}

export default Button
