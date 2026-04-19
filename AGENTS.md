# Sacropinto Site — Agent Guide

## Project Overview

Sacropinto is a website for a tattoo studio located in Piazza Armerina, Sicily, Italy. The site showcases the studio's artists, services, portfolio, FAQ, and contact information. It also includes legal pages (Privacy Policy, Cookie Policy).

This project also serves as a **reusable template** for future tattoo studio websites that Giuseppe Seminato (developer, GitHub: GiuSem14) plans to build for other clients across Italy as part of a freelance web agency focused on the tattoo studio niche.

## Template Strategy

This codebase is designed as a **white-label template** that can be quickly adapted for new tattoo studio clients. The core strategy is:

- **Content is data, not code**: everything client-specific (studio name, contact info, artists, services, portfolio items, FAQ) lives in `src/utils/constants.js` and `src/data/*.js`. Components are generic and read from these files.
- **Visual identity is configurable**: colors are defined as Tailwind `@theme` overrides in `src/index.css`. Fonts are loaded via Google Fonts in `index.html`. Swapping the entire visual identity requires editing only 2 files.
- **Legal/technical requirements are pre-built**: cookie consent (GDPR), SEO meta system, sitemap, robots.txt, analytics integration, and accessibility are implemented once and reused for every client.
- **Component reusability first**: when adding new features, prefer generic reusable components over client-specific one-offs.

When making changes, **ask yourself**: "Would this change still make sense if we were building this site for a different tattoo studio?" If not, it probably shouldn't be hardcoded.

## Tech Stack

- **Framework**: React 18+ with functional components and hooks
- **Build tool**: Vite
- **Styling**: Tailwind CSS **v4** (via `@tailwindcss/vite` plugin) — CSS-first config, no `tailwind.config.js`
- **Routing**: React Router (v6+)
- **SEO**: react-helmet-async with `buildMeta()` helper in `src/utils/seo.js`
- **Icons**:
  - `lucide-react` for generic UI icons (Menu, X, arrows, etc.)
  - `react-icons` for brand icons (Instagram, WhatsApp, etc.) — see Icon Policy below
- **Lightbox**: `yet-another-react-lightbox` for fullscreen portfolio image viewing
- **Deployment**: Vercel (auto-deploy on push, URL: sacropinto-site.vercel.app)
- **Form handling**: Formspree (endpoint `xbdqgrjr`, sends to developer Gmail)
- **Analytics**: Modular system with GA4 provider (placeholder `G-PLACEHOLDER`, consent-aware)
- **Package manager**: npm
- **Language**: JavaScript (NOT TypeScript)
- **Linting**: ESLint (config in `eslint.config.js`)

## Icon Policy

This project uses **two icon libraries** for specific reasons. Follow this policy strictly:

### Use `lucide-react` for generic UI icons
Examples: `Menu`, `X`, `ArrowRight`, `ChevronDown`, `Search`, `User`, `Mail`, `Phone`, `MapPin`, `Calendar`.

```jsx
import { Menu, X } from "lucide-react"
```

### Use `react-icons` for brand icons
Examples: `FaInstagram`, `FaWhatsapp`, `FaFacebook`, `FaTiktok`, `FaYoutube`, `FaLinkedin`.

```jsx
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
```

### Never use inline SVGs for icons
Do NOT paste SVG markup directly into components. Always use one of the two libraries above.

## Project Structure

```
sacropinto-site/
├── public/
│   ├── favicon.svg         # Custom SVG favicon ("S" white on black)
│   ├── og-image.jpg        # Open Graph image (tattoo photo + brand overlay, 1200x630)
│   ├── sitemap.xml         # Sitemap with 8 URLs, priority/changefreq
│   └── robots.txt          # Allow all + sitemap link
├── src/
│   ├── assets/
│   │   ├── Artista1.jpg, Artista2.jpg  # Owner portraits
│   │   ├── Brand.jpg       # Brand reference (color palette source, NOT used in site)
│   │   ├── Sfondo.JPG      # Marble/stone texture (Hero background)
│   │   └── Tattoo1-12.jpg  # Portfolio photos
│   ├── components/
│   │   ├── analytics/      # Analytics.jsx
│   │   ├── cookie/         # CookieBanner.jsx, CookiePreferences.jsx
│   │   ├── layout/         # Container, Navbar, Footer
│   │   ├── sections/       # Hero, HomePortfolioPreview, ArtistsPreview, ServicesPreview, FAQPreview, ContactCTA
│   │   └── ui/             # Badge, Button, Card, SectionTitle, FloatingWhatsApp
│   ├── context/            # CookieConsentContext.jsx
│   ├── data/               # artists.js, faq.js, portfolio.js, services.js
│   ├── hooks/              # useScrollToTop, useCookieConsent
│   ├── lib/                # analytics.js + providers/ (googleAnalytics.js, plausible.js)
│   ├── pages/              # 8 pages + NotFound
│   ├── utils/              # constants.js, cookieConsent.js, seo.js
│   ├── App.jsx             # Router + CookieConsentProvider + FloatingWhatsApp + CookieBanner
│   ├── index.css           # Tailwind entry + @theme overrides (brand colors + fonts)
│   └── main.jsx
├── AGENTS.md               # This file
├── CLIENT_CONFIG.md         # Playbook for adapting template to new clients
├── index.html              # Static OG tags + Google Fonts + favicon
├── package.json
└── vite.config.js
```

## Routes Map

