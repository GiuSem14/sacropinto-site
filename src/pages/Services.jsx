import { Helmet } from "react-helmet-async"
import Container from "../components/layout/Container"
import { servicesData } from "../data/services"
import { buildTitle } from "../utils/seo"
import Button from "../components/ui/Button"

export default function Services() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Servizi")}</title>
        <meta name="description" content="Scopri i servizi di Sacropinto tattoo studio a Piazza Armerina: tatuaggi personalizzati, consulenza gratuita, cover-up e flash tattoo." />
      </Helmet>

      <section className="py-24 bg-black min-h-screen">
        <Container>

          <div className="max-w-2xl mb-16">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">Cosa facciamo</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Servizi</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Ogni progetto è unico. Che tu abbia un'idea precisa o un vago senso di quello che vuoi, siamo qui per trasformarla in qualcosa di permanente e personale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
            {servicesData.map((service) => (
              <div key={service.id} className="bg-black p-8 hover:bg-gray-950 transition-colors duration-200">
                <h2 className="text-xl font-bold text-white mb-3">{service.title}</h2>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-gray-800 pt-16 text-center">
            <p className="text-gray-400 text-lg mb-6">
              Non sai da dove iniziare? Contattaci per una consulenza gratuita.
            </p>
            <Button href="/contatti" variant="primary">Prenota una consulenza</Button>
          </div>

        </Container>
      </section>
    </>
  )
}