import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function useScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 160
          window.scrollTo({ top, behavior: "smooth" })
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 100)
        }
      }
      setTimeout(() => tryScroll(), 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])
}
