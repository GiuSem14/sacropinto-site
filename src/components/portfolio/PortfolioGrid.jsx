import Reveal from "../ui/Reveal"
import StyleFilter from "./StyleFilter"

/* Variante A — Griglia uniforme, didascalia al passaggio */
export default function PortfolioGrid({ items, activeStyle, onStyleChange, onOpen }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <StyleFilter active={activeStyle} onChange={onStyleChange} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {items.map((item, index) => (
          <Reveal key={`${activeStyle}-${item.id}`} variant="clip" delay={(index % 3) * 100} className="relative aspect-[4/5] bg-gray-900">
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-label={`Apri ${item.title} a schermo intero`}
              className="group absolute inset-0 overflow-hidden text-left"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black/85 to-transparent opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100">
                <span className="block font-display text-xl text-white">{item.title}</span>
                <span className="block text-sm text-gray-300">{item.style}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
