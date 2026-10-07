import useScrollProgress from "../../hooks/useScrollProgress"

/**
 * Colonna "cucita": a sinistra corre il filo tratteggiato del logo,
 * che si cuce man mano che si scorre la pagina. Sulla punta, la goccia del filo.
 */
export default function StitchedColumn({ children, className = "" }) {
  const [ref, progress] = useScrollProgress(0.75)
  const hidden = `${(1 - progress) * 100}%`

  return (
    <div ref={ref} className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-4 sm:left-6 lg:left-8 w-[2px]">
        <div className="stitch-line absolute inset-0" style={{ clipPath: `inset(0 0 ${hidden} 0)` }} />
        <div
          className="absolute -left-[5px] w-3 h-3 rounded-full bg-verde shadow-[0_0_0_4px_rgba(141,179,162,0.18)]"
          style={{ top: `calc(${progress * 100}% - 6px)`, opacity: progress > 0 && progress < 1 ? 1 : 0, transition: "opacity 300ms" }}
        />
      </div>
      <div className="pl-8 sm:pl-12 lg:pl-20">{children}</div>
    </div>
  )
}
