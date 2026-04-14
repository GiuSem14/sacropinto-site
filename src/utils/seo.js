import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, OG_IMAGE } from "./constants"

/**
 * Build a page title in the format "Page Title | Site Name".
 * Falls back to a descriptive default if no page title is provided.
 */
export function buildTitle(pageTitle) {
  if (!pageTitle) return `${SITE_NAME} | Tattoo Studio Piazza Armerina`
  return `${pageTitle} | ${SITE_NAME}`
}

/**
 * Build an absolute canonical URL for a given path.
 * Used for <link rel="canonical"> tags.
 */
export function buildCanonical(path) {
  return `${SITE_URL}${path}`
}

/**
 * Build an absolute URL for any site-relative asset (e.g., images).
 * Needed because Open Graph requires absolute URLs.
 */
function buildAbsoluteUrl(path) {
  if (!path) return ""
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`
}

/**
 * Build a complete meta tags object for a page.
 *
 * Returns all the values needed for <Helmet>: title, description,
 * canonical URL, Open Graph tags, and Twitter Card tags.
 *
 * @param {object} options
 * @param {string} [options.title] - Page-specific title (e.g. "Portfolio").
 *   If omitted, uses the site default.
 * @param {string} [options.description] - Page-specific description.
 *   If omitted, uses SITE_DESCRIPTION.
 * @param {string} [options.path="/"] - Page path (e.g. "/portfolio").
 *   Used to build canonical and og:url.
 * @param {string} [options.image] - Page-specific OG image path.
 *   If omitted, uses the default OG_IMAGE.
 * @returns {object} Meta values to spread into <Helmet>.
 */
export function buildMeta({ title, description, path = "/", image } = {}) {
  const fullTitle = buildTitle(title)
  const metaDescription = description || SITE_DESCRIPTION
  const canonicalUrl = buildCanonical(path)
  const imageUrl = buildAbsoluteUrl(image || OG_IMAGE)

  return {
    title: fullTitle,
    description: metaDescription,
    canonical: canonicalUrl,
    ogTitle: fullTitle,
    ogDescription: metaDescription,
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    ogType: "website",
    ogSiteName: SITE_NAME,
    ogLocale: "it_IT",
    twitterCard: "summary_large_image",
    twitterTitle: fullTitle,
    twitterDescription: metaDescription,
    twitterImage: imageUrl,
  }
}
