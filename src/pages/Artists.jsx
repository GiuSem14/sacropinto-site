import { Helmet } from "react-helmet-async"
import { FaInstagram } from "react-icons/fa"
import Container from "../components/layout/Container"
import { artistsData } from "../data/artists"
import { buildTitle } from "../utils/seo"
import Button from "../components/ui/Button"

export default function Artists() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Artisti")}</title>
        <meta name="description" content="Conosci gli artisti di Sacropinto tattoo studio a Piazza Armerina. Stili, esperienza e filosofia di ogni tatuatore." />
      </Helmet>

      <section className="py-24 bg-black min-h-screen">
        <Container>

          <div className="max-w-2xl mb-16">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">Chi siamo</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gli artisti</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Dietro ogni tatuaggio c'è una persona. Conosci chi lavora in Sacropinto, i loro stili e la loro storia.
            </p>
          </div>

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
            <Button href="/contatti" variant="primary">Contattaci</Button>
          </div>

        </Container>
      </section>
    </>
  )
}
