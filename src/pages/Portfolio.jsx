import { useState } from "react"
import { Helmet } from "react-helmet-async"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { portfolioData } from "../data/portfolio"
import { buildMeta } from "../utils/seo"
import Button from "../components/ui/Button"
import PageHeader from "../components/layout/PageHeader"
import PortfolioGrid from "../components/portfolio/PortfolioGrid"
import PortfolioMasonry from "../components/portfolio/PortfolioMasonry"
import PortfolioHall from "../components/portfolio/PortfolioHall"
import useVariant from "../hooks/useVariant"
import { BOOKING_PATH } from "../utils/constants"

const LAYOUTS = { a: PortfolioGrid, b: PortfolioMasonry, c: PortfolioHall }

export default function Portfolio() {
  const meta = buildMeta({
    title: "Portfolio",
    description: "Scopri i tatuaggi realizzati da Sacropinto a Piazza Armerina. Anime, neo-tradizionale, fine line e dotwork.",
    path: "/portfolio",
  })

  const variant = useVariant("lavori")
  const Layout = LAYOUTS[variant] ?? PortfolioGrid

  const [activeStyle, setActiveStyle] = useState("Tutti")
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = activeStyle === "Tutti"
    ? portfolioData
    : portfolioData.filter((item) => item.style === activeStyle)

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:site_name" content={meta.ogSiteName} />
        <meta property="og:locale" content={meta.ogLocale} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
        <meta property="og:image" content={meta.ogImage} />
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <meta name="twitter:image" content={meta.twitterImage} />
      </Helmet>

      <PageHeader
        title="I nostri lavori"
        intro="Filtra per stile e apri un lavoro per vederlo a schermo intero. Se ne trovi uno che ti somiglia, partiamo da lì."
      />

      <section className="bg-black pt-12 pb-24">
        <Layout
          items={filtered}
          activeStyle={activeStyle}
          onStyleChange={setActiveStyle}
          onOpen={setLightboxIndex}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-display text-3xl md:text-4xl text-white max-w-[22ch]">Ti piace uno stile? Raccontaci la tua idea.</p>
          <Button href={BOOKING_PATH} variant="primary">Richiedi il tuo tatuaggio</Button>
        </div>
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={filtered.map((item) => ({ src: item.image, alt: item.alt, title: item.title, description: item.style }))}
      />
    </>
  )
}
