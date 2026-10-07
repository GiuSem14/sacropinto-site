import { Link } from "react-router-dom"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { portfolioData } from "../../data/portfolio"

// Ordine pensato per alternare colore e bianco/nero nella griglia
const FEATURED_IDS = [8, 7, 1, 10, 5]

export default function HomePortfolioPreview() {
  const works = FEATURED_IDS.map((id) => portfolioData.find((item) => item.id === id)).filter(Boolean)

  return (
    <section id="lavori" className="pt-28 pb-24">
      <SectionTitle
        title="Lavori recenti"
        subtitle="Anime, neo-tradizionale, fine line e dotwork. Ogni pezzo è disegnato per chi lo porta."
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {works.map((item, index) => (
          <figure key={item.id} className={`group m-0 ${index === 0 ? "row-span-2" : ""}`}>
            <Link to="/portfolio" className="block h-full" aria-label={`${item.title}: vai al portfolio`}>
              <Reveal
                variant="clip"
                delay={(index % 3) * 120}
                className={`relative overflow-hidden bg-gray-900 ${index === 0 ? "h-full min-h-[420px]" : "aspect-[4/5]"}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black/85 to-transparent translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="block font-display text-xl text-white">{item.title}</span>
                  <span className="block text-sm text-gray-300">{item.style}</span>
                </figcaption>
              </Reveal>
            </Link>
          </figure>
        ))}
      </div>

      <Reveal className="mt-10">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-3 text-white font-medium border-b border-verde pb-1 hover:text-verde transition-colors"
        >
          Tutti i {portfolioData.length} lavori del portfolio
        </Link>
      </Reveal>
    </section>
  )
}
