import { useId, useState } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { faqData } from "../../data/faq"

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="border-b border-gray-800">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-6 py-6 text-left text-lg text-white hover:text-verde transition-colors"
        >
          {question}
          <Plus
            size={20}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-500 ease-[var(--ease-out-soft)] ${open ? "rotate-45 text-verde" : ""}`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-soft)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-gray-300 leading-relaxed max-w-2xl">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQPreview() {
  return (
    <section id="domande" className="py-24 border-t border-gray-800">
      <SectionTitle title="Prima di prenotare" />
      <Reveal className="max-w-3xl border-t border-gray-800">
        {faqData.slice(0, 5).map((item) => (
          <FaqItem key={item.id} question={item.question} answer={item.answer} />
        ))}
      </Reveal>
      <Reveal className="mt-10">
        <Link to="/faq" className="inline-flex text-white font-medium border-b border-verde pb-1 hover:text-verde transition-colors">
          Tutte le domande
        </Link>
      </Reveal>
    </section>
  )
}
