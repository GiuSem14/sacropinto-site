import { SITE_NAME, SITE_URL } from "./constants"

export function buildTitle(pageTitle) {
  if (!pageTitle) return `${SITE_NAME} | Tattoo Studio Piazza Armerina`
  return `${pageTitle} | ${SITE_NAME}`
}

export function buildCanonical(path) {
  return `${SITE_URL}${path}`
}