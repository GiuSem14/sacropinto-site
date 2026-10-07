import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react"
import StyleFilter from "./StyleFilter"

/*
  Variante C — Sala orizzontale.
  Un lavoro alla volta, grande, in una fila che si scorre di lato (dito, rotella, frecce o tastiera).
  Il contatore e la didascalia seguono il lavoro al centro.
*/
export default function PortfolioHall({ items, activeStyle, onStyleChange, onOpen }) {
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)

  // Il lavoro "attivo" è quello più vicino al centro della fila
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const update = () => {
      frame = 0
      const center = track.scrollLeft + track.clientWidth / 2
      let best = 0
      let bestDistance = Infinity
      Array.from(track.children).forEach((child, index) => {
        const distance = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center)
        if (distance < bestDistance) {
          bestDistance = distance
          best = index
        }
      })
      setCurrent(best)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      track.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

  const goTo = (index) => {
    const track = trackRef.current
    const child = track?.children[Math.max(0, Math.min(items.length - 1, index))]
    if (!child) return
    track.scrollTo({ left: child.offsetLeft - (track.clientWidth - child.offsetWidth) / 2, behavior: "smooth" })
  }

  const changeStyle = (style) => {
    onStyleChange(style)
    setCurrent(0)
    trackRef.current?.scrollTo({ left: 0 })
  }

  const item = items[current] ?? items[0]

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <StyleFilter active={activeStyle} onChange={changeStyle} />
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        aria-label="Lavori, scorri di lato"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); goTo(current + 1) }
          if (event.key === "ArrowLeft") { event.preventDefault(); goTo(current - 1) }
        }}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-[12vw] md:px-[28vw] lg:px-[33vw] pb-4 [scrollbar-width:none] focus-visible:outline-none"
      >
        {items.map((work, index) => (
          <button
            key={`${activeStyle}-${work.id}`}
            type="button"
            onClick={() => (index === current ? onOpen(index) : goTo(index))}
            aria-label={index === current ? `Apri ${work.title} a schermo intero` : `Vai a ${work.title}`}
            className={`group relative shrink-0 snap-center w-[76vw] md:w-[44vw] lg:w-[34vw] aspect-[4/5] overflow-hidden transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] ${
              index === current ? "opacity-100 scale-100" : "opacity-40 scale-[0.92]"
            }`}
          >
            <img src={work.image} alt={work.alt} loading={index < 3 ? "eager" : "lazy"} className="w-full h-full object-cover" />
            {index === current && (
              <span className="absolute top-4 right-4 w-10 h-10 bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={18} aria-hidden="true" />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div key={item?.id} className="step-in min-w-0" aria-live="polite">
          <p className="font-display text-3xl md:text-4xl text-white">{item?.title}</p>
          <p className="text-verde mt-1">{item?.style}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <p className="font-display text-2xl text-gray-400 tabular-nums">
            <span className="text-white">{String(current + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
          </p>
          <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Lavoro precedente" className="w-12 h-12 border border-gray-700 text-white flex items-center justify-center hover:border-white disabled:opacity-30 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <button type="button" onClick={() => goTo(current + 1)} disabled={current === items.length - 1} aria-label="Lavoro successivo" className="w-12 h-12 border border-gray-700 text-white flex items-center justify-center hover:border-white disabled:opacity-30 transition-colors">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
