import { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { SlidersHorizontal, X } from "lucide-react"
import { VARIANTS } from "../../utils/variants"
import useVariant, { storeVariant } from "../../hooks/useVariant"

const ENABLE_KEY = "sacropinto-varianti-on"

function isEnabled(params) {
  try {
    if (params.has("varianti")) sessionStorage.setItem(ENABLE_KEY, "1")
    return sessionStorage.getItem(ENABLE_KEY) === "1"
  } catch {
    return params.has("varianti")
  }
}

function Group({ groupKey, group, onPick }) {
  const active = useVariant(groupKey)
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm text-gray-400 mb-2">{group.label}</legend>
      <div className="flex flex-wrap gap-2">
        {group.options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={active === option.id}
            onClick={() => onPick(groupKey, option.id)}
            className={`min-h-9 px-3 text-sm border transition-colors ${
              active === option.id ? "bg-verde border-verde text-black" : "border-gray-700 text-gray-200 hover:border-gray-400"
            }`}
          >
            {option.id.toUpperCase()} · {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * Pannello per confrontare le varianti di design sulla preview.
 * Compare solo aprendo il sito con ?varianti (resta attivo per la sessione).
 */
export default function VariantSwitcher() {
  const [params] = useSearchParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  if (!isEnabled(params)) return null

  const pick = (key, id) => {
    storeVariant(key, id)
    const group = VARIANTS[key]
    const next = new URLSearchParams(pathname === group.route ? params : undefined)
    next.set(key, id)
    navigate(`${group.route}?${next.toString()}`, { replace: pathname === group.route })
  }

  // Prima i gruppi della pagina corrente
  const entries = Object.entries(VARIANTS).sort(([, a], [, b]) => (b.route === pathname) - (a.route === pathname))

  return (
    <div className="fixed left-4 bottom-4 z-[95] max-w-[calc(100vw-2rem)]">
      {open ? (
        <div className="w-[22rem] max-w-full max-h-[70svh] overflow-auto bg-black/95 backdrop-blur border border-gray-700 p-5 shadow-2xl flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl text-white">Varianti</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Chiudi il pannello varianti" className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-white">
              <X size={20} />
            </button>
          </div>
          {entries.map(([key, group]) => (
            <Group key={key} groupKey={key} group={group} onPick={pick} />
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 min-h-11 px-4 bg-verde text-black font-semibold shadow-2xl"
        >
          <SlidersHorizontal size={18} /> Varianti
        </button>
      )}
    </div>
  )
}
