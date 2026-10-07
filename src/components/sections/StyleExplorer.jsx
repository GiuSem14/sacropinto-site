import { useState } from "react"
import { Link } from "react-router-dom"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { styleGuide } from "../../data/studio"
import { portfolioData } from "../../data/portfolio"
import { BOOKING_PATH } from "../../utils/constants"

export default function StyleExplorer() {
  const [activeId, setActiveId] = useState(styleGuide[0].id)
  const active = styleGuide.find((style) => style.id === activeId)
  const works = portfolioData.filter((item) => item.style === active.portfolioStyle).slice(0, 3)

  // Frecce sinistra/destra per muoversi tra le schede, come da pattern ARIA
  const onKeyDown = (event) => {
    const index = styleGuide.findIndex((style) => style.id === activeId)
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key]
    if (!delta) return
    event.preventDefault()
    const next = styleGuide[(index + delta + styleGuide.length) % styleGuide.length]
    setActiveId(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <section id="stili" className="pt-28 pb-24 scroll-mt-16">
      <SectionTitle
        title="Trova il tuo stile"
        subtitle="Non serve sapere i nomi tecnici: guarda i lavori e scegli quello che ti somiglia."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] gap-10 lg:gap-14">
        <Reveal>
          <div role="tablist" aria-label="Stili" aria-orientation="vertical" className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0" onKeyDown={onKeyDown}>
            {styleGuide.map((style) => {
              const selected = style.id === activeId
              return (
                <button
                  key={style.id}
                  id={`tab-${style.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="pannello-stile"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(style.id)}
                  className={`group shrink-0 text-left font-display text-2xl lg:text-4xl py-2 lg:py-3 px-4 lg:px-0 border lg:border-0 lg:border-l-2 lg:pl-5 transition-colors duration-300 ${
                    selected ? "text-white border-verde" : "text-gray-500 border-gray-800 hover:text-gray-200"
                  }`}
                >
                  {style.name}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div id="pannello-stile" role="tabpanel" aria-labelledby={`tab-${active.id}`}>
          <div key={active.id} className="grid grid-cols-3 gap-3 md:gap-4">
            {works.map((item, index) => (
              <figure key={item.id} className="swap-in m-0" style={{ animationDelay: `${index * 90}ms` }}>
                <img src={item.image} alt={item.alt} loading="lazy" className="w-full aspect-[4/5] object-cover" />
              </figure>
            ))}
          </div>
          <div key={`${active.id}-text`} className="swap-in mt-8 grid md:grid-cols-[minmax(0,1fr)_auto] gap-6 items-end" style={{ animationDelay: "200ms" }}>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">{active.description}</p>
            <Link
              to={`${BOOKING_PATH}?stile=${active.id}`}
              className="inline-flex items-center justify-center min-h-12 px-6 bg-white text-black font-semibold hover:bg-verde transition-colors"
            >
              Voglio un tatuaggio {active.name.toLowerCase()}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
