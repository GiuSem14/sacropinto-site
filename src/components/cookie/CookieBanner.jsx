import { Link } from "react-router-dom"
import { useCookieConsent } from "../../hooks/useCookieConsent"
import CookiePreferences from "./CookiePreferences"

/**
 * Cookie Consent Banner.
 *
 * Appears at the bottom of the page on first visit. Shows 3 buttons:
 * - Rifiuta tutto: rejects all non-necessary cookies
 * - Personalizza: opens the preferences modal
 * - Accetta tutto: accepts all categories
 *
 * Conforms to Italian Garante Privacy guidelines (equal visibility for
 * accept/reject, granular choice available, no dark patterns).
 *
 * Also renders the CookiePreferences modal globally so it's available
 * from both the banner and the footer "Gestisci cookie" link.
 */
export default function CookieBanner() {
  const { hasDecided, acceptAll, rejectAll, openPreferences } =
    useCookieConsent()

  return (
    <>
      {/* The banner only appears if the user hasn't decided yet */}
      {!hasDecided && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[90] bg-black border-t border-gray-800"
          role="region"
          aria-label="Informativa cookie"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">

              {/* Text */}
              <div className="flex-1">
                <p className="text-white font-semibold uppercase tracking-wide text-sm mb-2">
                  Cookie policy
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Utilizziamo cookie tecnici e, con il tuo consenso, cookie di
                  statistica e marketing per migliorare la tua esperienza.
                  Puoi accettare tutto, rifiutare o personalizzare le tue
                  preferenze. Leggi la nostra{" "}
                  <Link
                    to="/cookie-policy"
                    className="text-white underline hover:text-gray-300 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  {" "}per maggiori informazioni.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={rejectAll}
                  className="border border-gray-700 text-gray-300 hover:text-white hover:border-gray-400 uppercase tracking-widest text-xs px-5 py-3 transition-colors"
                >
                  Rifiuta tutto
                </button>
                <button
                  onClick={openPreferences}
                  className="border border-gray-700 text-gray-300 hover:text-white hover:border-gray-400 uppercase tracking-widest text-xs px-5 py-3 transition-colors"
                >
                  Personalizza
                </button>
                <button
                  onClick={acceptAll}
                  className="bg-white text-black font-semibold uppercase tracking-widest text-xs px-5 py-3 hover:bg-gray-200 transition-colors"
                >
                  Accetta tutto
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* The preferences modal is always mounted (controlled by its own state) */}
      <CookiePreferences />
    </>
  )
}
