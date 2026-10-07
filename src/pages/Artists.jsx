import { Helmet } from "react-helmet-async"
import { buildMeta } from "../utils/seo"
import Button from "../components/ui/Button"
import PageHeader from "../components/layout/PageHeader"
import ArtistsEditorial from "../components/artists/ArtistsEditorial"
import { BOOKING_PATH } from "../utils/constants"

export default function Artists() {
  const meta = buildMeta({
    title: "Artisti",
    description: "Conosci gli artisti di Sacropinto tattoo studio a Piazza Armerina. Stili, esperienza e filosofia di ogni tatuatore.",
    path: "/artisti",
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
        title="Chi ti tatua"
        intro="Dietro ogni tatuaggio c'è una persona. Puoi scegliere con chi lavorare e indicarlo nella richiesta."
      />

      <section className="bg-black pt-12 pb-24">
        <ArtistsEditorial />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-display text-3xl md:text-4xl text-white max-w-[24ch]">Non sai a chi rivolgerti? Ti consigliamo noi.</p>
          <Button href={BOOKING_PATH} variant="primary">Richiedi il tuo tatuaggio</Button>
        </div>
      </section>
    </>
  )
}
