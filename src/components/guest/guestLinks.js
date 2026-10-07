import { CONTACT } from "../../utils/constants"

const number = () => CONTACT.whatsapp.replace(/\D/g, "")

export const guestDates = (guest) =>
  guest.date ? guest.date.split(",").map((d) => d.trim()).filter(Boolean) : []

export const bookDateUrl = (guest, date) =>
  `https://wa.me/${number()}?text=${encodeURIComponent(
    `Ciao! Vorrei prenotare una sessione con ${guest.nome} il ${date}. È ancora disponibile?`
  )}`

export const instagramUrl = (guest) =>
  guest.instagram.startsWith("http") ? guest.instagram : `https://instagram.com/${guest.instagram.replace(/^@/, "")}`

export const applyAsGuestUrl = () =>
  `https://wa.me/${number()}?text=${encodeURIComponent("Ciao! Sono un tatuatore e vorrei venire da voi come guest.")}`
