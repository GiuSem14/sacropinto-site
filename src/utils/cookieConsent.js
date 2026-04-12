/**
 * Cookie consent storage utilities.
 *
 * This module handles the persistence of user cookie preferences in localStorage.
 * It is intentionally decoupled from any React code so it can be unit-tested
 * and reused in non-React contexts if needed.
 */

const STORAGE_KEY = "cookie-consent"
const CONSENT_VERSION = 1
const CONSENT_DURATION_DAYS = 365

/**
 * Default consent state: only necessary cookies accepted, all others denied.
 * Necessary cookies cannot be disabled by law.
 */
export const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
}

/**
 * Read the current consent state from localStorage.
 *
 * @returns {object|null} The consent object if found and valid, null otherwise.
 *   Shape: { necessary, analytics, marketing, timestamp, version }
 */
export function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)

    // Invalidate consent if version is outdated (e.g., we added new categories)
    if (parsed.version !== CONSENT_VERSION) return null

    // Invalidate consent if expired
    const ageInDays = (Date.now() - parsed.timestamp) / (1000 * 60 * 60 * 24)
    if (ageInDays > CONSENT_DURATION_DAYS) return null

    return parsed
  } catch (error) {
    // Malformed JSON or localStorage unavailable
    console.warn("Failed to read cookie consent:", error)
    return null
  }
}

/**
 * Save a consent state to localStorage with timestamp and version.
 *
 * @param {object} consent - The consent object with category booleans.
 *   Shape: { necessary, analytics, marketing }
 */
export function saveConsent(consent) {
  try {
    const payload = {
      ...consent,
      necessary: true, // Necessary cookies cannot be disabled
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (error) {
    console.warn("Failed to save cookie consent:", error)
  }
}

/**
 * Remove the saved consent, forcing the banner to show again.
 * Useful for the "reset preferences" flow.
 */
export function clearConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn("Failed to clear cookie consent:", error)
  }
}

/**
 * Check whether the user has made any consent decision yet.
 *
 * @returns {boolean} True if a valid consent exists, false if the banner should show.
 */
export function hasConsent() {
  return getConsent() !== null
}
