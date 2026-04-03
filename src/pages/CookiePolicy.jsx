import { Helmet } from "react-helmet-async"
import Container from "../components/layout/Container"
import { buildTitle } from "../utils/seo"
import { CONTACT } from "../utils/constants"

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>{buildTitle("Cookie Policy")}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="py-24 bg-black min-h-screen">
        <Container>
          <div className="max-w-2xl mx-auto">

            <h1 className="text-4xl font-bold text-white mb-2">Cookie Policy</h1>
            <p className="text-gray-500 text-sm mb-12">Ultimo aggiornamento: aprile 2026</p>

            <div className="flex flex-col gap-10 text-gray-400 leading-relaxed">

              <div>
                <h2 className="text-white font-semibold text-lg mb-3">Cosa sono i cookie</h2>
                <p>I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo quando li visiti. Servono a far funzionare il sito, ricordare le tue preferenze e raccogliere informazioni statistiche.</p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-lg mb-3">Cookie tecnici</h2>
                <p>Utilizziamo cookie tecnici necessari al funzionamento del sito, come il cookie che memorizza il tuo consenso alla cookie policy. Questi cookie non richiedono il tuo consenso.</p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-lg mb-3">Cookie analytics</h2>
                <p>Con il tuo consenso, utilizziamo Google Analytics 4 per raccogliere dati anonimi sul traffico del sito. Questi cookie vengono installati solo dopo che hai espresso il tuo consenso tramite il banner.</p>
                <div className="mt-4 border border-gray-800 p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase tracking-widest">
                        <th className="text-left pb-3">Cookie</th>
                        <th className="text-left pb-3">Fornitore</th>
                        <th className="text-left pb-3">Durata</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-t border-gray-800">
                        <td className="py-3">_ga</td>
                        <td>Google Analytics</td>
                        <td>2 anni</td>
                      </tr>
                      <tr className="border-t border-gray-800">
                        <td className="py-3">_ga_*</td>
                        <td>Google Analytics</td>
                        <td>2 anni</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-white font-semibold text-lg mb-3">Come gestire i cookie</h2>
                <p>Puoi modificare le tue preferenze in qualsiasi momento cliccando sul banner cookie che appare in basso alla pagina. Puoi anche disabilitare i cookie dal tuo browser, ma alcune funzionalità del sito potrebbero non funzionare correttamente.</p>
              </div>

              <div>
                <h2 className="text-white font-semibold text-lg mb-3">Contatti</h2>
                <p>Per qualsiasi domanda sui cookie utilizzati da questo sito, scrivici a {CONTACT.email}.</p>
              </div>

            </div>
          </div>
        </Container>
      </section>
    </>
  )
}