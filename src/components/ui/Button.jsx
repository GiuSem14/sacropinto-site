export default function Button({ children, variant = "primary", href, onClick, className = "", type = "button", ...rest }) {
  const base =
    "relative isolate inline-flex items-center justify-center min-h-11 px-7 py-3 text-[15px] font-semibold overflow-hidden " +
    "transition-colors duration-300 ease-[var(--ease-out-soft)] " +
    "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[var(--ease-out-soft)] " +
    "hover:before:scale-x-100 focus-visible:before:scale-x-100"
  const variants = {
    primary: "bg-white text-black before:bg-verde",
    outline: "border border-white/70 text-white hover:text-black before:bg-white",
    dark: "bg-black text-white border border-black before:bg-gray-800",
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <a href={href} className={classes} {...rest}>{children}</a>
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}
