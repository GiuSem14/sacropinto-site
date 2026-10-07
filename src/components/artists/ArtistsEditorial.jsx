import { Link } from "react-router-dom"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import Reveal from "../ui/Reveal"
import { artistsData } from "../../data/artists"
import { bookingUrl, whatsappUrl, firstName } from "./artistLinks"

/*
  Ogni artista ha una "pagina di rivista": il ritratto resta fermo mentre a fianco scorrono
  il nome inciso a tutta larghezza, la bio in grande e gli stili. I lati si alternano.
*/
export default function ArtistsEditorial() {
  return (
    <div className="flex flex-col">
      {artistsData.map((artist, index) => {
        const [first, ...rest] = artist.name.split(" ")
        const flip = index % 2 === 1
        return (
          <article key={artist.id} className="border-t border-gray-800 first:border-t-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className={`lg:sticky lg:top-24 self-start ${flip ? "lg:order-2" : ""}`}>
                <Reveal variant="clip" className="relative aspect-[4/5] lg:aspect-auto lg:h-[78svh] overflow-hidden bg-gray-900">
                  <img src={artist.image} alt={artist.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </Reveal>
              </div>

              <div className="flex flex-col justify-center lg:min-h-[90svh]">
                <Reveal variant="engrave">
                  <h2 className="font-display text-7xl md:text-8xl xl:text-9xl leading-[0.9] text-white">
                    {first}
                    {rest.length > 0 && <span className="block text-gray-500">{rest.join(" ")}</span>}
                  </h2>
                </Reveal>
                <Reveal delay={200} as="p" className="mt-6 text-verde">{artist.role}</Reveal>
                <Reveal delay={300} as="p" className="mt-10 font-display text-2xl md:text-3xl leading-[1.35] text-white max-w-[26ch]">
                  {artist.bio}
                </Reveal>
                <Reveal delay={400} className="mt-10 pt-8 border-t border-gray-800 grid grid-cols-[auto_minmax(0,1fr)] gap-x-8 gap-y-3">
                  <span className="text-gray-500">Stili</span>
                  <span className="text-white">{artist.styles.join(", ")}</span>
                  <span className="text-gray-500">Esperienza</span>
                  <span className="text-white">{artist.experience}</span>
                </Reveal>
                <Reveal delay={500} className="mt-10 flex flex-wrap items-center gap-4">
                  <Link to={bookingUrl(artist)} className="inline-flex items-center min-h-12 px-6 bg-white text-black font-semibold hover:bg-verde transition-colors">
                    Richiedi un tatuaggio con {firstName(artist)}
                  </Link>
                  <a href={whatsappUrl(artist)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-300 hover:text-white">
                    <FaWhatsapp size={18} /> WhatsApp
                  </a>
                  <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-300 hover:text-white">
                    <FaInstagram size={18} /> Instagram
                  </a>
                </Reveal>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
