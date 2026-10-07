import { useEffect, useRef } from "react"

/**
 * Mostra il contenuto quando entra nel viewport.
 * variant "up": sale e appare. variant "clip": si scopre dal basso (per le immagini).
 * delay in ms, per scaglionare elementi vicini.
 */
export default function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-revealed")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed")
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{ ...style, "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
