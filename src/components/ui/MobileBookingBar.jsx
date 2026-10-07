import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaWhatsapp } from "react-icons/fa"
import { BOOKING_PATH, CONTACT } from "../../utils/constants"

/*
  Su telefono il bottone per prenotare è sempre a portata di pollice:
  la barra sale dal basso dopo il primo scroll e sparisce nella pagina di richiesta.
*/
export default function MobileBookingBar() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(() => window.scrollY > 400)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (pathname === BOOKING_PATH) return null

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-[70] bg-black/95 backdrop-blur border-t border-gray-800 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-3 transition-transform duration-500 ease-[var(--ease-out-soft)] ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <Link
        to={BOOKING_PATH}
        tabIndex={visible ? 0 : -1}
        className="flex-1 inline-flex items-center justify-center min-h-12 bg-white text-black font-semibold"
      >
        Richiedi il tuo tatuaggio
      </Link>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-label="Scrivi su WhatsApp"
        className="w-12 min-h-12 inline-flex items-center justify-center bg-[#25D366] text-white"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  )
}
