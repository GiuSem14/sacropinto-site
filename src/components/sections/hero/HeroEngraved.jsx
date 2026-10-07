import { Link } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"
import sfondoBg from "../../../assets/Sfondo.JPG"
import { BOOKING_PATH, CONTACT } from "../../../utils/constants"

/*
  Variante C — Logo inciso.
  Tutto lo spazio al marchio: la lastra si assesta, il logo si incide da sinistra a destra,
  poi testo e bottoni. Dal fondo scende il filo che prosegue nella pagina.
*/
export default function HeroEngraved() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`

  return (
    <section className="relative -mt-16 min-h-svh flex items-center justify-center bg-black overflow-hidden">
      <img src={sfondoBg} alt="" aria-hidden="true" fetchPriority="high" className="hero-bg absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-28 pb-36 flex flex-col items-center text-center">
        <h1 className="w-full">
          <img
            src="/logo-sacropinto.png"
            alt="Sacropinto, tatuaggi e piercing"
            className="hero-logo w-full max-w-[760px] h-auto mx-auto object-contain drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]"
          />
        </h1>

        <p className="hero-rise mt-10 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed" style={{ animationDelay: "1.5s" }}>
          Tatuaggi su misura e piercing in via Chiarandà, nel centro di Piazza Armerina. Si parte sempre da una chiacchierata.
        </p>

        <div className="hero-rise mt-10 flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: "1.75s" }}>
          <Link to={BOOKING_PATH} className="inline-flex items-center justify-center whitespace-nowrap min-h-12 px-7 bg-white text-black font-semibold hover:bg-verde transition-colors">
            Richiedi il tuo tatuaggio
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-h-12 px-6 border border-white/70 text-white hover:border-white transition-colors">
            <FaWhatsapp size={18} /> Scrivi su WhatsApp
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 inset-x-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="thread-cue stitch-line w-[2px] h-24" />
        </div>
      </div>
    </section>
  )
}
