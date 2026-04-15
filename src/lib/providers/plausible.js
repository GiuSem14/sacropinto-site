/**
 * Plausible Analytics Provider
 *
 * Privacy-first analytics that does NOT require cookie consent
 * (no cookies, no personal data tracked). Loaded only when
 * ANALYTICS_PROVIDER === "plausible" in constants.js.
 *
 * Note: even though Plausible is consent-free, this template still
 * routes it through the cookie consent system for consistency.
 * Strictly speaking, it could be loaded unconditionally.
 *
 * @module lib/providers/plausible
 */

const SCRIPT_ID = "plausible-script"

/**
 * Load Plausible by injecting the official script tag.
 *
 * @param {object} config
 * @param {string} config.domain - The site domain registered on Plausible (e.g., "sacropinto.it")
 */
export function load({ domain }) {
  if (!domain) {
    console.warn(
      "[Plausible] Skipped loading: domain is missing. " +
      "Update ANALYTICS_PLAUSIBLE_DOMAIN in constants.js."
    )
    return
  }

  if (isLoaded()) return

  const script = document.createElement("script")
  script.id = SCRIPT_ID
  script.defer = true
  script.dataset.domain = domain
  script.src = "https://plausible.io/js/script.js"
  document.head.appendChild(script)
}

/**
 * Remove the Plausible script from the page.
 */
export function unload() {
  document.getElementById(SCRIPT_ID)?.remove()
}

/**
 * Check if Plausible is currently loaded.
 *
 * @returns {boolean}
 */
export function isLoaded() {
  return document.getElementById(SCRIPT_ID) !== null
}
