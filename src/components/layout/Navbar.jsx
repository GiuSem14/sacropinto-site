import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { NAV_LINKS, SITE_NAME, CONTACT } from "../../utils/constants"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="px-8">
        <div className="relative flex items-center h-16">
          {/* Logo - estrema sinistra */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo-sacropinto.png"
              alt="Sacropinto Tattoo Studio"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav - centrato */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-wide transition-colors duration-200 ${
                  pathname === link.path
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons - estrema destra (desktop) */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>

          {/* Mobile menu button - estrema destra (mobile) */}
          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-black border-t border-gray-800 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`text-sm uppercase tracking-wide ${
                pathname === link.path
                  ? "text-white font-semibold"
                  : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Social icons nel menu mobile */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
