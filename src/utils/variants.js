/*
  Varianti di design da confrontare in preview.
  Si sceglie con il parametro nell'URL (es. /?hero=b) oppure dal pannello
  che compare aprendo il sito con ?varianti. La prima opzione è quella predefinita.
  Quando il cliente sceglie, basta cambiare l'ordine (o eliminare le altre).
*/
export const VARIANTS = {
  hero: {
    label: "Hero",
    route: "/",
    options: [
      { id: "a", label: "Nastro di lavori" },
      { id: "b", label: "Split con slideshow" },
      { id: "c", label: "Logo inciso" },
      { id: "d", label: "Parete di lavori" },
    ],
  },
  lavori: {
    label: "Lavori",
    route: "/portfolio",
    options: [
      { id: "a", label: "Griglia" },
      { id: "b", label: "Masonry con didascalie" },
      { id: "c", label: "Sala orizzontale" },
    ],
  },
  artisti: {
    label: "Artisti",
    route: "/artisti",
    options: [
      { id: "a", label: "Schede" },
      { id: "b", label: "Ritratto editoriale" },
      { id: "c", label: "Il duo" },
    ],
  },
  guest: {
    label: "Guest",
    route: "/guest",
    options: [
      { id: "a", label: "Schede" },
      { id: "b", label: "Calendario date" },
      { id: "c", label: "Locandine" },
    ],
  },
}
