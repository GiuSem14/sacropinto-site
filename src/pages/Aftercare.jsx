import { Helmet } from "react-helmet-async"
import { TriangleAlert } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import PageHeader from "../components/layout/PageHeader"
import Reveal from "../components/ui/Reveal"
import useScrollProgress from "../hooks/useScrollProgress"
import { buildMeta } from "../utils/seo"
import { aftercare, aftercareWarnings } from "../data/studio"
import { CONTACT } from "../utils/constants"

export default function Aftercare() {
  const meta = buildMeta({
    title: "Cura del tatuaggio",
    description:
      "Come curare un tatuaggio appena fatto, fase per fase: le prime ore, i primi giorni, la squamatura e la protezione dal sole. La guida di Sacropinto, Piazza Armerina.",
    path: "/cura",
  })

  const [ref, progress] = useScrollProgress(0.55)
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Ciao! Ho un dubbio sulla guarigione del mio tatuaggio, vi mando una foto."
  )}`

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
        title="Cura del tatuaggio"
        intro="Le cose da fare, e da non fare, nelle settimane dopo la seduta. Salva questa pagina: ti servirà."
      />

      <section className="bg-black pt-16 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-16">
          {/* Fasi della guarigione, la linea si riempie mentre leggi */}
          <ol ref={ref} className="relative">
            <div aria-hidden="true" className="absolute left-[7px] top-3 bottom-3 w-px bg-gray-800">
              <div className="absolute inset-0 bg-verde origin-top" style={{ transform: `scaleY(${progress})` }} />
            </div>
            {aftercare.map((phase, index) => (
              <Reveal as="li" key={phase.when} delay={index * 60} className="relative pl-12 pb-16 last:pb-0">
                <span aria-hidden="true" className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-verde bg-black" />
                <p className="text-verde">{phase.when}</p>
                <h2 className="mt-1 font-display text-3xl md:text-4xl text-white">{phase.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {phase.points.map((point) => (
                    <li key={point} className="text-gray-300 leading-relaxed pl-5 relative before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-gray-500">
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 self-start">
            <Reveal className="border border-red-400/40 bg-red-950/20 p-6">
              <h2 className="flex items-center gap-3 text-white text-lg font-semibold">
                <TriangleAlert size={20} className="text-red-300" aria-hidden="true" />
                Scrivici subito se noti
              </h2>
              <ul className="mt-4 flex flex-col gap-2 text-gray-300">
                {aftercareWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-400">In caso di febbre o dolore forte, rivolgiti a un medico.</p>
            </Reveal>

            <Reveal delay={150} className="border border-gray-800 p-6">
              <h2 className="font-display text-2xl text-white">Hai un dubbio?</h2>
              <p className="mt-3 text-gray-300 leading-relaxed">
                Mandaci una foto del tatuaggio: ti diciamo se sta guarendo bene.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 min-h-12 px-6 bg-white text-black font-semibold hover:bg-verde transition-colors"
              >
                <FaWhatsapp size={18} /> Scrivici su WhatsApp
              </a>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
