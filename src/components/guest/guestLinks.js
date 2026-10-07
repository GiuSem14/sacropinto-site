import { CONTACT } from "../../utils/constants"

const number = () => CONTACT.whatsapp.replace(/\D/g, "")

export const instagramUrl = (guest) =>
  guest.instagram.startsWith("http") ? guest.instagram : `https://instagram.com/${guest.instagram.replace(/^@/, "")}`

export const applyAsGuestUrl = () =>
  `https://wa.me/${number()}?text=${encodeURIComponent("Ciao! Sono un tatuatore e vorrei venire da voi come guest.")}`
