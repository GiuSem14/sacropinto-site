import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { NAV_LINKS, CONTACT } from "../../utils/constants"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40)
  const { pathname } = useLocation()

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Blocca lo scroll della pagina quando il menu mobile è aperto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  // Sopra l'hero della home la barra è trasparente, poi diventa piena
  const transparent = pathname === "/" && !scrolled && !open

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
        transparent ? "bg-transparent border-transparent" : "bg-black/90 backdrop-blur-md border-gray-800"
      }`}
    >
      <div className="px-4 sm:px-8">
        <div className="relative flex items-center h-16">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img
              src="/logo-sacropinto.png"
              alt="Sacropinto, torna alla home"
              className={`h-10 w-auto object-contain transition-opacity duration-500 ${transparent ? "opacity-0" : "opacity-100"}`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Principale">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-[15px] transition-colors duration-200 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-verde after:origin-left after:transition-transform after:duration-500 after:ease-[var(--ease-out-soft)] ${
                    active
                      ? "text-white after:scale-x-100"
                      : "text-gray-300 hover:text-white after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5 ml-auto">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-verde transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-300 hover:text-verde transition-colors">
              <FaWhatsapp size={20} />
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden text-white ml-auto w-11 h-11 -mr-2 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menu mobile a tutto schermo, le voci entrano una dopo l'altra */}
      <nav
        id="menu-mobile"
        aria-label="Principale"
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 bg-black transition-[opacity,visibility] duration-400 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="px-6 pt-8 flex flex-col">
          {NAV_LINKS.map((link, index) => (
            <li
              key={link.path}
              className="border-b border-gray-800 transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(16px)",
                transitionDelay: open ? `${80 + index * 50}ms` : "0ms",
              }}
            >
              <Link
                to={link.path}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.path ? "page" : undefined}
                className={`block py-4 font-display text-3xl ${pathname === link.path ? "text-verde" : "text-white"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 pt-8 flex items-center gap-6">
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-white">
            <FaInstagram size={24} />
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-300 hover:text-white">
            <FaWhatsapp size={24} />
          </a>
        </div>
      </nav>
    </header>
  )
}
