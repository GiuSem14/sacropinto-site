import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { CONTACT } from "../../utils/constants"
import { periodDays, isPastDay, formatDayLong, formatPeriod } from "../../utils/guestDates"

const SLOTS = ["Mattina", "Pomeriggio", "Indifferente"]
const dayLabel = new Intl.DateTimeFormat("it-IT", { weekday: "short" })
const monthLabel = new Intl.DateTimeFormat("it-IT", { month: "short" })

/*
  Finestra per prenotare un guest: si sceglie il giorno dentro il suo periodo in studio,
  la fascia oraria e si scrive il nome. "Invia la richiesta" apre WhatsApp con tutto già scritto.
  Usa <dialog> nativo: focus intrappolato, chiusura con Esc, sfondo inerte.
*/
export default function GuestBookingDialog({ guest, periods, onClose }) {
  const ref = useRef(null)
  const days = periodDays(periods)
  const unparsed = periods.filter((p) => !p.from).map((p) => p.raw)

  const [day, setDay] = useState("")
  const [freeDay, setFreeDay] = useState("")
  const [slot, setSlot] = useState("Indifferente")
  const [idea, setIdea] = useState("")
  const [nome, setNome] = useState("")

  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  const chosenDay = days.length > 0 ? day : freeDay.trim()
  const ready = Boolean(chosenDay && nome.trim())

  const submit = (event) => {
    event.preventDefault()
    if (!ready) return
    const lines = [
      `Ciao! Vorrei prenotare con ${guest.nome}, guest da Sacropinto.`,
      "",
      `Giorno: ${chosenDay}`,
      `Fascia: ${slot}`,
      idea.trim() ? `Idea: ${idea.trim()}` : null,
      `Nome: ${nome.trim()}`,
      "",
      "È ancora disponibile?",
    ].filter((line) => line !== null)
    const url = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(lines.join("\n"))}`
    window.open(url, "_blank", "noopener,noreferrer")
    onClose()
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
      aria-labelledby="guest-dialog-title"
      className="m-auto w-[min(40rem,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] bg-gray-900 text-white p-0 backdrop:bg-black/75 backdrop:backdrop-blur-sm step-in"
    >
      <form onSubmit={submit} className="p-6 md:p-8 flex flex-col gap-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 id="guest-dialog-title" className="font-display text-4xl leading-none">{guest.nome}</h2>
            <p className="mt-2 text-gray-300">
              In studio {periods.map(formatPeriod).join(", ")}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Chiudi" className="w-11 h-11 -mr-2 -mt-2 flex items-center justify-center text-gray-300 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {days.length > 0 ? (
          <fieldset>
            <legend className="text-gray-300 mb-3">Che giorno vuoi venire?</legend>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {days.map((d) => {
                const value = formatDayLong(d)
                const past = isPastDay(d)
                const selected = day === value
                return (
                  <label
                    key={d.toISOString()}
                    className={`flex flex-col items-center justify-center min-h-16 border transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-verde ${
                      past
                        ? "border-gray-800 text-gray-600 cursor-not-allowed line-through"
                        : selected
                          ? "border-verde bg-verde text-black cursor-pointer"
                          : "border-gray-700 hover:border-gray-400 cursor-pointer"
                    }`}
                  >
                    <input type="radio" name="giorno" value={value} checked={selected} disabled={past} onChange={() => setDay(value)} className="sr-only" />
                    <span className="text-xs">{dayLabel.format(d)}</span>
                    <span className="font-display text-2xl leading-none">{d.getDate()}</span>
                    <span className="text-xs">{monthLabel.format(d)}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ) : (
          <label className="flex flex-col gap-2">
            <span className="text-gray-300">Che giorno preferisci? {unparsed.length > 0 && <span className="text-gray-500">({unparsed.join(", ")})</span>}</span>
            <input value={freeDay} onChange={(e) => setFreeDay(e.target.value)} className="bg-black border border-gray-700 px-4 min-h-12 focus:outline-none focus:border-verde" />
          </label>
        )}

        <fieldset>
          <legend className="text-gray-300 mb-3">In che fascia?</legend>
          <div className="flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <label key={s} className={`inline-flex items-center min-h-11 px-4 border cursor-pointer transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-verde ${slot === s ? "border-verde bg-verde text-black" : "border-gray-700 hover:border-gray-400"}`}>
                <input type="radio" name="fascia" value={s} checked={slot === s} onChange={() => setSlot(s)} className="sr-only" />
                {s}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className="text-gray-300">Cosa vorresti fare? <span className="text-gray-500">(facoltativo)</span></span>
          <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={3} placeholder={guest.stile ? `Es. un pezzo ${guest.stile.toLowerCase()} sull'avambraccio` : ""} className="bg-black border border-gray-700 px-4 py-3 resize-y placeholder:text-gray-500 focus:outline-none focus:border-verde" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-gray-300">Come ti chiami?</span>
          <input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="given-name" className="bg-black border border-gray-700 px-4 min-h-12 focus:outline-none focus:border-verde" />
        </label>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={!ready}
            className="min-h-12 px-8 bg-white text-black font-semibold hover:bg-verde transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Invia la richiesta
          </button>
          <p className="text-sm text-gray-400">Si apre WhatsApp con la richiesta già scritta.</p>
        </div>
      </form>
    </dialog>
  )
}
