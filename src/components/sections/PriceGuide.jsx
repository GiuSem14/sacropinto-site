import { Link } from "react-router-dom"
import Reveal from "../ui/Reveal"
import { priceFactors } from "../../data/studio"
import { BOOKING_PATH, PRICE_MIN } from "../../utils/constants"

export default function PriceGuide() {
  return (
    <section id="prezzi" className="py-24 border-t border-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-12 lg:gap-20">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">Quanto costa?</h2>
          <p className="mt-5 text-lg text-gray-300 max-w-sm leading-relaxed">
            Ogni pezzo è diverso, quindi niente listino. Il prezzo esatto lo ricevi dopo la consulenza, prima di iniziare.
          </p>
          <p className="mt-8 text-gray-400">
            Prezzo minimo di una seduta:{" "}
            <span className="text-white">{PRICE_MIN ? `${PRICE_MIN} €` : "[da definire con lo studio]"}</span>
          </p>
          <Link to={BOOKING_PATH} className="mt-8 inline-flex text-white font-medium border-b border-verde pb-1 hover:text-verde transition-colors">
            Chiedi un preventivo
          </Link>
        </Reveal>

        <dl className="grid sm:grid-cols-2 gap-x-10">
          {priceFactors.map((factor, index) => (
            <Reveal key={factor.title} delay={index * 100} className="stitch-line-h bg-top pt-6 pb-8">
              <dt className="font-display text-2xl text-white">{factor.title}</dt>
              <dd className="mt-2 text-gray-300 leading-relaxed">{factor.text}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
