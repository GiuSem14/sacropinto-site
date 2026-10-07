import { useEffect, useRef, useState } from "react"

/**
 * Restituisce quanto un elemento è stato "attraversato" dallo scroll (0 → 1).
 * 0 quando il suo inizio tocca il punto `anchor` del viewport, 1 quando lo supera la sua fine.
 * Aggiorna al massimo una volta per frame.
 */
export default function useScrollProgress(anchor = 0.7) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    if (reduced) {
      frame = requestAnimationFrame(() => setProgress(1))
      return () => cancelAnimationFrame(frame)
    }

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const line = window.innerHeight * anchor
      const value = (line - rect.top) / rect.height
      setProgress(Math.min(1, Math.max(0, value)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [anchor])

  return [ref, progress]
}
