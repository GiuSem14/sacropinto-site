import { Link } from "react-router-dom"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { artistsData } from "../../data/artists"

export default function ArtistsPreview() {
  return (
    <section id="studio" className="py-24 border-t border-gray-800">
      <SectionTitle
        title="Chi ti tatua"
        subtitle="Prima della macchinetta c'è il disegno, e prima del disegno una conversazione."
      />

      <div className="grid sm:grid-cols-2 gap-10 md:gap-14">
        {artistsData.map((artist, index) => (
          <article key={artist.id} className="group">
            <Reveal variant="clip" delay={index * 150} className="relative overflow-hidden aspect-[4/5] bg-gray-900">
              <img
                src={artist.image}
                alt={artist.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale-[35%] transition-all duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:grayscale-0 group-hover:scale-[1.04]"
              />
            </Reveal>
            <Reveal delay={index * 150 + 200} className="mt-5">
              <h3 className="font-display text-3xl text-white">{artist.name}</h3>
              <p className="mt-1 text-gray-400">{artist.role}</p>
              <p className="mt-3 text-gray-300 leading-relaxed max-w-md">{artist.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stili">
                {artist.styles.map((style) => (
                  <li key={style} className="text-sm text-verde border border-verde/40 px-3 py-1">{style}</li>
                ))}
              </ul>
            </Reveal>
          </article>
        ))}
      </div>

      <Reveal className="mt-12">
        <Link to="/artisti" className="inline-flex text-white font-medium border-b border-verde pb-1 hover:text-verde transition-colors">
          Conosci gli artisti
        </Link>
      </Reveal>
    </section>
  )
}
