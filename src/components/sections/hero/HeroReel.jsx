import { Link } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"
import sfondoBg from "../../../assets/Sfondo.JPG"
import { portfolioData } from "../../../data/portfolio"
import { BOOKING_PATH, CONTACT } from "../../../utils/constants"

// Un nastro di lavori che scorre: la lista è duplicata per un giro continuo
function Reel({ items, reverse = false }) {
  const loop = [...items, ...items]
  return (
    <div className="reel overflow-hidden" aria-hidden="true">
      <ul className={`reel-track flex gap-3 md:gap-4 w-max ${reverse ? "reel-reverse" : ""}`}>
        {loop.map((item, index) => (
          <li key={`${item.id}-${index}`} className="shrink-0">
            <img
              src={item.image}
              alt=""
              loading={index < 6 ? "eager" : "lazy"}
              className="h-40 md:h-64 w-auto aspect-[4/5] object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function HeroReel() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`
  const half = Math.ceil(portfolioData.length / 2)

  return (
    <section className="relative -mt-16 min-h-svh flex flex-col bg-black overflow-hidden">
      <img src={sfondoBg} alt="" aria-hidden="true" fetchPriority="high" className="hero-bg absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 items-end">
          <div>
            <h1 className="sr-only">Sacropinto, tatuaggi e piercing a Piazza Armerina</h1>
            <img
              src="/logo-sacropinto.png"
              alt=""
              aria-hidden="true"
              className="hero-logo w-full max-w-[520px] h-auto object-contain"
            />
            <p className="hero-rise mt-8 font-display text-3xl md:text-5xl leading-[1.08] text-white max-w-[18ch]" style={{ animationDelay: "1.2s" }}>
              Il tatuaggio che hai in mente, disegnato solo per te.
            </p>
          </div>

          <div className="hero-rise flex flex-col gap-5 lg:pb-2" style={{ animationDelay: "1.45s" }}>
            <p className="text-lg text-gray-300 leading-relaxed max-w-md">
              Via Chiarandà 24, Piazza Armerina. Racconta l'idea in due minuti: ti ricontattiamo per la consulenza gratuita.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col 2xl:flex-row gap-3 lg:items-start">
              <Link to={BOOKING_PATH} className="inline-flex items-center justify-center whitespace-nowrap min-h-12 px-7 bg-white text-black font-semibold hover:bg-verde transition-colors">
                Richiedi il tuo tatuaggio
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-h-12 px-6 border border-white/60 text-white hover:border-white transition-colors">
                <FaWhatsapp size={18} /> Scrivi su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Il portfolio scorre sotto, in due direzioni */}
      <div className="hero-rise relative z-10 flex flex-col gap-3 md:gap-4 pb-10" style={{ animationDelay: "0.6s" }}>
        <Reel items={portfolioData.slice(0, half)} />
        <Reel items={portfolioData.slice(half)} reverse />
        <Link to="/portfolio" className="self-center mt-4 text-gray-300 hover:text-white underline underline-offset-4 decoration-verde">
          Sfoglia tutti i lavori
        </Link>
      </div>
    </section>
  )
}
