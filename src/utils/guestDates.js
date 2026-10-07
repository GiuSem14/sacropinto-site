/*
  Legge le date dei guest come le scrive lo studio nel foglio Google e le trasforma in periodi.
  Formati riconosciuti (anche più periodi separati da virgola):
    "15 Mag · 22 Mag 2026"   "15–22 maggio 2026"   "dal 15 al 22 maggio"
    "15 Mag 2026"            "15/05/2026"          "15/05/2026 - 22/05/2026"
  Se l'anno manca, si usa quello dell'altra data del periodo o l'anno in corso.
  Una voce non riconosciuta resta come testo (`raw`), così si può comunque prenotare.
*/

const MONTHS = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"]

function monthIndex(word) {
  return MONTHS.indexOf(word.toLowerCase().slice(0, 3))
}

// "15 Mag 2026", "15 maggio", "15/05/2026" → { day, month, year|null }
function parsePoint(text) {
  const t = text.trim()
  let m = t.match(/^(\d{1,2})[/.](\d{1,2})(?:[/.](\d{2,4}))?$/)
  if (m) {
    const year = m[3] ? (m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3])) : null
    return { day: Number(m[1]), month: Number(m[2]) - 1, year }
  }
  m = t.match(/^(\d{1,2})\s+([a-zà-ù]+)\.?(?:\s+(\d{4}))?$/i)
  if (m && monthIndex(m[2]) >= 0) return { day: Number(m[1]), month: monthIndex(m[2]), year: m[3] ? Number(m[3]) : null }
  return null
}

function toDate({ day, month, year }) {
  return new Date(year, month, day)
}

function parseEntry(entry, fallbackYear) {
  const text = entry.trim().replace(/^dal\s+/i, "")
  if (!text) return null

  // Periodo: "A · B", "A - B", "A – B", "A al B"
  const parts = text.split(/\s*(?:·|–|—|\s-\s|\bal\b)\s*/i).filter(Boolean)
  if (parts.length === 2) {
    let start = parsePoint(parts[0])
    const end = parsePoint(parts[1])
    // "15–22 maggio 2026": il primo pezzo è solo il giorno
    if (!start && end && /^\d{1,2}$/.test(parts[0].trim())) start = { day: Number(parts[0]), month: end.month, year: end.year }
    if (start && end) {
      const year = end.year ?? start.year ?? fallbackYear
      let from = toDate({ ...start, year: start.year ?? year })
      const to = toDate({ ...end, year })
      // "28 Dic · 2 Gen 2027": il periodo scavalca l'anno
      if (from > to && start.year == null) from = toDate({ ...start, year: year - 1 })
      if (from <= to) return { from, to, raw: entry.trim() }
    }
  }

  // Data singola, anche "15-22 maggio" senza spazi intorno al trattino
  const dash = text.match(/^(\d{1,2})-(\d{1,2})\s+(.+)$/)
  if (dash) {
    const end = parsePoint(`${dash[2]} ${dash[3]}`)
    if (end) {
      const year = end.year ?? fallbackYear
      return { from: toDate({ day: Number(dash[1]), month: end.month, year }), to: toDate({ ...end, year }), raw: entry.trim() }
    }
  }
  const single = parsePoint(text)
  if (single) {
    const date = toDate({ ...single, year: single.year ?? fallbackYear })
    return { from: date, to: date, raw: entry.trim() }
  }
  return { from: null, to: null, raw: entry.trim() }
}

export function parseGuestPeriods(value, now = new Date()) {
  if (!value) return []
  return String(value)
    .split(/[,;]/)
    .map((entry) => parseEntry(entry, now.getFullYear()))
    .filter(Boolean)
}

// Tutti i giorni dei periodi, uno per uno
export function periodDays(periods) {
  const days = []
  periods.forEach(({ from, to }) => {
    if (!from) return
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) days.push(new Date(d))
  })
  return days
}

const startOfToday = (now = new Date()) => new Date(now.getFullYear(), now.getMonth(), now.getDate())

export const isPastDay = (day, now) => day < startOfToday(now)

// Un guest è "passato" se tutti i suoi periodi riconosciuti sono finiti
export function isPastGuest(periods, now) {
  const known = periods.filter((p) => p.to)
  if (known.length === 0 || known.length < periods.length) return false
  return known.every((p) => p.to < startOfToday(now))
}

const long = new Intl.DateTimeFormat("it-IT", { weekday: "long", day: "numeric", month: "long" })
const short = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric" })
const monthYear = new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" })

export const formatDayLong = (d) => long.format(d)

export function formatPeriod({ from, to, raw }) {
  if (!from) return raw
  if (from.getTime() === to.getTime()) return short.format(from)
  if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
    return `${from.getDate()}–${to.getDate()} ${monthYear.format(to)}`
  }
  return `${short.format(from)} – ${short.format(to)}`
}
