import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"
import { portfolioData } from "../../../data/portfolio"
import { BOOKING_PATH, CONTACT } from "../../../utils/constants"

// Lavori mostrati a rotazione: alternano colore e bianco e nero
const SLIDE_IDS = [8, 7, 5, 6, 3]
const DURATION = 5000

/*
  Variante B — Split con slideshow.
  A sinistra un lavoro alla volta, a tutta altezza, con un lento zoom;
  le barrette in basso mostrano il tempo e permettono di saltare a un lavoro.
  A destra marchio, promessa e bottoni.
*/
export default function HeroSplit() {
  const slides = SLIDE_IDS.map((id) => portfolioData.find((item) => item.id === id)).filter(Boolean)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`

  useEffect(() => {
    if (paused) return
    const timer = setTimeout(() => setActive((i) => (i + 1) % slides.length), DURATION)
    return () => clearTimeout(timer)
  }, [active, paused, slides.length])

  return (
    <section className="relative -mt-16 min-h-svh grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] bg-black">
      {/* Slideshow */}
      <div
        className="relative h-[62svh] lg:h-auto lg:min-h-svh overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(window.matchMedia("(prefers-reduced-motion: reduce)").matches)}
      >
        {slides.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            alt={index === active ? item.alt : ""}
            aria-hidden={index !== active}
            fetchPriority={index === 0 ? "high" : undefined}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-[var(--ease-out-soft)] ${
              index === active ? "opacity-100 slide-zoom" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex flex-col gap-4">
          <p className="text-white" aria-live="polite">
            <span className="font-display text-2xl">{slides[active].title}</span>
            <span className="text-gray-300"> — {slides[active].style}</span>
          </p>
          <div className="flex gap-2">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Mostra ${item.title}`}
                aria-current={index === active}
                className="flex-1 h-6 flex items-center group"
              >
                <span className="block w-full h-[3px] bg-white/25 overflow-hidden">
                  <span
                    key={index === active ? `on-${active}` : `off-${index}`}
                    className={`block h-full bg-white origin-left ${index < active ? "scale-x-100" : "scale-x-0"} ${index === active && !paused ? "slide-progress" : ""} ${index === active && paused ? "scale-x-100" : ""}`}
                    style={{ animationDuration: `${DURATION}ms` }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Testo */}
      <div className="relative flex items-center bg-gray-900 lg:pt-16">
        <div className="w-full px-6 sm:px-10 lg:px-16 py-14 max-w-xl">
          <h1 className="sr-only">Sacropinto, tatuaggi e piercing a Piazza Armerina</h1>
          <img src="/logo-sacropinto.png" alt="" aria-hidden="true" className="hero-logo w-full max-w-[380px] h-auto" />
          <p className="hero-rise mt-10 font-display text-4xl md:text-5xl leading-[1.06] text-white" style={{ animationDelay: "1s" }}>
            Ogni tatuaggio parte da una conversazione.
          </p>
          <p className="hero-rise mt-6 text-lg text-gray-300 leading-relaxed" style={{ animationDelay: "1.2s" }}>
            Raccontaci l'idea: ti richiamiamo per la consulenza gratuita e disegniamo il pezzo insieme.
          </p>
          <div className="hero-rise mt-10 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "1.4s" }}>
            <Link to={BOOKING_PATH} className="inline-flex items-center justify-center whitespace-nowrap min-h-12 px-7 bg-white text-black font-semibold hover:bg-verde transition-colors">
              Richiedi il tuo tatuaggio
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-h-12 px-6 border border-white/50 text-white hover:border-white transition-colors">
              <FaWhatsapp size={18} /> WhatsApp
            </a>
          </div>
          <p className="hero-rise mt-10 text-sm text-gray-400" style={{ animationDelay: "1.6s" }}>
            {CONTACT.address}
          </p>
        </div>
      </div>
    </section>
  )
}
