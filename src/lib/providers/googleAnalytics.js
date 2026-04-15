/**
 * Google Analytics 4 Provider
 *
 * Encapsulates the logic to load and unload Google Analytics 4 (GA4)
 * via the official gtag.js script. This module is consent-aware and
 * idempotent — calling load() twice is safe, and unload() fully removes
 * the GA4 footprint from the page.
 *
 * Public interface (shared by all analytics providers):
 *   - load(config)   → inject scripts and initialize GA4
 *   - unload()       → remove scripts and clear gtag state
 *   - isLoaded()     → check if GA4 is currently active
 *
 * @module lib/providers/googleAnalytics
 */

const SCRIPT_ID = "ga4-script"
const SCRIPT_INLINE_ID = "ga4-inline"

/**
 * Load Google Analytics 4 by injecting the gtag.js script and
 * initializing the dataLayer with the given Measurement ID.
 *
 * @param {object} config
 * @param {string} config.measurementId - GA4 Measurement ID (e.g., "G-XXXXXXXXXX")
 */
export function load({ measurementId }) {
  // Guard against missing or placeholder ID
  if (!measurementId || measurementId === "G-PLACEHOLDER") {
    console.warn(
      "[GA4] Skipped loading: measurementId is missing or placeholder. " +
      "Update ANALYTICS_GA4_ID in constants.js with a real ID."
    )
    return
  }

  // Idempotency: don't load twice
  if (isLoaded()) return

  // Inject the external gtag.js script
  const script = document.createElement("script")
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Inject the inline initialization script
  const inline = document.createElement("script")
  inline.id = SCRIPT_INLINE_ID
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      anonymize_ip: true
    });
  `
  document.head.appendChild(inline)
}

/**
 * Unload GA4 by removing all injected scripts and clearing the
 * dataLayer and gtag function from the global scope.
 *
 * Used when the user revokes analytics consent.
 */
export function unload() {
  // Remove the injected scripts
  document.getElementById(SCRIPT_ID)?.remove()
  document.getElementById(SCRIPT_INLINE_ID)?.remove()

  // Clear globals (best effort — already-fired events can't be unsent)
  if (typeof window !== "undefined") {
    delete window.dataLayer
    delete window.gtag
  }
}

/**
 * Check if GA4 is currently loaded by looking for the injected script.
 *
 * @returns {boolean}
 */
export function isLoaded() {
  return document.getElementById(SCRIPT_ID) !== null
}
