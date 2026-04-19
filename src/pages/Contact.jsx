import { Helmet } from "react-helmet-async"
import Container from "../components/layout/Container"
import { buildMeta } from "../utils/seo"
import { CONTACT, HOURS, GOOGLE_MAPS_EMBED_URL } from "../utils/constants"

export default function Contact() {
  const meta = buildMeta({
    title: "Contatti",
    description: "Contatta Sacropinto tattoo studio a Piazza Armerina. Prenota una consulenza gratuita, scrivici su WhatsApp o vieni a trovarci in studio.",
    path: "/contatti",
  })

  return (
    <>
      <Helmet>
        {/* Base SEO */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />

        {/* Open Graph — Facebook, WhatsApp, LinkedIn */}
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:site_name" content={meta.ogSiteName} />
        <meta property="og:locale" content={meta.ogLocale} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
        <meta property="og:image" content={meta.ogImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <meta name="twitter:image" content={meta.twitterImage} />
      </Helmet>

      <section className="py-24 bg-black min-h-screen">
        <Container>

          {/* 1. Header */}
          <div className="max-w-2xl mb-16">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">Vieni a trovarci</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Contatti</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Hai un progetto in mente? Scrivici, chiamaci o passa direttamente in studio. La prima consulenza è sempre gratuita.
            </p>
          </div>

          {/* 2. Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-900 p-6 border border-gray-800">
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-3">Indirizzo</p>
              <p className="text-white">{CONTACT.address}</p>
            </div>
            <div className="bg-gray-900 p-6 border border-gray-800">
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-3">WhatsApp</p>
              <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">{CONTACT.whatsapp}</a>
            </div>
            <div className="bg-gray-900 p-6 border border-gray-800">
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-3">Email</p>
              <a href={`mailto:${CONTACT.email}`} className="text-white hover:text-gray-300 transition-colors">{CONTACT.email}</a>
            </div>
            <div className="bg-gray-900 p-6 border border-gray-800">
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-3">Instagram</p>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">@sacropinto</a>
            </div>
          </div>

          {/* 3. Hours */}
          <div className="mb-20">
            <p className="text-gray-500 uppercase tracking-widest text-xs mb-6">Orari</p>
            {/* Desktop: 7 columns */}
            <div className="hidden md:grid grid-cols-7 gap-4">
              {HOURS.map((h) => (
                <div key={h.day} className="flex flex-col gap-2">
                  <span className="text-gray-400 text-sm">{h.day}</span>
                  <span className="text-white text-sm">{h.hours}</span>
                </div>
              ))}
            </div>
            {/* Mobile: vertical list */}
            <ul className="flex flex-col gap-2 md:hidden">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between text-sm border-b border-gray-900 pb-2">
                  <span className="text-gray-400">{h.day}</span>
                  <span className="text-white">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Form */}
          <div className="max-w-xl mx-auto mt-20">
            <p className="text-gray-500 uppercase tracking-widest text-xs mb-6">Scrivici</p>
            <form action="https://formspree.io/f/xbdqgrjr" method="POST" className="flex flex-col gap-5">
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

          {/* 5. Map */}
          {GOOGLE_MAPS_EMBED_URL && (
            <div className="mt-20">
              <p className="text-gray-500 uppercase tracking-widest text-xs mb-6">Dove siamo</p>
              <div className="w-full aspect-[16/9] md:aspect-[21/9] border border-gray-800 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa di Sacropinto Tattoo Studio"
                />
              </div>
            </div>
          )}

        </Container>
      </section>
    </>
  )
}
