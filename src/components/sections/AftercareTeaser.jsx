import { Link } from "react-router-dom"
import Reveal from "../ui/Reveal"
import { aftercare } from "../../data/studio"

export default function AftercareTeaser() {
  return (
    <section id="cura" className="py-24 border-t border-gray-800">
      <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">Dopo la seduta</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-xl leading-relaxed">
            Un tatuaggio guarisce in circa un mese. Ecco cosa aspettarti, fase per fase.
          </p>
        </div>
        <Link to="/cura" className="shrink-0 inline-flex text-white font-medium border-b border-verde pb-1 hover:text-verde transition-colors">
          La guida completa alla cura
        </Link>
      </Reveal>

      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800 border border-gray-800">
        {aftercare.map((phase, index) => (
          <Reveal as="li" key={phase.when} delay={index * 120} className="bg-black p-6">
            <p className="text-verde">{phase.when}</p>
            <h3 className="mt-2 font-display text-2xl text-white">{phase.title}</h3>
            <p className="mt-3 text-gray-400 leading-relaxed">{phase.points[0]}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
