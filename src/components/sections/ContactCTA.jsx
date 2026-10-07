import Button from "../ui/Button"
import Reveal from "../ui/Reveal"
import Container from "../layout/Container"
import { CONTACT, HOURS } from "../../utils/constants"

export default function ContactCTA() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`

  return (
    <section className="relative py-28 bg-gray-900 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-16 items-start">
          <div>
            <Reveal as="h2" className="font-display text-5xl md:text-7xl leading-[1.02] text-white max-w-[12ch]">
              Raccontaci la tua idea
            </Reveal>
            <Reveal delay={150} as="p" className="mt-6 text-lg text-gray-300 max-w-md leading-relaxed">
              Un'idea, una foto di riferimento o solo la zona del corpo: il resto lo vediamo insieme. La consulenza è gratuita.
            </Reveal>
            <Reveal delay={300} className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/contatti#scrivici" variant="primary">Prenota una consulenza</Button>
              <Button href={whatsappUrl} variant="outline" target="_blank" rel="noopener noreferrer">
                Scrivi su WhatsApp
              </Button>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-8 gap-y-4 text-[15px]">
              <dt className="text-gray-500">Dove</dt>
              <dd className="text-white">{CONTACT.address}</dd>
              <dt className="text-gray-500">WhatsApp</dt>
              <dd className="text-white">{CONTACT.whatsapp}</dd>
              <dt className="text-gray-500">Orari</dt>
              <dd>
                <ul className="flex flex-col gap-1">
                  {HOURS.map((row) => (
                    <li key={row.day} className="flex justify-between gap-6 text-gray-300">
                      <span>{row.day}</span>
                      <span className="text-white">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
