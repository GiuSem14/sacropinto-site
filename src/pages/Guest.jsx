import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { buildMeta } from "../utils/seo"
import { fetchGuests } from "../data/guestUtils"
import { CONTACT } from "../utils/constants"
import PageHeader from "../components/layout/PageHeader"
import GuestCards from "../components/guest/GuestCards"
import GuestCalendar from "../components/guest/GuestCalendar"
import GuestPosters from "../components/guest/GuestPosters"
import { applyAsGuestUrl } from "../components/guest/guestLinks"
import useVariant from "../hooks/useVariant"

const LAYOUTS = { a: GuestCards, b: GuestCalendar, c: GuestPosters }

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

  const variant = useVariant("guest")
  const Layout = LAYOUTS[variant] ?? GuestCards

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
        intro="Tatuatori ospiti in studio per pochi giorni. Le date sono limitate: scegli quella che ti serve e prenotala su WhatsApp."
      />

      <section className="bg-black pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <Loading />}
          {!loading && error && <Empty message={error} />}
          {!loading && !error && guests.length === 0 && <Empty message="Nessun guest in programma, per ora." />}
          {!loading && !error && guests.length > 0 && <Layout guests={guests} />}

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
    </>
  )
}
