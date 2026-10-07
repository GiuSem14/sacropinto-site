import { FaInstagram } from "react-icons/fa"
import { CalendarDays, User } from "lucide-react"
import Reveal from "../ui/Reveal"
import { instagramUrl } from "./guestLinks"
import { formatPeriod } from "../../utils/guestDates"

/*
  Ogni guest è una locandina a tutta altezza, come quelle appese in studio:
  foto, nome enorme, il periodo in studio e il bottone per scegliere il giorno.
  Si scorrono di lato.
*/
export default function GuestPosters({ guests, onBook }) {
  return (
    <div className="flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {guests.map(({ guest, periods }, index) => (
        <Reveal
          as="article"
          key={guest.nome}
          delay={index * 140}
          className="snap-start shrink-0 w-[84vw] sm:w-[60vw] lg:w-[30rem] bg-gray-900 flex flex-col"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            {guest.foto ? (
              <img src={guest.foto} alt={`${guest.nome}, guest artist`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-700"><User size={64} aria-hidden="true" /></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
            <p className="absolute top-5 left-5 bg-black/70 text-white px-3 py-1">Guest a Sacropinto</p>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h2 className="font-display text-5xl md:text-6xl leading-[0.95] text-white break-words">{guest.nome}</h2>
              {guest.stile && <p className="mt-2 text-verde text-lg">{guest.stile}</p>}
            </div>
          </div>

          <div className="p-6 pt-2 flex-1 flex flex-col gap-4">
            {periods.length > 0 ? (
              <p className="flex items-center gap-3 text-white">
                <CalendarDays size={20} className="text-verde shrink-0" aria-hidden="true" />
                <span className="font-display text-2xl">{periods.map(formatPeriod).join(", ")}</span>
              </p>
            ) : (
              <p className="text-gray-400">Date in arrivo.</p>
            )}
            {periods.length > 0 && (
              <button
                type="button"
                onClick={() => onBook(guest.nome)}
                className="group flex items-stretch min-h-14 bg-white text-black hover:bg-verde transition-colors"
              >
                <span className="flex-1 flex items-center px-4 font-semibold">Prenota un giorno</span>
                <span aria-hidden="true" className="w-px my-2 stitch-line" />
                <span className="flex items-center px-4">Scegli</span>
              </button>
            )}
            {guest.instagram && (
              <a href={instagramUrl(guest)} target="_blank" rel="noopener noreferrer" className="mt-auto pt-2 inline-flex items-center gap-2 text-gray-300 hover:text-white">
                <FaInstagram size={18} /> I suoi lavori
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
