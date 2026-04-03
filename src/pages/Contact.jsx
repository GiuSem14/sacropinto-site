import { Helmet } from "react-helmet-async"
import Container from "../components/layout/Container"
import { buildTitle } from "../utils/seo"
import { CONTACT, HOURS } from "../utils/constants"

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Contatti")}</title>
        <meta name="description" content="Contatta Sacropinto tattoo studio a Piazza Armerina. Prenota una consulenza gratuita, scrivici su WhatsApp o vieni a trovarci in studio." />
      </Helmet>

      <section className="py-24 bg-black min-h-screen">
        <Container>

          <div className="max-w-2xl mb-16">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">Vieni a trovarci</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contatti</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Hai un progetto in mente? Scrivici, chiamaci o passa direttamente in studio. La prima consulenza è sempre gratuita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Info contatti */}
            <div className="flex flex-col gap-10">

              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-3">Indirizzo</p>
                <p className="text-white">{CONTACT.address}</p>
              </div>

              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-3">WhatsApp</p>
                <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">{CONTACT.whatsapp}</a>
              </div>

              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-3">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="text-white hover:text-gray-300 transition-colors">{CONTACT.email}</a>
              </div>

              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-3">Instagram</p>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">@sacropinto</a>
              </div>

              <div>
                <p className="text-gray-500 uppercase tracking-widest text-xs mb-4">Orari</p>
                <ul className="flex flex-col gap-2">
                  {HOURS.map((h) => (
                    <li key={h.day} className="flex justify-between text-sm border-b border-gray-900 pb-2">
                      <span className="text-gray-400">{h.day}</span>
                      <span className="text-white">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Form */}
            <div>
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-6">Scrivici</p>
              <form action="https://formspree.io/f/TUOID" method="POST" className="flex flex-col gap-5">
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Nome</label>
                  <input type="text" name="nome" required className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors" placeholder="Il tuo nome" />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Email</label>
                  <input type="email" name="email" required className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors" placeholder="tua@email.com" />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Messaggio</label>
                  <textarea name="messaggio" required rows={5} className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-gray-600 transition-colors resize-none" placeholder="Raccontaci il tuo progetto..."></textarea>
                </div>
                <button type="submit" className="bg-white text-black font-semibold uppercase tracking-widest text-sm px-6 py-3 hover:bg-gray-200 transition-colors">
                  Invia messaggio
                </button>
              </form>
            </div>

          </div>
        </Container>
      </section>
    </>
  )
}