| Route              | Page File          | Purpose                                  |
|--------------------|--------------------|------------------------------------------|
| `/`                | Home.jsx           | Landing page with hero and section previews |
| `/portfolio`       | Portfolio.jsx      | Full portfolio with style filters + lightbox |
| `/artisti`         | Artists.jsx        | Artists showcase                         |
| `/servizi`         | Services.jsx       | Services list                            |
| `/faq`             | Faq.jsx            | Frequently asked questions               |
| `/contatti`        | Contact.jsx        | Contact form, info cards, hours, map     |
| `/privacy-policy`  | PrivacyPolicy.jsx  | Privacy policy (noindex)                 |
| `/cookie-policy`   | CookiePolicy.jsx   | Cookie policy (noindex)                  |
| `*`                | NotFound.jsx       | Custom 404 page (noindex)                |

## Implemented Features

### GDPR Cookie Consent ✅
Three-category system (Necessary/Analytics/Marketing). 5 files across utils, context, hooks, components. localStorage persistence with versioning + 365-day expiry. Footer "Gestisci cookie" link reopens preferences.

### SEO System ✅
`buildMeta()` helper generates 14 OG/Twitter meta tags per page. Static fallback OG tags in `index.html` for social crawlers. Sitemap, robots.txt, custom SVG favicon. OG image: real tattoo photo with brand overlay (1200x630). All OG URLs point to `https://sacropinto.it/` (future domain).

### Analytics ✅
Modular Strategy Pattern. GA4 provider with placeholder ID `G-PLACEHOLDER`. Consent-aware via CookieConsentContext. Plausible provider also available.

### Contact Form ✅
Formspree endpoint `xbdqgrjr`. Vertical layout: 4 info cards → hours → centered form → Google Maps embed with grayscale hover effect.

### Floating WhatsApp ✅
Fixed bottom-right, green `#25D366`, z-[80]. Visible on all pages. Opens WhatsApp with studio number.

### Portfolio Lightbox ✅
`yet-another-react-lightbox`. Click image → fullscreen with navigation. Respects active style filter.

### CTA → Form Scroll ✅
"Prenota una consulenza" buttons link to `/contatti#scrivici`. `useScrollToTop` handles hash scrolling with `setTimeout(100ms)` + `scroll-mt-24` for navbar offset.

### Brand Identity ✅
Warm earth-tone palette from Brand.jpg. Tailwind `@theme` overrides: `--color-black: #1a1210`, `--color-white: #f5f0e8`, full warm gray scale. Fonts: Inter (body) + Space Grotesk (display). Hero: Sfondo.JPG marble texture with overlay. Page headers centered.

### Real Content (partial) ✅
12 tattoo photos, 2 owner portraits, real address + WhatsApp. Portfolio styles/titles/alt text still placeholder.

## Pending Work

### 🔴 Blocked on client
- Full artist bio, experience, styles
- Second artist info (business partner)
- Real opening hours
- Confirm piercing service
- FAQ specifics (deposit, payment, rules)
- Official studio email
- More portfolio photos
- Logo (optional)

### 🔴 Blocked on purchase
- Domain `sacropinto.it` (~10-15€/year)
- Google account for GA4 + Google My Business

### 🟡 Developer tasks
- Classify portfolio styles (all "Blackwork" → need proper categories)
- Portfolio titles and alt text personalization
- Font review with client
- Update CLIENT_CONFIG.md
- Google My Business setup

### 🟢 Post-sale
- GA4 real ID → replace `G-PLACEHOLDER`
- Formspree email → change to client email
- Connect domain to Vercel
- Verify OG image on real domain

## Performance (Vercel production, April 2026)

| Category | Score |
|---|---|
| Performance | 85 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

LCP 4.1s (improvable with WebP conversion of Sfondo.JPG). Localhost scores unreliable — always test on Vercel.

## Coding Conventions

### Components
- Functional components only, hooks for state/effects
- Pages: `default export`. Components: `named exports`
- PascalCase filenames. Destructure props.
- Every page wrapped with `<Helmet>` + `buildMeta()`

### Styling
- Tailwind v4 utility classes only. `@theme` in `index.css` for colors.
- Use Tailwind classes (`bg-black`, `text-white`, `text-gray-400`) — they resolve to brand palette via `@theme` overrides. Do NOT hardcode hex values in components.
- `<Container>` component for centered max-width wrappers.

### Commits
Conventional Commits: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`
Example: `feat(portfolio): add lightbox for fullscreen image viewing`

## What to Avoid

- No TypeScript, CSS-in-JS, state management libs, UI component libs
- No `tailwind.config.js` — Tailwind v4 CSS-first config only
- No breaking route changes without approval
- No inline SVGs for icons — use lucide-react or react-icons
- No universal CSS reset — Tailwind Preflight handles it
- No hardcoded hex colors in components — use Tailwind classes
- No Brand.jpg as site visual — it contains event text, used only as color reference
- No new dependencies without justification

## Historical Notes

### CSS reset breaks centering (April 2026)
Universal `* { margin: 0 }` overrides Tailwind's `mx-auto`. Never re-add.

### Lucide removed brand icons in v1.0 (2025)
Use `react-icons/fa` for Instagram, WhatsApp, etc.

### Google Translate auto-translates nav labels
Test in incognito to see actual content.

### OpenCode Big Pickle unreliable (April 2026)
Failed on multi-file refactoring: wrong colors, truncated code. Use Claude Code (CLI) instead.

### Lighthouse localhost vs production (April 2026)
Dev server scores are artificially low. Always test on Vercel production URL.

### SPA + social crawlers = invisible OG tags
Crawlers don't execute JS. Static fallback OG tags in `index.html` solve this for the home page.

### Fixed navbar covers anchor targets
Add `scroll-mt-24` to target elements + `setTimeout(100ms)` in scroll handler.

## Communication Style

- Respond in Italian if user writes in Italian
- Concise and direct, explain reasoning for non-trivial decisions
- Show before/after when modifying code
- Ask before implementing uncertain design choices
- Present trade-offs clearly
