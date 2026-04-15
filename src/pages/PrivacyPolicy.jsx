import { Helmet } from "react-helmet-async"
import Container from "../components/layout/Container"
import { buildMeta } from "../utils/seo"
import { SITE_NAME, CONTACT } from "../utils/constants"

export default function PrivacyPolicy() {
  const meta = buildMeta({
    title: "Privacy Policy",
    description: "Informativa sulla privacy di Sacropinto tattoo studio. Come trattiamo i tuoi dati personali nel rispetto del GDPR.",
    path: "/privacy-policy",
  })

  return (
    <>
      <Helmet>
        {/* Base SEO — noindex for legal pages */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="py-24 bg-black min-h-screen">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-500 text-sm mb-12">Ultimo aggiornamento: aprile 2026</p>
            <div className="flex flex-col gap-10 text-gray-400 leading-relaxed">
              <div>
                <h2 className="text-white font-semibold text-lg mb-3">1. Titolare del trattamento</h2>
                <p>{SITE_NAME}, {CONTACT.address}. Email: {CONTACT.email}</p>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-3">2. Dati raccolti</h2>
                <p>Raccogliamo i dati che ci fornisci volontariamente attraverso il form di contatto (nome, email, messaggio) e i dati di navigazione raccolti tramite Google Analytics 4 (pagine visitate, durata della visita, dispositivo utilizzato).</p>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-3">3. Finalità del trattamento</h2>
                <p>I dati del form vengono utilizzati esclusivamente per rispondere alle tue richieste. I dati analytics vengono utilizzati per migliorare il sito e comprendere come viene utilizzato.</p>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-3">4. Base giuridica</h2>
                <p>Il trattamento dei dati del form si basa sul consenso dell'interessato (art. 6, par. 1, lett. a del GDPR). I dati analytics sono trattati previo consenso tramite il banner cookie.</p>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-3">5. Conservazione dei dati</h2>
                <p>I dati del form vengono conservati per il tempo necessario a gestire la richiesta. I dati analytics vengono conservati per 14 mesi secondo le impostazioni predefinite di Google Analytics 4.</p>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-3">6. Diritti dell'interessato</h2>
                <p>Hai il diritto di accedere ai tuoi dati, rettificarli, cancellarli, limitarne il trattamento e opporti al trattamento. Per esercitare questi diritti, scrivici a {CONTACT.email}.</p>
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg mb-3">7. Trasferimento dati a terzi</h2>
                <p>I dati del form vengono trasmessi a Formspree Inc. per la gestione dell'invio email. I dati analytics vengono trasmessi a Google LLC. Entrambi i fornitori offrono garanzie adeguate ai sensi del GDPR.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
