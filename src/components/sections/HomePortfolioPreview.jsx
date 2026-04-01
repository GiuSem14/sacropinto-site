import { Link } from "react-router-dom"
import SectionTitle from "../ui/SectionTitle"
import { portfolioData } from "../../data/portfolio"
import Container from "../layout/Container"

export default function HomePortfolioPreview() {
  return (
    <section className="py-24 bg-black">
      <Container>
        <SectionTitle
          title="Il nostro lavoro"
          subtitle="Ogni tatuaggio nasce da un'idea. Esplora alcuni dei nostri lavori recenti."
          light={true}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {portfolioData.slice(0, 6).map((item) => (
            <div key={item.id} className="aspect-square bg-gray-900 relative overflow-hidden group">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                  <span className="text-xs mt-2 uppercase tracking-wide">{item.style}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm uppercase tracking-widest">{item.style}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/portfolio"
            className="inline-block border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-colors duration-200 px-8 py-3 text-sm uppercase tracking-widest"
          >
            Vedi tutto il portfolio
          </Link>
        </div>
      </Container>
    </section>
  )
}