import { createContext, useState, useEffect, useCallback } from "react"
import {
  DEFAULT_CONSENT,
  getConsent,
  saveConsent,
  clearConsent,
} from "../utils/cookieConsent"

/**
 * Cookie Consent Context.
 *
 * Provides global access to the user's cookie consent state and
 * the actions to update it. Any component in the tree can read
 * or update consent via the useCookieConsent() hook.
 */
export const CookieConsentContext = createContext(null)

export function CookieConsentProvider({ children }) {
  // The current consent state. Null means "user hasn't decided yet".
  const [consent, setConsent] = useState(null)

  // Whether the preferences modal is currently open
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  // On first mount, read any existing consent from localStorage
  useEffect(() => {
    const existing = getConsent()
    if (existing) {
      setConsent(existing)
    }
  }, [])

  /**
   * Accept all cookie categories.
   */
  const acceptAll = useCallback(() => {
    const newConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    saveConsent(newConsent)
    setConsent({ ...newConsent, timestamp: Date.now() })
    setPreferencesOpen(false)
  }, [])

  /**
   * Reject all non-necessary cookies.
   */
  const rejectAll = useCallback(() => {
    const newConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    saveConsent(newConsent)
    setConsent({ ...newConsent, timestamp: Date.now() })
    setPreferencesOpen(false)
  }, [])

  /**
   * Save a custom selection from the preferences modal.
   *
   * @param {object} preferences - { analytics: boolean, marketing: boolean }
   */
  const savePreferences = useCallback((preferences) => {
    const newConsent = {
      necessary: true,
      analytics: Boolean(preferences.analytics),
      marketing: Boolean(preferences.marketing),
    }
    saveConsent(newConsent)
    setConsent({ ...newConsent, timestamp: Date.now() })
    setPreferencesOpen(false)
  }, [])

  /**
   * Reset all consent — used by the "Manage cookies" footer link
   * to let users change their mind at any time.
   */
  const resetConsent = useCallback(() => {
    clearConsent()
    setConsent(null)
    setPreferencesOpen(false)
  }, [])

  /**
   * Open/close the preferences modal.
   */
  const openPreferences = useCallback(() => setPreferencesOpen(true), [])
  const closePreferences = useCallback(() => setPreferencesOpen(false), [])

  const value = {
    // State
    consent,
    hasDecided: consent !== null,
    preferencesOpen,

    // Actions
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
    openPreferences,
    closePreferences,

    // Defaults (useful for initial state of preferences form)
    defaultConsent: DEFAULT_CONSENT,
  }

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}
