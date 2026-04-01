import { Helmet } from "react-helmet-async"
import Hero from "../components/sections/Hero"
import HomePortfolioPreview from "../components/sections/HomePortfolioPreview"
import ContactCTA from "../components/sections/ContactCTA"
import { buildTitle } from "../utils/seo"

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{buildTitle()}</title>
        <meta name="description" content="Sacropinto è uno studio di tatuaggi a Piazza Armerina, Sicilia. Tatuaggi personalizzati, cover-up e consulenza gratuita. Prenota il tuo appuntamento." />
      </Helmet>
      <Hero />
      <HomePortfolioPreview />
      <ContactCTA />
    </>
  )
}