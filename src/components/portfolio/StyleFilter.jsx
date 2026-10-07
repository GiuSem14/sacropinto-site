import { portfolioData, portfolioStyles } from "../../data/portfolio"

const countFor = (style) =>
  style === "Tutti" ? portfolioData.length : portfolioData.filter((item) => item.style === style).length

/* Filtri per stile, con il numero di lavori accanto. look: "chips" o "text" */
export default function StyleFilter({ active, onChange, look = "chips" }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2" role="group" aria-label="Filtra per stile">
      {portfolioStyles.map((style) => {
        const selected = active === style
        const base = "min-h-11 transition-colors duration-300"
        const chips = `px-5 border ${selected ? "bg-white text-black border-white" : "text-gray-300 border-gray-700 hover:border-verde hover:text-white"}`
        const text = `px-3 font-display text-2xl md:text-3xl ${selected ? "text-white underline decoration-verde underline-offset-8" : "text-gray-500 hover:text-gray-200"}`
        return (
          <button key={style} type="button" aria-pressed={selected} onClick={() => onChange(style)} className={`${base} ${look === "text" ? text : chips}`}>
            {style}
            <span className={`ml-2 text-sm font-sans tabular-nums ${selected && look === "chips" ? "text-gray-600" : "text-gray-500"}`}>{countFor(style)}</span>
          </button>
        )
      })}
    </div>
  )
}
