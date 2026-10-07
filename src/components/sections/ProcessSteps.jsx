import { Link } from "react-router-dom"
import useScrollProgress from "../../hooks/useScrollProgress"
import { processSteps } from "../../data/studio"
import { BOOKING_PATH } from "../../utils/constants"

/*
  Il percorso, dalla richiesta alla guarigione.
  A sinistra il titolo resta fermo; a destra le fasi si accendono mentre scorri
  e una linea si riempie: si vede sempre a che punto del percorso sei.
*/
export default function ProcessSteps() {
  const [ref, progress] = useScrollProgress(0.6)
  const reached = Math.min(processSteps.length, Math.floor(progress * processSteps.length + 0.35))

  return (
    <section id="percorso" className="py-24 border-t border-gray-800 scroll-mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start">
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">Come funziona</h2>
          <p className="mt-5 text-lg text-gray-300 max-w-sm leading-relaxed">
            Sei passaggi, dalla prima idea alla pelle guarita. Nessuna sorpresa sul prezzo, nessun impegno prima della bozza.
          </p>
          <p className="hidden lg:block mt-8 font-display text-8xl text-verde tabular-nums" aria-hidden="true">
            {String(Math.max(1, reached)).padStart(2, "0")}
            <span className="text-gray-700">/{String(processSteps.length).padStart(2, "0")}</span>
          </p>
          <Link to={BOOKING_PATH} className="mt-8 inline-flex items-center min-h-12 px-6 bg-white text-black font-semibold hover:bg-verde transition-colors">
            Inizia dal primo passo
          </Link>
        </div>

        <ol ref={ref} className="relative">
          {/* Linea del percorso: grigia di base, si colora con lo scroll */}
          <div aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-800">
            <div className="absolute inset-x-0 top-0 bg-verde origin-top h-full" style={{ transform: `scaleY(${progress})` }} />
          </div>

          {processSteps.map((step, index) => {
            const on = index < reached
            return (
              <li key={step.title} className="relative pl-16 pb-14 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 w-10 h-10 rounded-full border flex items-center justify-center text-sm tabular-nums transition-all duration-500 ${
                    on ? "bg-verde border-verde text-black scale-100" : "bg-black border-gray-700 text-gray-500 scale-90"
                  }`}
                >
                  {index + 1}
                </span>
                <h3 className={`font-display text-2xl md:text-3xl transition-colors duration-500 ${on ? "text-white" : "text-gray-500"}`}>
                  {step.title}
                </h3>
                <p className={`mt-3 max-w-lg leading-relaxed transition-colors duration-500 ${on ? "text-gray-300" : "text-gray-600"}`}>
                  {step.text}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
