import Button from "../ui/Button"
import { CONTACT } from "../../utils/constants"
import sfondoBg from "../../assets/Sfondo.JPG"

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black overflow-hidden">

      {/* Immagine di sfondo */}
      <img
        src={sfondoBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay scuro per leggibilità */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Fade verso il basso */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1210]/80" />

      {/* Contenuto */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        <p className="text-gray-400 uppercase tracking-[0.3em] text-sm mb-6">
          Tattoo Studio — Piazza Armerina, Sicilia
        </p>

        <img
          src="/logo-sacropinto.png"
          alt="Sacropinto Tattoo Studio"
          className="w-auto mx-auto object-contain mb-6"
          style={{ maxHeight: "260px" }}
        />

        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Arte sulla pelle. Ogni tatuaggio è un progetto unico, realizzato con cura artigianale nel cuore della Sicilia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contatti#scrivici" variant="primary">
            Prenota una consulenza
          </Button>
          <Button href="/portfolio" variant="outline">
            Scopri il portfolio
          </Button>
          <Button href="https://calendly.com/seminato-giuseppe98/30min" variant="outline" target="_blank">
            Prenota online
          </Button>
        </div>

      </div>

      {/* Freccia scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>

    </section>
  )
}
