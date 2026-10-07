import { Helmet } from "react-helmet-async"
import Hero from "../components/sections/Hero"
import HomePortfolioPreview from "../components/sections/HomePortfolioPreview"
import ArtistsPreview from "../components/sections/ArtistsPreview"
import ServicesPreview from "../components/sections/ServicesPreview"
import FAQPreview from "../components/sections/FAQPreview"
import ContactCTA from "../components/sections/ContactCTA"
import StitchedColumn from "../components/layout/StitchedColumn"
import { buildMeta } from "../utils/seo"

export default function Home() {
  const meta = buildMeta({
    description: "Sacropinto è uno studio di tatuaggi a Piazza Armerina, Sicilia. Tatuaggi personalizzati, cover-up e consulenza gratuita. Prenota il tuo appuntamento.",
    path: "/",
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
      <Hero />
      <StitchedColumn>
        <HomePortfolioPreview />
        <ArtistsPreview />
        <ServicesPreview />
        <FAQPreview />
      </StitchedColumn>
      <ContactCTA />
    </>
  )
}
