import { Link } from "react-router-dom"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import Reveal from "../ui/Reveal"
import { artistsData } from "../../data/artists"
import { bookingUrl, whatsappUrl, firstName } from "./artistLinks"

/* Variante A — Schede: foto e scheda una accanto all'altra, una per artista */
export default function ArtistsCards() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
      {artistsData.map((artist, index) => (
        <article key={artist.id} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-14 border-t border-gray-800 first:border-t-0">
          <Reveal variant="clip" className={`relative aspect-[4/5] bg-gray-900 overflow-hidden ${index % 2 ? "md:order-2" : ""}`}>
            <img src={artist.image} alt={artist.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-5xl text-white">{artist.name}</h2>
            <p className="mt-2 text-gray-400">{artist.role}</p>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-md">{artist.bio}</p>
            <p className="mt-4 text-gray-400">{artist.experience}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stili">
              {artist.styles.map((style) => (
                <li key={style} className="text-sm text-verde border border-verde/40 px-3 py-1">{style}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to={bookingUrl(artist)} className="inline-flex items-center min-h-12 px-6 bg-white text-black font-semibold hover:bg-verde transition-colors">
                Richiedi un tatuaggio con {firstName(artist)}
              </Link>
              <a href={whatsappUrl(artist)} target="_blank" rel="noopener noreferrer" aria-label={`Scrivi su WhatsApp per ${artist.name}`} className="w-12 h-12 border border-gray-700 text-white flex items-center justify-center hover:border-white transition-colors">
                <FaWhatsapp size={20} />
              </a>
              <a href={artist.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram di ${artist.name}`} className="w-12 h-12 border border-gray-700 text-white flex items-center justify-center hover:border-white transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </Reveal>
        </article>
      ))}
    </div>
  )
}
