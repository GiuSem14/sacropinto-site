import Reveal from "../ui/Reveal"
import StyleFilter from "./StyleFilter"

/*
  Variante B — Masonry con didascalie.
  Le foto mantengono le loro proporzioni, in colonne sfalsate come un quaderno di lavori.
  Titolo e stile sempre visibili sotto ogni foto: niente da scoprire al passaggio, utile su telefono.
*/
export default function PortfolioMasonry({ items, activeStyle, onStyleChange, onOpen }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-14 -mx-3">
        <StyleFilter active={activeStyle} onChange={onStyleChange} look="text" />
      </div>
      <div className="columns-2 md:columns-3 gap-4 md:gap-8">
        {items.map((item, index) => (
          <Reveal key={`${activeStyle}-${item.id}`} delay={(index % 3) * 120} className="break-inside-avoid mb-10 md:mb-14">
            <figure className="m-0 group">
              <button type="button" onClick={() => onOpen(index)} aria-label={`Apri ${item.title} a schermo intero`} className="block w-full overflow-hidden bg-gray-900">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                />
              </button>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-gray-800 pt-3">
                <span className="font-display text-lg md:text-xl text-white">{item.title}</span>
                <span className="text-sm text-verde shrink-0">{item.style}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
