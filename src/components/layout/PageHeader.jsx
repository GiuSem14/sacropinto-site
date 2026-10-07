import sfondoBg from "../../assets/Sfondo.JPG"

/**
 * Intestazione delle pagine interne: stessa lastra ossidata dell'hero,
 * titolo che si incide all'apertura e filo che scende verso il contenuto.
 */
export default function PageHeader({ title, intro }) {
  return (
    <section className="relative overflow-hidden bg-black">
      <img src={sfondoBg} alt="" aria-hidden="true" className="hero-bg absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 md:pt-32">
        <h1 className="hero-logo font-display font-normal text-5xl md:text-7xl leading-[1.02] text-white max-w-[14ch]" style={{ animationDelay: "0.1s" }}>
          {title}
        </h1>
        {intro && (
          <p className="hero-rise mt-6 text-lg text-gray-300 max-w-xl leading-relaxed" style={{ animationDelay: "0.7s" }}>
            {intro}
          </p>
        )}
      </div>

      <div aria-hidden="true" className="absolute bottom-0 inset-x-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="thread-cue stitch-line w-[2px] h-16" />
        </div>
      </div>
    </section>
  )
}
