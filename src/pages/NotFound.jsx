import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import Container from "../components/layout/Container"
import { buildTitle } from "../utils/seo"
import Button from "../components/ui/Button"

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Pagina non trovata")}</title>
        <meta name="description" content="La pagina che cerchi non esiste. Torna alla home o esplora il portfolio di Sacropinto." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="py-24 bg-black min-h-screen flex items-center">
        <Container>
          <div className="max-w-2xl mx-auto text-center">

            {/* Big 404 */}
            <p className="text-gray-800 text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter mb-4">
              404
            </p>

            {/* Title */}
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-3">
              Pagina non trovata
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questa pagina è un tatuaggio mai disegnato
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              L'URL che stai cercando non esiste o è stato spostato.
              Torna indietro o esplora i nostri lavori reali.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/portfolio" variant="primary">
                Vedi il portfolio
              </Button>
              <Link
                to="/"
                className="inline-flex items-center justify-center border border-gray-700 text-gray-300 hover:text-white hover:border-gray-400 uppercase tracking-widest text-sm px-6 py-3 transition-colors"
              >
                Torna alla home
              </Link>
            </div>

          </div>
        </Container>
      </section>
    </>
  )
}
