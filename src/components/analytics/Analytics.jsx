import { useEffect } from "react"
import { useCookieConsent } from "../../hooks/useCookieConsent"
import { loadAnalytics, unloadAnalytics } from "../../lib/analytics"

/**
 * Analytics Component
 *
 * Reactive wrapper that loads or unloads the configured analytics
 * provider based on the user's cookie consent state.
 *
 * - When consent.analytics becomes true → loads the provider
 * - When consent.analytics becomes false → unloads the provider
 * - When consent is not yet decided → does nothing (no tracking)
 *
 * This component renders nothing visually. It only manages side effects.
 *
 * Mount it once in App.jsx, inside the CookieConsentProvider tree.
 */
export default function Analytics() {
  const { consent } = useCookieConsent()

  useEffect(() => {
    // No consent decision yet → don't load anything
    if (!consent) return

    if (consent.analytics) {
      loadAnalytics()
    } else {
      unloadAnalytics()
    }
  }, [consent])

  return null
}
