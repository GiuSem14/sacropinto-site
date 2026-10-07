import { Link } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"
import { portfolioData } from "../../../data/portfolio"
import { BOOKING_PATH, CONTACT } from "../../../utils/constants"

// Distribuisce i lavori su N colonne, ogni colonna con un ordine diverso
function columns(count) {
  return Array.from({ length: count }, (_, col) =>
    portfolioData.filter((_, index) => index % count === col).concat(portfolioData.slice(col, col + 2))
  )
}

/*
  Variante D — Parete di lavori.
  Tutto il portfolio copre lo sfondo in colonne che scorrono lente, alternando su e giù,
  come una parete di flash in studio. Al centro, sopra un velo scuro, marchio e bottoni.
*/
export default function HeroWall() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`
  const cols = columns(5)

  return (
    <section className="relative -mt-16 min-h-svh flex items-center justify-center bg-black overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 gap-3 px-3 opacity-60">
        {cols.map((items, col) => (
          <div key={col} className={`overflow-hidden ${col > 2 ? "hidden md:block" : ""}`}>
            <div className={`wall-col flex flex-col gap-3 ${col % 2 ? "wall-col-down" : ""}`} style={{ animationDuration: `${55 + col * 7}s` }}>
              {[...items, ...items].map((item, index) => (
                <img
                  key={`${item.id}-${index}`}
                  src={item.image}
                  alt=""
                  className="wall-tile w-full aspect-[4/5] object-cover"
                  style={{ animationDelay: `${(col * 120 + (index % items.length) * 60) % 900}ms` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,24,20,0.92)_0%,rgba(31,24,20,0.75)_45%,rgba(31,24,20,0.35)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 pt-28 pb-24 flex flex-col items-center text-center">
        <h1 className="sr-only">Sacropinto, tatuaggi e piercing a Piazza Armerina</h1>
        <img src="/logo-sacropinto.png" alt="" aria-hidden="true" className="hero-logo w-full max-w-[600px] h-auto" />
        <p className="hero-rise mt-10 font-display text-3xl md:text-5xl leading-[1.08] text-white max-w-[20ch]" style={{ animationDelay: "1.2s" }}>
          Scegli dalla parete, o portaci la tua idea.
        </p>
        <div className="hero-rise mt-10 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "1.45s" }}>
          <Link to={BOOKING_PATH} className="inline-flex items-center justify-center whitespace-nowrap min-h-12 px-7 bg-white text-black font-semibold hover:bg-verde transition-colors">
            Richiedi il tuo tatuaggio
          </Link>
          <Link to="/portfolio" className="inline-flex items-center justify-center whitespace-nowrap min-h-12 px-6 border border-white/60 text-white hover:border-white transition-colors">
            Guarda i lavori
          </Link>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hero-rise mt-6 inline-flex items-center gap-2 text-gray-300 hover:text-white" style={{ animationDelay: "1.6s" }}>
          <FaWhatsapp size={16} /> Oppure scrivici su WhatsApp
        </a>
      </div>
    </section>
  )
}
