import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { FaInstagram } from "react-icons/fa"
import useFadeIn from "../hooks/useFadeIn"
import Container from "../components/layout/Container"
import { buildMeta } from "../utils/seo"
import { fetchGuests } from "../data/guestUtils"
import sfondoBg from "../assets/Sfondo.JPG"

function FadeInSection({ children }) {
  const ref = useFadeIn()
  return (
    <div ref={ref} className="opacity-0 translate-y-16 transition-all duration-1000 ease-out">
      {children}
    </div>
  )
}

export default function Guest() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGuests()
      .then(setGuests)
      .catch(() => setError("Impossibile caricare gli artisti ospiti."))
      .finally(() => setLoading(false))
  }, [])

  const meta = buildMeta({
    title: "Artisti Guest",
    description: "Gli artisti ospiti di Sacropinto tattoo studio a Piazza Armerina. Stili e date delle sessioni guest.",
    path: "/guest",
  })

  return (
    <>
      <Helmet>
        {/* Base SEO */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />

        {/* Open Graph */}
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
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">Ospiti</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Artisti Guest</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Artisti ospiti in studio per sessioni speciali. Date limitate, stili unici.
            </p>
          </div>
        </Container>
      </section>

      {/* Contenuto */}
      <section className="bg-black pt-12 pb-24">
        <Container>
          {loading && (
            <p className="text-center text-gray-500 py-20 uppercase tracking-widest text-sm">Caricamento...</p>
          )}

          {error && (
            <p className="text-center text-gray-500 py-20">{error}</p>
          )}

          {!loading && !error && guests.length === 0 && (
            <p className="text-center text-gray-500 py-20">
              Nessun artista ospite in programma al momento.
            </p>
          )}

          {!loading && !error && guests.length > 0 && (
            <FadeInSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {guests.map((guest, i) => (
                  <div key={i} className="border border-gray-800 bg-gray-900/30">
                    {/* Foto */}
                    <div className="aspect-square bg-gray-900 flex items-center justify-center overflow-hidden">
                      {guest.foto ? (
                        <img
                          src={guest.foto}
                          alt={guest.nome}
                          className="w-full h-full object-cover"
                        />
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
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-white mb-1">{guest.nome}</h2>
                      {guest.stile && (
                        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">{guest.stile}</p>
                      )}
                      {guest.date && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {guest.date.split(",").map((d, j) => {
                            const data = d.trim()
                            const messaggio = encodeURIComponent(`Ciao! Vorrei prenotare una sessione con ${guest.nome} il ${data}. È ancora disponibile?`)
                            const whatsappUrl = `https://wa.me/393929090569?text=${messaggio}`
                            return (
                              <a
                                key={j}
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-gray-700 text-gray-400 text-xs uppercase tracking-widest px-3 py-1 hover:border-white hover:text-white transition-colors duration-200 cursor-pointer"
                              >
                                {data}
                              </a>
                            )
                          })}
                        </div>
                      )}
                      {guest.instagram && (
                        <a
                          href={guest.instagram.startsWith("http") ? guest.instagram : `https://instagram.com/${guest.instagram.replace(/^@/, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Instagram di ${guest.nome}`}
                          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
                        >
                          <FaInstagram size={16} />
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          )}
        </Container>
      </section>
    </>
  )
}
