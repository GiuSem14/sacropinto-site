import { useContext } from "react"
import { CookieConsentContext } from "../context/CookieConsentContext"

/**
 * Custom hook to access the cookie consent context.
 *
 * Provides access to the current consent state and all actions
 * (acceptAll, rejectAll, savePreferences, resetConsent, etc.).
 *
 * Must be used within a <CookieConsentProvider> tree.
 *
 * @returns {object} The cookie consent context value.
 * @throws {Error} If used outside of a CookieConsentProvider.
 *
 * @example
 * function MyComponent() {
 *   const { hasDecided, acceptAll, openPreferences } = useCookieConsent()
 *   if (!hasDecided) return <button onClick={acceptAll}>Accetta</button>
 *   return null
 * }
 */
export function useCookieConsent() {
  const context = useContext(CookieConsentContext)

  if (context === null) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider. " +
      "Make sure your app is wrapped with <CookieConsentProvider> in main.jsx."
    )
  }

  return context
}
