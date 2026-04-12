import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { CookieConsentProvider } from "./context/CookieConsentContext"
import CookieBanner from "./components/cookie/CookieBanner"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import useScrollToTop from "./hooks/useScrollToTop"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Artists from "./pages/Artists"
import Services from "./pages/Services"
import Faq from "./pages/Faq"
import Contact from "./pages/Contact"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import CookiePolicy from "./pages/CookiePolicy"

function ScrollToTop() {
  useScrollToTop()
  return null
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <CookieConsentProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-black text-white">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/artisti" element={<Artists />} />
                <Route path="/servizi" element={<Services />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contatti" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <CookieBanner />
        </CookieConsentProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
