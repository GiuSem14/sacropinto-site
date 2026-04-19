import { useState } from "react"
import { Helmet } from "react-helmet-async"
import Container from "../components/layout/Container"
import { portfolioData, portfolioStyles } from "../data/portfolio"
import { buildMeta } from "../utils/seo"
import Button from "../components/ui/Button"

export default function Portfolio() {
  const meta = buildMeta({
    title: "Portfolio",
    description: "Scopri i tatuaggi realizzati da Sacropinto a Piazza Armerina. Blackwork, realistico, geometrico, linework e molto altro.",
    path: "/portfolio",
  })

  const [activeStyle, setActiveStyle] = useState("Tutti")

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

      <section className="py-24 bg-black min-h-screen">
        <Container>

          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">I nostri lavori</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Portfolio</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Ogni tatuaggio è un progetto unico. Esplora i nostri lavori e trovaci lo stile che fa per te.
            </p>
          </div>

          {/* Filtri */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {portfolioStyles.map((style) => (
              <button
                key={style}
                onClick={() => setActiveStyle(style)}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-200 border ${
                  activeStyle === style
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-400 hover:text-white"
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Griglia */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <div key={item.id} className="aspect-square bg-gray-900 relative overflow-hidden group">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                    <span className="text-xs mt-2 uppercase tracking-wide">{item.style}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">{item.style}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-gray-600">
              <p className="text-lg">Nessun lavoro in questa categoria al momento.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Ti piace quello che vedi? Parliamo del tuo progetto.</p>
            <Button href="/contatti#scrivici" variant="primary">Prenota una consulenza</Button>
          </div>

        </Container>
      </section>
    </>
  )
}
