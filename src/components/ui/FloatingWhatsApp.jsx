import { FaWhatsapp } from "react-icons/fa"
import { CONTACT } from "../../utils/constants"

const whatsappNumber = CONTACT.whatsapp.replace(/\D/g, "")
const messaggio = encodeURIComponent(
  "Ciao! Vi contatto dal sito sacropinto.it\n\n" +
  "Nome: \n" +
  "Cognome: \n" +
  "Età: \n" +
  "Zona del corpo: \n" +
  "Stile preferito: \n" +
  "Dimensione indicativa: \n" +
  "Descrizione del tatuaggio: \n\n" +
  "Grazie!"
)
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${messaggio}`

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatta su WhatsApp"
      className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl animate-pulse"
      style={{ backgroundColor: "#25D366", zIndex: 80 }}
    >
      <FaWhatsapp size={28} color="#ffffff" />
    </a>
  )
}
