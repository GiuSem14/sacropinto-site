import { useState, useEffect, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { buildMeta } from "../utils/seo"
import { fetchGuests } from "../data/guestUtils"
import { CONTACT } from "../utils/constants"
import PageHeader from "../components/layout/PageHeader"
import GuestPosters from "../components/guest/GuestPosters"
import GuestBookingDialog from "../components/guest/GuestBookingDialog"
import Reveal from "../components/ui/Reveal"
import { applyAsGuestUrl, instagramUrl } from "../components/guest/guestLinks"
import { parseGuestPeriods, isPastGuest, formatPeriod } from "../utils/guestDates"

function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-busy="true" aria-label="Caricamento degli artisti ospiti">
      {[0, 1].map((i) => (
        <div key={i} className="h-96 bg-gray-900 animate-pulse" />
      ))}
    </div>
  )
}

function Empty({ message }) {
  return (
    <div className="max-w-xl py-10">
      <h2 className="font-display text-4xl text-white">{message}</h2>
      <p className="mt-4 text-lg text-gray-300 leading-relaxed">
        Annunciamo i guest su Instagram appena le date sono confermate: seguici per non perderli.
      </p>
      <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 min-h-12 px-6 bg-white text-black font-semibold hover:bg-verde transition-colors">
        <FaInstagram size={18} /> Segui Sacropinto
      </a>
    </div>
  )
}

// Guest che sono già stati in studio: archivio senza prenotazione
function PastGuests({ items }) {
  return (
    <section className="mt-24" aria-labelledby="guest-passati">
      <h2 id="guest-passati" className="font-display text-3xl md:text-4xl text-white">Sono già passati da noi</h2>
      <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map(({ guest, periods }, index) => (
          <Reveal as="li" key={guest.nome} delay={index * 80}>
            <div className="aspect-square bg-gray-900 overflow-hidden">
              {guest.foto && <img src={guest.foto} alt={`${guest.nome}, guest artist`} loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />}
            </div>
            <p className="mt-3 font-display text-xl text-white">{guest.nome}</p>
            <p className="text-sm text-gray-400">{[guest.stile, periods.map(formatPeriod).join(", ")].filter(Boolean).join(", ")}</p>
            {guest.instagram && (
              <a href={instagramUrl(guest)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                <FaInstagram size={14} /> Instagram
              </a>
            )}
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default function Guest() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGuests()
      .then(setGuests)
      .catch(() => setError("Non riusciamo a caricare i guest in questo momento."))
      .finally(() => setLoading(false))
  }, [])

  const [booking, setBooking] = useState(null)

  // Ogni guest con i suoi periodi in studio; chi ha finito va nell'archivio
  const { upcoming, past } = useMemo(() => {
    const all = guests.map((guest) => ({ guest, periods: parseGuestPeriods(guest.date) }))
    return {
      upcoming: all.filter((item) => !isPastGuest(item.periods)),
      past: all.filter((item) => isPastGuest(item.periods)),
    }
  }, [guests])
  const bookingItem = upcoming.find((item) => item.guest.nome === booking)

  const meta = buildMeta({
    title: "Artisti Guest",
    description: "Gli artisti ospiti di Sacropinto tattoo studio a Piazza Armerina. Stili e date delle sessioni guest.",
    path: "/guest",
  })

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:site_name" content={meta.ogSiteName} />
        <meta property="og:locale" content={meta.ogLocale} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
        <meta property="og:image" content={meta.ogImage} />
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <meta name="twitter:image" content={meta.twitterImage} />
      </Helmet>

      <PageHeader
        title="Artisti guest"
        intro="Tatuatori ospiti in studio per pochi giorni. Scegli il giorno che ti serve dentro il loro periodo e prenotalo su WhatsApp."
      />

      <section className="bg-black pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <Loading />}
          {!loading && error && <Empty message={error} />}
          {!loading && !error && upcoming.length === 0 && <Empty message="Nessun guest in programma, per ora." />}
          {!loading && !error && upcoming.length > 0 && <GuestPosters guests={upcoming} onBook={setBooking} />}
          {!loading && !error && past.length > 0 && <PastGuests items={past} />}

          <div className="mt-20 pt-12 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-display text-3xl text-white">Sei un tatuatore e vuoi venire da noi?</p>
              <p className="mt-2 text-gray-400">Scrivici con il tuo portfolio e i periodi in cui sei disponibile.</p>
            </div>
            <a href={applyAsGuestUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-12 px-6 border border-gray-600 text-white hover:border-white transition-colors">
              <FaWhatsapp size={18} /> Proponi una guest
            </a>
          </div>
        </div>
      </section>

      {bookingItem && (
        <GuestBookingDialog guest={bookingItem.guest} periods={bookingItem.periods} onClose={() => setBooking(null)} />
      )}
    </>
  )
}
