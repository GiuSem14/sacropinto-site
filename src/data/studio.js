/*
  Contenuti "di mestiere" del sito: stili, zone del corpo, percorso, prezzo, cura.
  Sono dati, non codice: per un altro studio si cambiano qui.
  Le voci segnate [da confermare] vanno verificate con lo studio prima del lancio.
*/

// Guida agli stili: ogni stile mostra i lavori del portfolio con lo stesso `style`
export const styleGuide = [
  {
    id: "anime",
    name: "Anime",
    portfolioStyle: "Anime",
    description:
      "Personaggi di anime, manga e cartoni, a colori pieni o in bianco e nero. Lavoriamo sulla posa e sull'espressione perché il personaggio resti riconoscibile anche tra vent'anni.",
  },
  {
    id: "neo-tradizionale",
    name: "Neo-tradizionale",
    portfolioStyle: "Neo-tradizionale",
    description:
      "Linee forti, colori saturi e soggetti classici reinterpretati: geishe, animali, ornamenti. È lo stile che invecchia meglio sulla pelle.",
  },
  {
    id: "fine-line",
    name: "Fine line",
    portfolioStyle: "Fine line",
    description:
      "Linee sottili e pulite, spesso piccoli formati. Ideale per un primo tatuaggio o per zone delicate come polso, costato e caviglia.",
  },
  {
    id: "dotwork",
    name: "Dotwork",
    portfolioStyle: "Dotwork",
    description:
      "Sfumature costruite punto per punto, senza colore. Dà profondità a volti, figure e motivi geometrici.",
  },
]

// Cosa si può richiedere
export const requestTypes = [
  { id: "nuovo", label: "Un tatuaggio nuovo", hint: "Disegno su misura a partire dalla tua idea" },
  { id: "cover-up", label: "Un cover-up", hint: "Coprire o trasformare un tatuaggio che hai già" },
  { id: "flash", label: "Un flash", hint: "Un disegno già pronto dello studio" },
  { id: "piercing", label: "Un piercing", hint: "[da confermare] tipi e gioielli disponibili" },
  { id: "ritocco", label: "Un ritocco", hint: "Su un tatuaggio fatto da noi" },
]

export const bodyZones = [
  "Braccio",
  "Avambraccio",
  "Mano o dita",
  "Spalla",
  "Petto",
  "Costato",
  "Schiena",
  "Gamba",
  "Polpaccio",
  "Caviglia o piede",
  "Collo",
  "Altro",
]

export const sizes = [
  { id: "piccolo", label: "Piccolo", hint: "fino a 5 cm" },
  { id: "medio", label: "Medio", hint: "5–15 cm" },
  { id: "grande", label: "Grande", hint: "oltre 15 cm" },
  { id: "progetto", label: "Progetto lungo", hint: "manica, schiena, più sedute" },
]

// Il percorso dalla prima chiacchierata alla guarigione: è una sequenza reale
export const processSteps = [
  {
    title: "Richiesta",
    text: "Ci racconti l'idea con il modulo o su WhatsApp: zona, misura e qualche foto di riferimento bastano.",
  },
  {
    title: "Consulenza",
    text: "In studio o in chat, gratuita. Valutiamo insieme stile, posizione e misura, e ti diciamo con onestà cosa funziona sulla pelle.",
  },
  {
    title: "Preventivo e caparra",
    text: "Ricevi il prezzo prima di iniziare. Con la caparra blocchi la data: viene scalata dal totale. [da confermare] importo.",
  },
  {
    title: "Bozza",
    text: "Disegniamo il tuo pezzo e lo rivediamo insieme. Si ritocca finché non è tuo.",
  },
  {
    title: "Seduta",
    text: "Ambiente sterile, materiale monouso, pause quando servono. Esci con il tatuaggio protetto e le istruzioni per la cura.",
  },
  {
    title: "Guarigione",
    text: "Ti seguiamo anche dopo: se qualcosa non ti convince durante la guarigione, scrivici. Il primo ritocco è incluso.",
  },
]

// Da cosa dipende il prezzo
export const priceFactors = [
  { title: "Misura", text: "Più superficie significa più ore di lavoro." },
  { title: "Dettaglio", text: "Sfumature, colore pieno e linee fitte richiedono più tempo." },
  { title: "Zona del corpo", text: "Alcune zone sono più lente da lavorare, come costato, mani e collo." },
  { title: "Disegno", text: "Un flash pronto costa meno di un progetto disegnato da zero." },
]

// Cura del tatuaggio, fase per fase. [da confermare] con le indicazioni e i prodotti dello studio.
export const aftercare = [
  {
    when: "Le prime ore",
    title: "Lascia la pellicola",
    points: [
      "Tieni la protezione per il tempo che ti indichiamo a fine seduta.",
      "Toglila con le mani pulite e lava la zona con acqua tiepida e sapone neutro.",
      "Tampona con carta, senza strofinare.",
    ],
  },
  {
    when: "Giorni 1–4",
    title: "Pulisci e idrata",
    points: [
      "Lava due o tre volte al giorno e applica uno strato sottile della crema consigliata.",
      "È normale che la zona sia arrossata, calda e leggermente gonfia.",
      "Indossa vestiti morbidi che non sfreghino sul tatuaggio.",
    ],
  },
  {
    when: "Giorni 5–14",
    title: "Non grattare",
    points: [
      "La pelle si squama e prude: non grattare e non staccare le crosticine.",
      "Continua a idratare, senza esagerare con la crema.",
      "Niente mare, piscina, sauna e sole diretto.",
    ],
  },
  {
    when: "Dopo un mese",
    title: "Proteggi dal sole",
    points: [
      "Il tatuaggio è guarito in superficie: ora la pelle si assesta in profondità.",
      "Usa sempre una crema solare alta sul tatuaggio, è quello che lo mantiene nitido negli anni.",
      "Se vedi zone da ritoccare, scrivici: il primo ritocco è incluso.",
    ],
  },
]

// Segnali per cui scrivere subito allo studio o sentire un medico
export const aftercareWarnings = [
  "Rossore che si allarga dopo il terzo giorno",
  "Gonfiore o calore che aumentano invece di diminuire",
  "Pus, cattivo odore o febbre",
]
