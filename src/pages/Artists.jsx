import { Helmet } from "react-helmet-async"
import { FaInstagram } from "react-icons/fa"
import useFadeIn from "../hooks/useFadeIn"

function FadeInSection({ children }) {
  const ref = useFadeIn()
  return (
    <div ref={ref} className="opacity-0 translate-y-16 transition-all duration-1000 ease-out">
      {children}
    </div>
  )
}
import Container from "../components/layout/Container"
import { artistsData } from "../data/artists"
import { buildMeta } from "../utils/seo"
import Button from "../components/ui/Button"
import sfondoBg from "../assets/Sfondo.JPG"

export default function Artists() {
  const meta = buildMeta({
    title: "Artisti",
    description: "Conosci gli artisti di Sacropinto tattoo studio a Piazza Armerina. Stili, esperienza e filosofia di ogni tatuatore.",
    path: "/artisti",
  })

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

      {/* Header con sfondo marmo */}
      <section className="relative overflow-hidden bg-black py-24">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${sfondoBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-black/70" />
        <Container>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">Chi siamo</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Gli artisti</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Dietro ogni tatuaggio c'è una persona. Conosci chi lavora in Sacropinto, i loro stili e la loro storia.
            </p>
          </div>
        </Container>
      </section>

      {/* Contenuto */}
      <section className="bg-black pt-12 pb-24">
        <Container>
          <FadeInSection>
          <div className="flex flex-col gap-16">
            {artistsData.map((artist) => (
              <div key={artist.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-gray-800 pt-12">

                {/* Foto placeholder */}
                <div className="aspect-square bg-gray-900 flex items-center justify-center">
                  {artist.image ? (
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-700">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-2">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                      </svg>
                      <p className="text-sm uppercase tracking-wide">Foto artista</p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">{artist.name}</h2>
                  <p className="text-gray-500 uppercase tracking-widest text-sm mb-6">{artist.role}</p>
                  <p className="text-gray-400 leading-relaxed mb-6">{artist.bio}</p>
                  <p className="text-gray-500 text-sm mb-2">{artist.experience}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {artist.styles.map((style) => (
                      <span key={style} className="border border-gray-700 text-gray-400 text-xs uppercase tracking-widest px-3 py-1">
                        {style}
                      </span>
                    ))}
                  </div>

                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram di ${artist.name}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
                  >
                    <FaInstagram size={16} />
                    Instagram
                  </a>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-gray-800 pt-16 text-center">
            <p className="text-gray-400 text-lg mb-6">Vuoi lavorare con noi?</p>
            <Button href="/contatti#scrivici" variant="primary">Contattaci</Button>
          </div>
          </FadeInSection>

        </Container>
      </section>
    </>
  )
}
