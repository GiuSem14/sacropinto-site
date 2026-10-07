import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Check } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { buildMeta } from "../utils/seo"
import { CONTACT } from "../utils/constants"
import { requestTypes, styleGuide, bodyZones, sizes } from "../data/studio"
import { artistsData } from "../data/artists"

const UNSURE_STYLE = "Non lo so ancora, consigliatemi"
const ANY_ARTIST = "Indifferente"

const EMPTY = {
  tipo: "",
  artista: "",
  stile: "",
  zona: "",
  misura: "",
  colore: "",
  idea: "",
  nome: "",
  disponibilita: "",
  eta: false,
  privacy: false,
}

/* ---------- piccoli mattoni del modulo ---------- */

function ChoiceCard({ name, value, checked, onChange, label, hint }) {
  return (
    <label
      className={`relative flex flex-col gap-1 p-5 border cursor-pointer transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-verde ${
        checked ? "border-verde bg-verde/10" : "border-gray-700 hover:border-gray-500"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-lg text-white pr-8">{label}</span>
      {hint && <span className="text-sm text-gray-400">{hint}</span>}
      <span
        aria-hidden="true"
        className={`absolute top-5 right-5 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
          checked ? "bg-verde border-verde scale-100" : "border-gray-600 scale-90"
        }`}
      >
        {checked && <Check size={14} className="text-black" />}
      </span>
    </label>
  )
}

function Chip({ name, value, checked, onChange }) {
  return (
    <label
      className={`inline-flex items-center min-h-11 px-4 border cursor-pointer transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-verde ${
        checked ? "border-verde bg-verde text-black" : "border-gray-700 text-gray-200 hover:border-gray-500"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {value}
    </label>
  )
}

function Field({ label, optional, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-gray-300">
        {label}
        {optional && <span className="text-gray-500"> (facoltativo)</span>}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  "w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 min-h-12 placeholder:text-gray-500 focus:outline-none focus:border-verde transition-colors"

/* ---------- testo della richiesta, inviato su WhatsApp ---------- */

function buildSummary(data) {
  const tipo = requestTypes.find((t) => t.id === data.tipo)?.label
  const misura = sizes.find((s) => s.id === data.misura)
  const rows = [
    ["Richiesta", tipo],
    ["Artista", data.artista],
    ["Stile", data.stile],
    ["Zona", data.zona],
    ["Misura", misura ? `${misura.label} (${misura.hint})` : ""],
    ["Colore", data.colore],
    ["Idea", data.idea],
    ["Disponibilità", data.disponibilita],
    ["Nome", data.nome],
  ]
  return rows.filter(([, value]) => value)
}

/* ---------- pagina ---------- */

export default function Booking() {
  const meta = buildMeta({
    title: "Richiedi un tatuaggio",
    description:
      "Richiedi il tuo tatuaggio da Sacropinto a Piazza Armerina: scegli stile, zona e misura, raccontaci l'idea e ti ricontattiamo per la consulenza gratuita.",
    path: "/prenota",
  })

  const [params] = useSearchParams()
  const initial = useMemo(() => {
    const style = styleGuide.find((s) => s.id === params.get("stile"))
    const tipo = requestTypes.find((t) => t.id === params.get("tipo"))
    const artist = artistsData.find((a) => String(a.id) === params.get("artista"))
    return { ...EMPTY, stile: style ? style.name : "", tipo: tipo ? tipo.id : "", artista: artist ? artist.name : "" }
  }, [params])

  const [data, setData] = useState(initial)
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)

  const isPiercing = data.tipo === "piercing"
  const steps = isPiercing ? ["tipo", "zona", "idea", "contatti"] : ["tipo", "stile", "zona", "idea", "contatti"]
  const current = steps[step]
  const progress = (step + 1) / steps.length

  const set = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const canContinue = {
    tipo: Boolean(data.tipo),
    stile: Boolean(data.stile),
    zona: Boolean(data.zona) && (isPiercing || Boolean(data.misura)),
    idea: data.idea.trim().length > 0,
    contatti: data.nome.trim() && data.eta && data.privacy,
  }[current]

  const summary = buildSummary(data)
  const whatsappText = encodeURIComponent(
    "Ciao! Vi scrivo dal sito per richiedere un tatuaggio.\n\n" +
      summary.map(([key, value]) => `${key}: ${value}`).join("\n") +
      "\n\nVi allego qui le foto di riferimento."
  )
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${whatsappText}`

  const goNext = () => {
    if (!canContinue) return
    setStep((s) => Math.min(s + 1, steps.length - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // L'unico canale è WhatsApp: si apre la chat dello studio con la richiesta già scritta
  const submit = (event) => {
    event.preventDefault()
    if (!canContinue) return
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    setSent(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:site_name" content={meta.ogSiteName} />
        <meta property="og:locale" content={meta.ogLocale} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
        <meta property="og:image" content={meta.ogImage} />
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <meta name="twitter:image" content={meta.twitterImage} />
      </Helmet>

      <section className="min-h-[calc(100svh-4rem)] bg-black">
        {/* Avanzamento */}
        <div className="h-1 bg-gray-900" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-label="Avanzamento della richiesta">
          <div
            className="h-full bg-verde origin-left transition-transform duration-700 ease-[var(--ease-out-soft)]"
            style={{ transform: `scaleX(${sent ? 1 : progress})` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid lg:grid-cols-[minmax(0,1fr)_340px] gap-14">
          {sent ? (
            <div className="step-in max-w-2xl">
              <div className="w-14 h-14 rounded-full bg-verde text-black flex items-center justify-center mb-8">
                <Check size={28} />
              </div>
              <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-white">Ultimo passo su WhatsApp</h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                Grazie {data.nome}. Si è aperta la chat con lo studio e la tua richiesta è già scritta: premi invio su WhatsApp per mandarla.
              </p>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Nella stessa chat allega le foto di riferimento o del punto da tatuare: ci aiutano a prepararci alla consulenza.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 min-h-12 px-7 bg-white text-black font-semibold hover:bg-verde transition-colors">
                  <FaWhatsapp size={20} /> Riapri WhatsApp
                </a>
                <Link to="/cura" className="inline-flex items-center justify-center min-h-12 px-7 border border-gray-600 text-white hover:border-white transition-colors">
                  Leggi come si cura un tatuaggio
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={current === "contatti" ? submit : (e) => { e.preventDefault(); goNext() }} className="max-w-2xl" noValidate>
              <p className="text-gray-400 mb-4" aria-live="polite">
                Passo {step + 1} di {steps.length}
              </p>

              {/* La chiave fa ripartire l'animazione d'ingresso a ogni passo */}
              <div key={current} className="step-in">
                {current === "tipo" && (
                  <fieldset>
                    <legend className="font-display text-4xl md:text-6xl leading-[1.05] text-white mb-10">Cosa vuoi fare?</legend>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {requestTypes.map((type) => (
                        <ChoiceCard
                          key={type.id}
                          name="tipo"
                          value={type.id}
                          checked={data.tipo === type.id}
                          onChange={set("tipo")}
                          label={type.label}
                          hint={type.hint}
                        />
                      ))}
                    </div>
                  </fieldset>
                )}

                {current === "stile" && (
                  <fieldset>
                    <legend className="font-display text-4xl md:text-6xl leading-[1.05] text-white mb-4">Che stile hai in mente?</legend>
                    <p className="text-gray-400 mb-10">
                      Non sei sicuro? <Link to="/#stili" className="text-white underline decoration-verde underline-offset-4">Guarda la guida agli stili</Link>.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {styleGuide.map((style) => (
                        <ChoiceCard key={style.id} name="stile" value={style.name} checked={data.stile === style.name} onChange={set("stile")} label={style.name} />
                      ))}
                      <ChoiceCard name="stile" value={UNSURE_STYLE} checked={data.stile === UNSURE_STYLE} onChange={set("stile")} label={UNSURE_STYLE} />
                    </div>
                  </fieldset>
                )}

                {current === "zona" && (
                  <div className="flex flex-col gap-12">
                    <fieldset>
                      <legend className="font-display text-4xl md:text-6xl leading-[1.05] text-white mb-10">Dove lo vuoi?</legend>
                      <div className="flex flex-wrap gap-2">
                        {bodyZones.map((zone) => (
                          <Chip key={zone} name="zona" value={zone} checked={data.zona === zone} onChange={set("zona")} />
                        ))}
                      </div>
                    </fieldset>
                    {!isPiercing && (
                      <fieldset>
                        <legend className="font-display text-3xl text-white mb-6">Quanto grande, più o meno?</legend>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {sizes.map((size) => (
                            <ChoiceCard key={size.id} name="misura" value={size.id} checked={data.misura === size.id} onChange={set("misura")} label={size.label} hint={size.hint} />
                          ))}
                        </div>
                      </fieldset>
                    )}
                  </div>
                )}

                {current === "idea" && (
                  <div className="flex flex-col gap-10">
                    <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
                      {isPiercing ? "Che piercing vorresti?" : "Raccontaci l'idea"}
                    </h1>
                    <Field label={isPiercing ? "Descrivilo in poche parole" : "Soggetto, significato, dettagli che contano per te"}>
                      <textarea
                        value={data.idea}
                        onChange={set("idea")}
                        rows={6}
                        required
                        className={`${inputClass} resize-y`}
                        placeholder={isPiercing ? "Es. helix all'orecchio sinistro" : "Es. una geisha con un ventaglio, in stile neo-tradizionale, colori caldi"}
                      />
                    </Field>
                    {!isPiercing && (
                      <fieldset>
                        <legend className="text-gray-300 mb-4">Colore o bianco e nero?</legend>
                        <div className="flex flex-wrap gap-2">
                          {["A colori", "Bianco e nero", "Decidiamo insieme"].map((option) => (
                            <Chip key={option} name="colore" value={option} checked={data.colore === option} onChange={set("colore")} />
                          ))}
                        </div>
                      </fieldset>
                    )}
                    <p className="text-gray-400 border-l-2 border-verde pl-4">
                      Hai foto di riferimento? Le alleghi direttamente nella chat WhatsApp, alla fine.
                    </p>
                  </div>
                )}

                {current === "contatti" && (
                  <div className="flex flex-col gap-6">
                    <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">Quasi fatto</h1>
                    <p className="text-gray-400 mb-4">La richiesta arriva allo studio su WhatsApp, dal tuo numero: ti rispondiamo lì.</p>
                    <Field label="Come ti chiami?">
                      <input type="text" value={data.nome} onChange={set("nome")} autoComplete="given-name" required className={inputClass} />
                    </Field>
                    {artistsData.length > 1 && (
                      <fieldset>
                        <legend className="text-gray-300 mb-3">Con chi vorresti farlo? <span className="text-gray-500">(facoltativo)</span></legend>
                        <div className="flex flex-wrap gap-2">
                          {[...artistsData.map((a) => a.name), ANY_ARTIST].map((name) => (
                            <Chip key={name} name="artista" value={name} checked={data.artista === name} onChange={set("artista")} />
                          ))}
                        </div>
                      </fieldset>
                    )}
                    <Field label="Quando sei disponibile?" optional>
                      <input type="text" value={data.disponibilita} onChange={set("disponibilita")} className={inputClass} placeholder="Es. pomeriggi infrasettimanali, sabato mattina" />
                    </Field>
                    <label className="flex gap-3 items-start text-gray-300 cursor-pointer">
                      <input type="checkbox" checked={data.eta} onChange={set("eta")} required className="mt-1 w-5 h-5 accent-[var(--color-verde)]" />
                      <span>Ho almeno 18 anni, oppure verrò accompagnato da un genitore con il consenso firmato.</span>
                    </label>
                    <label className="flex gap-3 items-start text-gray-300 cursor-pointer">
                      <input type="checkbox" checked={data.privacy} onChange={set("privacy")} required className="mt-1 w-5 h-5 accent-[var(--color-verde)]" />
                      <span>
                        Accetto che i miei dati siano usati per rispondere alla richiesta, come descritto nella{" "}
                        <Link to="/privacy-policy" className="text-white underline underline-offset-4">privacy policy</Link>.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Navigazione tra i passi */}
              <div className="mt-12 flex flex-wrap items-center gap-4">
                {step > 0 && (
                  <button type="button" onClick={goBack} className="min-h-12 px-6 border border-gray-600 text-white hover:border-white transition-colors">
                    Indietro
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!canContinue}
                  className="inline-flex items-center gap-3 min-h-12 px-8 bg-white text-black font-semibold transition-colors hover:bg-verde disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {current === "contatti" ? (<><FaWhatsapp size={20} aria-hidden="true" /> Invia su WhatsApp</>) : "Continua"}
                </button>
              </div>
            </form>
          )}

          {/* Riepilogo che si riempie mentre scegli */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 border border-gray-800 p-6">
              <h2 className="font-display text-2xl text-white mb-5">La tua richiesta</h2>
              {summary.length === 0 ? (
                <p className="text-gray-500">Le tue scelte compariranno qui.</p>
              ) : (
                <dl className="flex flex-col gap-4">
                  {summary.map(([key, value]) => (
                    <div key={key} className="step-in">
                      <dt className="text-sm text-gray-500">{key}</dt>
                      <dd className="text-white break-words">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="mt-6 pt-5 border-t border-gray-800 text-sm text-gray-400">
                La consulenza è gratuita e senza impegno. Il prezzo lo ricevi prima di iniziare.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
