export default function Button({ children, variant = "primary", href, onClick, className = "", type = "button" }) {
  const base = "inline-block font-semibold tracking-wide transition-all duration-200 px-6 py-3 text-sm uppercase"
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    outline: "border border-white text-white hover:bg-white hover:text-black",
    dark: "bg-black text-white border border-black hover:bg-gray-900",
  }
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <a href={href} className={classes}>{children}</a>
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}