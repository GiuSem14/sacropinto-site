import { Link } from "react-router-dom"
import { SITE_NAME, CONTACT, NAV_LINKS } from "../../utils/constants"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <p className="text-white font-bold text-xl tracking-widest uppercase mb-3">
              {SITE_NAME}
            </p>
            <p className="text-sm leading-relaxed">
              Studio di tatuaggi a Piazza Armerina.<br />
              Arte sulla pelle, qualità artigianale.
            </p>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-white hover:text-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span className="text-sm">Instagram</span>
            </a>
          </div>

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

          <div>
            <p className="text-white font-semibold uppercase tracking-wide text-sm mb-4">Contatti</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>{CONTACT.address}</li>
              <li>
                <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

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