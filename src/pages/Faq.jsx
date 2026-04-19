import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { faqData } from "../data/faq"
import Container from "../components/layout/Container"
import { buildMeta } from "../utils/seo"

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex justify-between items-center gap-4 group"
      >
        <span className="text-white font-medium group-hover:text-gray-300 transition-colors">
          {question}
        </span>
        <span className="text-gray-500 text-xl shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="text-gray-400 pb-5 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  )
}

export default function Faq() {
  const meta = buildMeta({
    title: "FAQ",
    description: "Domande frequenti su Sacropinto tattoo studio a Piazza Armerina. Come prenotare, quanto costa, come prepararsi e come curare il tatuaggio.",
    path: "/faq",
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
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">Hai dei dubbi?</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Domande frequenti</h1>
            <p className="text-gray-400 mb-12 text-lg">
              Tutto quello che devi sapere prima di prenotare il tuo tatuaggio a Piazza Armerina.
            </p>
            <div>
              {faqData.map((item) => (
                <FAQItem key={item.id} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
