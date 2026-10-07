import { BOOKING_PATH, CONTACT } from "../../utils/constants"

export const bookingUrl = (artist) => `${BOOKING_PATH}?artista=${artist.id}`

export const whatsappUrl = (artist) =>
  `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Ciao! Vorrei fare un tatuaggio con ${artist.name}. Quando avete disponibilità per una consulenza?`
  )}`

export const firstName = (artist) => artist.name.split(" ")[0]
