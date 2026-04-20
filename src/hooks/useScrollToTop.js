import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function useScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1))
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 128
          window.scrollTo({ top, behavior: "smooth" })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])
}
