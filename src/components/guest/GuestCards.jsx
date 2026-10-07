import { FaInstagram } from "react-icons/fa"
import { User } from "lucide-react"
import Reveal from "../ui/Reveal"
import { guestDates, bookDateUrl, instagramUrl } from "./guestLinks"

/* Variante A — Schede: foto, nome, stile e le date come bottoni da prenotare */
export default function GuestCards({ guests }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {guests.map((guest, index) => (
        <Reveal as="article" key={guest.nome} delay={(index % 2) * 150} className="border border-gray-800">
          <div className="relative aspect-[4/5] bg-gray-900 overflow-hidden group">
            {guest.foto ? (
              <img src={guest.foto} alt={`${guest.nome}, guest artist`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-700"><User size={56} aria-hidden="true" /></div>
            )}
          </div>
          <div className="p-6 md:p-8">
            <h2 className="font-display text-4xl text-white">{guest.nome}</h2>
            {guest.stile && <p className="mt-1 text-verde">{guest.stile}</p>}
            {guestDates(guest).length > 0 && (
              <>
                <p className="mt-6 text-gray-400">Date disponibili, tocca per prenotare</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {guestDates(guest).map((date) => (
                    <li key={date}>
                      <a href={bookDateUrl(guest, date)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 px-4 border border-gray-700 text-white hover:border-verde hover:bg-verde hover:text-black transition-colors">
                        {date}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {guest.instagram && (
              <a href={instagramUrl(guest)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-gray-300 hover:text-white">
                <FaInstagram size={18} /> Guarda i suoi lavori su Instagram
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
