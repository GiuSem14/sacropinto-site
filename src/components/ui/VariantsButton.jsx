/** Pulsante fisso "Varianti": porta alla variante animata del sito (/variante). */
export default function VariantsButton() {
  return (
    <a href="/variante" aria-label="Guarda le varianti del sito" style={{ position: "fixed", left: 16, bottom: 16, zIndex: 80, display: "inline-flex", alignItems: "center", gap: 8, minHeight: 48, padding: "0 18px", borderRadius: 999, background: "#16181d", color: "#eceef3", font: "600 14px/1 system-ui, -apple-system, sans-serif", boxShadow: "0 10px 30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.14)", textDecoration: "none" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" /></svg>
      Varianti
    </a>
  );
}
