import Button from "../ui/Button"
import sfondoBg from "../../assets/Sfondo.JPG"

export default function Hero() {
  return (
    <section className="relative -mt-16 min-h-svh flex items-center justify-center bg-black overflow-hidden">

      {/* Lastra ossidata: si assesta lentamente all'apertura */}
      <img
        src={sfondoBg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="hero-bg absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-28 pb-36 flex flex-col items-center text-center">

        {/* Il logo viene "inciso" da sinistra a destra */}
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
          <Button href="/contatti#scrivici" variant="primary">
            Prenota una consulenza
          </Button>
          <Button href="/portfolio" variant="outline">
            Guarda i lavori
          </Button>
        </div>

        <a
          href="https://calendly.com/seminato-giuseppe98/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-rise mt-6 text-sm text-gray-300 underline underline-offset-4 decoration-verde hover:text-white transition-colors"
          style={{ animationDelay: "1.95s" }}
        >
          Oppure scegli tu data e ora online
        </a>
      </div>

      {/* Il filo scende dall'hero e prosegue nella cucitura della pagina */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="thread-cue stitch-line w-[2px] h-24" />
        </div>
      </div>
    </section>
  )
}
