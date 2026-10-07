import { useState } from "react"
import { Link } from "react-router-dom"
import { FaInstagram } from "react-icons/fa"
import { artistsData } from "../../data/artists"
import { bookingUrl, firstName } from "./artistLinks"

/*
  Variante C — Il duo.
  I ritratti stanno affiancati a tutta altezza. Passando sopra (o con il tab) un artista si allarga,
  passa a colori e mostra bio e bottone; l'altro si stringe. Su telefono sono uno sotto l'altro, già aperti.
*/
export default function ArtistsDuo() {
  const [active, setActive] = useState(0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-3 md:h-[82svh] md:min-h-[560px]">
        {artistsData.map((artist, index) => {
          const open = index === active
          return (
            <article
              key={artist.id}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={`group relative overflow-hidden min-h-[70svh] md:min-h-0 transition-[flex-grow] duration-700 ease-[var(--ease-out-soft)] ${
                open ? "md:grow-[2.2]" : "md:grow"
              } md:basis-0`}
            >
              <img
                src={artist.image}
                alt={artist.alt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${open ? "grayscale-0 scale-100" : "md:grayscale md:scale-105"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <h2 className="font-display text-4xl md:text-6xl text-white leading-none">{artist.name}</h2>
                <p className="mt-2 text-gray-300">{artist.role}</p>

                {/* Dettagli: visibili quando la colonna è aperta (sempre su telefono) */}
                <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-soft)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="mt-5 text-gray-200 leading-relaxed max-w-md">{artist.bio}</p>
                    <p className="mt-3 text-verde">{artist.styles.join(", ")}</p>
                    <div className="mt-6 flex items-center gap-4">
                      <Link to={bookingUrl(artist)} className="inline-flex items-center min-h-12 px-6 bg-white text-black font-semibold hover:bg-verde transition-colors">
                        Richiedi con {firstName(artist)}
                      </Link>
                      <a href={artist.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram di ${artist.name}`} className="w-12 h-12 border border-white/50 text-white flex items-center justify-center hover:border-white">
                        <FaInstagram size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
