import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useCookieConsent } from "../../hooks/useCookieConsent"

/**
 * Cookie Preferences Modal.
 *
 * Shown when the user clicks "Personalizza" on the banner or "Gestisci cookie"
 * in the footer. Allows the user to toggle individual cookie categories before
 * saving their preferences.
 *
 * Categories:
 * - Necessary: always on, not toggleable (required for the site to function)
 * - Analytics: Google Analytics and similar statistics tools
 * - Marketing: retargeting pixels, ads personalization
 */
export default function CookiePreferences() {
  const { preferencesOpen, closePreferences, savePreferences, consent } =
    useCookieConsent()

  // Local state for the toggles before the user hits "Save"
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  // When the modal opens, initialize toggles from current consent (if any)
  useEffect(() => {
    if (preferencesOpen) {
      setAnalytics(consent?.analytics ?? false)
      setMarketing(consent?.marketing ?? false)
    }
  }, [preferencesOpen, consent])

  // Don't render anything if the modal is closed
  if (!preferencesOpen) return null

  const handleSave = () => {
    savePreferences({ analytics, marketing })
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-preferences-title"
    >
      <div className="relative w-full max-w-lg bg-black border border-gray-800 p-6 md:p-8 max-h-[90vh] overflow-y-auto">

        {/* Close button */}
        <button
          onClick={closePreferences}
          aria-label="Chiudi"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2
          id="cookie-preferences-title"
          className="text-2xl font-bold text-white mb-2 uppercase tracking-wide"
        >
          Preferenze cookie
        </h2>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Scegli quali cookie accettare. I cookie necessari sono sempre attivi
          perché indispensabili al funzionamento del sito.
        </p>

        {/* Categorie */}
        <div className="flex flex-col gap-6 mb-8">

          {/* Necessary — always on */}
          <div className="border-t border-gray-800 pt-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-white font-semibold uppercase tracking-wide text-sm">
                  Necessari
                </h3>
                <p className="text-gray-500 text-xs mt-1">Sempre attivi</p>
              </div>
              <div className="shrink-0 px-3 py-1 border border-gray-700 text-gray-500 text-xs uppercase tracking-wide">
                Obbligatori
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Essenziali per il funzionamento del sito: memorizzano le tue
              preferenze di consenso e permettono la navigazione di base.
            </p>
          </div>

          {/* Analytics — toggleable */}
          <div className="border-t border-gray-800 pt-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-white font-semibold uppercase tracking-wide text-sm">
                Statistiche
              </h3>
              <button
                onClick={() => setAnalytics(!analytics)}
                aria-pressed={analytics}
                aria-label="Attiva cookie statistiche"
                className={`shrink-0 relative w-11 h-6 rounded-full transition-colors ${
                  analytics ? "bg-white" : "bg-gray-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-black transition-transform ${
                    analytics ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ci aiutano a capire come gli utenti usano il sito (pagine viste,
              tempo sul sito) in modo anonimo, per migliorare l'esperienza.
            </p>
          </div>

          {/* Marketing — toggleable */}
          <div className="border-t border-gray-800 pt-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-white font-semibold uppercase tracking-wide text-sm">
                Marketing
              </h3>
              <button
                onClick={() => setMarketing(!marketing)}
                aria-pressed={marketing}
                aria-label="Attiva cookie marketing"
                className={`shrink-0 relative w-11 h-6 rounded-full transition-colors ${
                  marketing ? "bg-white" : "bg-gray-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-black transition-transform ${
                    marketing ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Utilizzati per mostrarti annunci personalizzati sui social e
              misurare l'efficacia delle nostre campagne pubblicitarie.
            </p>
          </div>

        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full bg-white text-black font-semibold uppercase tracking-widest text-sm py-3 hover:bg-gray-200 transition-colors"
        >
          Salva preferenze
        </button>

      </div>
    </div>
  )
}
