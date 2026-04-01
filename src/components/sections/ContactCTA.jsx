import Button from "../ui/Button"
import Container from "../layout/Container"
import { CONTACT } from "../../utils/constants"

export default function ContactCTA() {
  return (
    <section className="py-24 bg-gray-950 border-t border-gray-900">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Inizia il tuo progetto</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hai un idea in testa?
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Raccontacela. Ogni tatuaggio parte da una conversazione. Contattaci per una consulenza gratuita, senza impegno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contatti" variant="primary">Prenota una consulenza</Button>
            <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-block border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-colors duration-200 px-6 py-3 text-sm uppercase tracking-wide">Scrivici su WhatsApp</a>
          </div>
        </div>
      </Container>
    </section>
  )
}