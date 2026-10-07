import { useState } from "react"
import { Helmet } from "react-helmet-async"
import useFadeIn from "../hooks/useFadeIn"

function FadeInSection({ children }) {
  const ref = useFadeIn()
  return (
    <div ref={ref} className="opacity-0 translate-y-16 transition-all duration-1000 ease-out">
      {children}
    </div>
  )
}
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Container from "../components/layout/Container"
import { portfolioData, portfolioStyles } from "../data/portfolio"
import { buildMeta } from "../utils/seo"
import Button from "../components/ui/Button"
import Reveal from "../components/ui/Reveal"
import PageHeader from "../components/layout/PageHeader"

export default function Portfolio() {
  const meta = buildMeta({
    title: "Portfolio",
    description: "Scopri i tatuaggi realizzati da Sacropinto a Piazza Armerina. Anime, neo-tradizionale, fine line e dotwork.",
    path: "/portfolio",
  })

  const [activeStyle, setActiveStyle] = useState("Tutti")
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = activeStyle === "Tutti"
    ? portfolioData
    : portfolioData.filter((item) => item.style === activeStyle)

  return (
    <>
      <Helmet>
        {/* Base SEO */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />

        {/* Open Graph — Facebook, WhatsApp, LinkedIn */}
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:site_name" content={meta.ogSiteName} />
        <meta property="og:locale" content={meta.ogLocale} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
        <meta property="og:image" content={meta.ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <meta name="twitter:image" content={meta.twitterImage} />
      </Helmet>

      <PageHeader
        title="Portfolio"
        intro="Ogni tatuaggio è un progetto unico. Esplora i nostri lavori e trovaci lo stile che fa per te."
      />

      {/* Contenuto */}
      <section className="bg-black pt-12 pb-24">
        <Container>
        <FadeInSection>

          {/* Filtri */}
          <div className="flex flex-wrap gap-2 mb-12">
            {portfolioStyles.map((style) => (
              <button
                key={style}
                onClick={() => setActiveStyle(style)}
                aria-pressed={activeStyle === style}
                className={`min-h-11 px-5 py-2 text-[15px] transition-colors duration-300 border ${
                  activeStyle === style
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-300 border-gray-700 hover:border-verde hover:text-white"
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Griglia */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {filtered.map((item, index) => (
              <Reveal key={`${activeStyle}-${item.id}`} variant="clip" delay={(index % 3) * 100} className="relative aspect-[4/5] bg-gray-900">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
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

          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-600">
              <p className="text-lg">Nessun lavoro in questa categoria al momento.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Ti piace quello che vedi? Parliamo del tuo progetto.</p>
            <Button href="/prenota" variant="primary">Richiedi il tuo tatuaggio</Button>
          </div>
        </FadeInSection>

        </Container>
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={filtered.map((item) => ({ src: item.image, alt: item.alt }))}
      />
    </>
  )
}
