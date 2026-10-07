import { useSearchParams } from "react-router-dom"
import { VARIANTS } from "../utils/variants"

const STORAGE_KEY = "sacropinto-varianti"

export function readStoredVariants() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}")
  } catch {
    return {}
  }
}

export function storeVariant(key, id) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStoredVariants(), [key]: id }))
  } catch {
    // sessionStorage non disponibile: la scelta vale solo per l'URL corrente
  }
}

/**
 * Restituisce l'id della variante attiva per `key`.
 * Ordine: parametro nell'URL, poi scelta fatta in questa sessione, poi la predefinita.
 */
export default function useVariant(key) {
  const [params] = useSearchParams()
  const group = VARIANTS[key]
  const valid = (id) => group.options.some((option) => option.id === id)

  const fromUrl = params.get(key)
  if (fromUrl && valid(fromUrl)) return fromUrl

  const stored = readStoredVariants()[key]
  if (stored && valid(stored)) return stored

  return group.options[0].id
}
