/**
 * Analytics Router
 *
 * Central dispatcher that routes load/unload calls to the correct
 * provider based on ANALYTICS_PROVIDER from constants.js.
 *
 * To switch provider: change ANALYTICS_PROVIDER in constants.js.
 * To add a new provider: create lib/providers/<name>.js with the
 * same interface (load, unload, isLoaded) and add a case below.
 *
 * @module lib/analytics
 */

import {
  ANALYTICS_PROVIDER,
  ANALYTICS_GA4_ID,
  ANALYTICS_PLAUSIBLE_DOMAIN,
} from "../utils/constants"

import * as googleAnalytics from "./providers/googleAnalytics"
import * as plausible from "./providers/plausible"

/**
 * Load the configured analytics provider.
 * Should be called only after the user has given analytics consent.
 */
export function loadAnalytics() {
  switch (ANALYTICS_PROVIDER) {
    case "google":
      googleAnalytics.load({ measurementId: ANALYTICS_GA4_ID })
      break
    case "plausible":
      plausible.load({ domain: ANALYTICS_PLAUSIBLE_DOMAIN })
      break
    case "none":
      // Intentional no-op
      break
    default:
      console.warn(
        `[Analytics] Unknown provider "${ANALYTICS_PROVIDER}". ` +
        `Valid values: "google", "plausible", "none".`
      )
  }
}

/**
 * Unload the currently active analytics provider.
 * Should be called when the user revokes analytics consent.
 */
export function unloadAnalytics() {
  switch (ANALYTICS_PROVIDER) {
    case "google":
      googleAnalytics.unload()
      break
    case "plausible":
      plausible.unload()
      break
    case "none":
      break
  }
}

/**
 * Check if the configured provider is currently loaded.
 *
 * @returns {boolean}
 */
export function isAnalyticsLoaded() {
  switch (ANALYTICS_PROVIDER) {
    case "google":
      return googleAnalytics.isLoaded()
    case "plausible":
      return plausible.isLoaded()
    default:
      return false
  }
}
