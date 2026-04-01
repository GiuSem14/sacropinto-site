import Button from "../ui/Button"
import { CONTACT } from "../../utils/constants"

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black overflow-hidden">

      {/* Sfondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />

      {/* Contenuto */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        <p className="text-gray-400 uppercase tracking-[0.3em] text-sm mb-6">
          Tattoo Studio — Piazza Armerina, Sicilia
        </p>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-none">
          SACROPINTO
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Arte sulla pelle. Ogni tatuaggio è un progetto unico, realizzato con cura artigianale nel cuore della Sicilia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contatti" variant="primary">
            Prenota una consulenza
          </Button>
          <Button href="/portfolio" variant="outline">
            Scopri il portfolio
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