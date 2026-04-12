import { Link } from "react-router-dom"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { SITE_NAME, CONTACT, NAV_LINKS } from "../../utils/constants"

export default function Footer() {
  const year = new Date().getFullYear()
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`

  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Colonna 1 — Brand + social */}
          <div>
            <p className="text-white font-bold text-xl tracking-widest uppercase mb-3">
              {SITE_NAME}
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Studio di tatuaggi a Piazza Armerina.<br />
              Arte sulla pelle, qualità artigianale.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
                <span className="text-sm">Instagram</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Colonna 2 — Navigazione */}
          <div>
            <p className="text-white font-semibold uppercase tracking-wide text-sm mb-4">Navigazione</p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 3 — Contatti */}
          <div>
            <p className="text-white font-semibold uppercase tracking-wide text-sm mb-4">Contatti</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>{CONTACT.address}</li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {year} {SITE_NAME}. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
