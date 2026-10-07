import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { User } from "lucide-react"
import Reveal from "../ui/Reveal"
import { guestDates, bookDateUrl, instagramUrl } from "./guestLinks"

/*
  Variante B — Calendario.
  Una riga per ogni data, nell'ordine del foglio: chi viene, che stile fa e il bottone
  per bloccare proprio quel giorno. Per chi ragiona per "quando", non per "chi".
*/
export default function GuestCalendar({ guests }) {
  const rows = guests.flatMap((guest) => guestDates(guest).map((date) => ({ guest, date })))
  const undated = guests.filter((guest) => guestDates(guest).length === 0)

  return (
    <div>
      <ol className="border-t border-gray-800">
        {rows.map(({ guest, date }, index) => (
          <Reveal as="li" key={`${guest.nome}-${date}`} delay={Math.min(index, 6) * 70} className="group border-b border-gray-800">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[14rem_minmax(0,1fr)_auto] items-center gap-x-6 gap-y-3 py-6 transition-colors duration-300 group-hover:bg-gray-900/60 md:px-4">
              <p className="col-span-2 md:col-span-1 font-display text-3xl md:text-4xl text-white">{date}</p>
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center text-gray-600">
                  {guest.foto ? <img src={guest.foto} alt="" loading="lazy" className="w-full h-full object-cover" /> : <User size={24} aria-hidden="true" />}
                </div>
                <div className="min-w-0">
                  <p className="text-lg text-white truncate">{guest.nome}</p>
                  <p className="text-gray-400 truncate">{guest.stile}</p>
                </div>
                {guest.instagram && (
                  <a href={instagramUrl(guest)} target="_blank" rel="noopener noreferrer" aria-label={`Instagram di ${guest.nome}`} className="hidden sm:flex w-10 h-10 items-center justify-center text-gray-400 hover:text-white">
                    <FaInstagram size={18} />
                  </a>
                )}
              </div>
              <a
                href={bookDateUrl(guest, date)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Prenota ${guest.nome} il ${date}`}
                className="inline-flex items-center justify-center gap-2 min-h-12 px-5 bg-white text-black font-semibold hover:bg-verde transition-colors whitespace-nowrap"
              >
                <FaWhatsapp size={18} /> <span className="hidden sm:inline">Prenota questa data</span><span className="sm:hidden">Prenota</span>
              </a>
            </div>
          </Reveal>
        ))}
      </ol>

      {undated.length > 0 && (
        <p className="mt-8 text-gray-400">
          Date da annunciare: {undated.map((guest) => guest.nome).join(", ")}.
        </p>
      )}
    </div>
  )
}
