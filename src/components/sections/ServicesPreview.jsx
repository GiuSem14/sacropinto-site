import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { servicesData } from "../../data/services"

export default function ServicesPreview() {
  return (
    <section id="servizi" className="py-24 border-t border-gray-800">
      <SectionTitle title="Cosa facciamo" />

      <ul>
        {servicesData.map((service, index) => (
          <Reveal as="li" key={service.id} delay={index * 80} className="group stitch-line-h bg-bottom">
            <div className="grid md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-2 md:gap-12 py-7">
              <h3 className="font-display text-2xl md:text-3xl text-white transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-2">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-xl">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
