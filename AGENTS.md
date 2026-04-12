# Sacropinto Site — Agent Guide

## Project Overview

Sacropinto is a website for a tattoo studio located in Piazza Armerina, Sicily, Italy. The site showcases the studio's artists, services, portfolio, FAQ, and contact information. It also includes legal pages (Privacy Policy, Cookie Policy).

This project also serves as a **reusable template** for future tattoo studio websites that Giuseppe Seminato (developer, GitHub: GiuSem14) plans to build for other clients across Italy as part of a freelance web agency focused on the tattoo studio niche.

## Template Strategy

This codebase is designed as a **white-label template** that can be quickly adapted for new tattoo studio clients. The core strategy is:

- **Content is data, not code**: everything client-specific (studio name, contact info, artists, services, portfolio items, FAQ) lives in `src/utils/constants.js` and `src/data/*.js`. Components are generic and read from these files.
- **Visual identity is configurable**: colors, fonts, and brand assets should be easy to swap without touching component logic.
- **Legal/technical requirements are pre-built**: features like cookie banners, SEO meta tags, GDPR compliance, and accessibility are implemented once in the template and reused for every client.
- **Component reusability first**: when adding new features, prefer generic reusable components over client-specific one-offs.

When making changes, **ask yourself**: "Would this change still make sense if we were building this site for a different tattoo studio?" If not, it probably shouldn't be hardcoded.

## Tech Stack

- **Framework**: React 18+ with functional components and hooks
- **Build tool**: Vite
- **Styling**: Tailwind CSS **v4** (via `@tailwindcss/vite` plugin) — CSS-first config, no `tailwind.config.js`
- **Routing**: React Router (v6+)
- **SEO**: react-helmet-async
- **Icons**:
  - `lucide-react` for generic UI icons (Menu, X, arrows, etc.)
  - `react-icons` for brand icons (Instagram, WhatsApp, etc.) — see Icon Policy below
- **Deployment**: Vercel
- **Package manager**: npm
- **Language**: JavaScript (NOT TypeScript)
- **Linting**: ESLint (config in `eslint.config.js`)

## Icon Policy

This project uses **two icon libraries** for specific reasons. Follow this policy strictly:

### Use `lucide-react` for generic UI icons
Examples: `Menu`, `X`, `ArrowRight`, `ChevronDown`, `Search`, `User`, `Mail`, `Phone`, `MapPin`, `Calendar`.
These are non-branded, functional icons used for UI elements.

```jsx
import { Menu, X } from "lucide-react"
```

### Use `react-icons` for brand icons
Examples: `FaInstagram`, `FaWhatsapp`, `FaFacebook`, `FaTiktok`, `FaYoutube`, `FaLinkedin`.
These are official brand logos that were **removed from lucide-react in version 1.0** (for trademark/legal reasons). We use Font Awesome via `react-icons/fa` as the standard replacement.

```jsx
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
```

### Never use inline SVGs for icons
Do NOT paste SVG markup directly into components. Always use one of the two libraries above. If a needed icon doesn't exist in either library, ask before proceeding.

## Project Structure

```
sacropinto-site/
├── public/                 # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── assets/             # Project images and media
│   ├── components/
│   │   ├── layout/         # Container, Navbar, Footer
│   │   ├── sections/       # Hero, HomePortfolioPreview, ArtistsPreview, ServicesPreview, FAQPreview, ContactCTA
│   │   └── ui/             # Badge, Button, Card, SectionTitle
│   ├── data/               # Static data (placeholders to be replaced per client)
│   │   ├── artists.js
│   │   ├── faq.js
│   │   ├── portfolio.js
│   │   └── services.js
│   ├── hooks/              # Custom React hooks (useScrollToTop)
│   ├── pages/              # Route pages (Home, Portfolio, Artists, Services, Faq, Contact, PrivacyPolicy, CookiePolicy)
│   ├── utils/              # Constants and helpers (constants.js, seo.js)
│   ├── App.css             # Legacy CSS (mostly unused — Tailwind handles styling)
│   ├── App.jsx             # Root component with router setup
│   ├── index.css           # Tailwind entry point (@import "tailwindcss")
│   └── main.jsx            # React entry point
├── .gitignore
├── AGENTS.md               # This file
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Routes Map

| Route              | Page File          | Purpose                                  |
|--------------------|--------------------|------------------------------------------|
| `/`                | Home.jsx           | Landing page with hero and section previews |
| `/portfolio`       | Portfolio.jsx      | Full portfolio with style filters        |
| `/artisti`         | Artists.jsx        | Artists showcase                         |
| `/servizi`         | Services.jsx       | Services list                            |
| `/faq`             | Faq.jsx            | Frequently asked questions               |
| `/contatti`        | Contact.jsx        | Contact form, hours, and studio info     |
| `/privacy-policy`  | PrivacyPolicy.jsx  | Privacy policy (legal)                   |
| `/cookie-policy`   | CookiePolicy.jsx   | Cookie policy (legal)                    |

Routes intentionally mix Italian and English (`/portfolio` and `/faq` are commonly used as-is in Italian). Do not change route names without explicit approval.

## Coding Conventions

### React components
- Functional components only, no class components
- Hooks for state and side effects
- **Pages**: use `default export`
- **Components**: prefer `named exports`
- Component files use **PascalCase** (`Navbar.jsx`, `PortfolioCard.jsx`)
- Destructure props in the function signature
- Wrap each page's content with `<Helmet>` from `react-helmet-async` for SEO

### Page structure pattern
```jsx
import { Helmet } from 'react-helmet-async'
import Container from '../components/layout/Container'

export default function PageName() {
  return (
    <>
      <Helmet>
        <title>Page Title - Sacropinto</title>
        <meta name="description" content="..." />
      </Helmet>
      <Container>
        {/* page content */}
      </Container>
    </>
  )
}
```

### Styling
- **Tailwind v4 utility classes only** — no custom CSS unless absolutely necessary
- Tailwind v4 uses CSS-first config: directives live inside `src/index.css`
- Use responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- **Color palette**: dark theme with gold accents — ask before introducing new colors
- **Always prefer `<Container>` component** for centered max-width wrappers

### File organization
- One component per file
- Keep components small and focused
- Extract reusable logic into custom hooks in `src/hooks/`
- Static data goes in `src/data/` as plain JS objects
- Constants and helper functions in `src/utils/`

### Accessibility
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<button>`)
- All images must have meaningful `alt` text
- Interactive elements must be keyboard-accessible
- Color contrast should meet WCAG AA standards
- Social/external links should have descriptive `aria-label` attributes

## Known Issues / Work in Progress

### 📝 Placeholder data (all client-specific)
Files in `src/data/` (`artists.js`, `portfolio.js`, `services.js`, `faq.js`) contain placeholder data that must be replaced with real client content before launch. Keep the data shape intact when replacing.

`src/utils/constants.js` also contains placeholders for `CONTACT.whatsapp`, `CONTACT.phone`, and `CONTACT.instagram` that must be updated per client.

### 🔧 Form endpoint placeholder
`src/pages/Contact.jsx` uses a Formspree form with a placeholder endpoint (`formspree.io/f/TUOID`). This must be replaced with a real Formspree endpoint for each client.

### 🎨 No custom fonts
The site currently uses `system-ui` only. Adding a distinctive Google Font would improve brand identity. Planned improvement — not blocking.

### 🔒 Missing GDPR cookie banner
Required by EU law. Not yet implemented. Planned for Phase 2.

### 🔍 Missing SEO essentials
`sitemap.xml`, `robots.txt`, custom favicon, and Open Graph meta tags are not yet configured. Planned for Phase 2.

## What to Avoid

- Do NOT add **TypeScript** (project is pure JS)
- Do NOT add **CSS-in-JS libraries** (styled-components, emotion)
- Do NOT add **state management libraries** (Redux, Zustand) — React's built-in state is sufficient
- Do NOT add **UI component libraries** (Material UI, Ant Design, Chakra, shadcn)
- Do NOT add a `tailwind.config.js` file — we use Tailwind v4 CSS-first config
- Do NOT introduce **breaking changes to routing** without approval
- Do NOT replace **placeholder data** without confirming with the user
- Do NOT add **new dependencies** without justification
- Do NOT use **inline SVGs** for icons — use `lucide-react` or `react-icons` per the Icon Policy
- Do NOT add a **universal CSS reset** (`* { margin: 0; padding: 0; }`) — Tailwind v4 Preflight handles this, and adding one breaks `mx-auto` centering (see Historical Notes)

## Historical Notes

These are decisions and lessons learned from past sessions. Keep them in mind to avoid regressions.

### CSS reset universal selector incident (April 2026)
A global `* { box-sizing: border-box; margin: 0; padding: 0; }` rule in `src/index.css` was silently breaking `mx-auto` centering across the entire site because it overrode Tailwind v4's utility classes. The fix was to remove the universal selector entirely — Tailwind v4 Preflight already handles CSS reset correctly. **Never re-add a universal selector reset to this project.**

### Lucide removed brand icons in v1.0 (2025)
Lucide v1.0 removed brand icons (Instagram, Facebook, Twitter, WhatsApp, etc.) for trademark/legal reasons. Any icon import like `Instagram` or `MessageCircle` from `lucide-react` will fail. Use `react-icons/fa` instead (`FaInstagram`, `FaWhatsapp`). See Icon Policy above.

### Google Translate auto-translates nav labels
When testing in a regular Chrome browser, Google Translate may automatically translate Italian nav labels (e.g., "Home" → "Casa", "Servizi" → "Salvezza"). This is a browser-side translation, NOT a bug in the code. Always test in incognito mode to see the actual content.

## Working with the Codebase

### When making changes
1. **Read related files first** to understand context before modifying
2. **Match the existing style** — look at neighboring components for patterns
3. **Propose the approach before implementing** for non-trivial changes
4. **Show before/after** when modifying existing code
5. **Don't reformat unrelated code** — keep diffs minimal and focused
6. **Test in incognito mode** to avoid browser extension interference

### Commit messages
Use Conventional Commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code restructuring without behavior change
- `style:` for formatting/CSS-only changes
- `docs:` for documentation
- `chore:` for tooling/dependencies

Example: `fix: portfolio grid alignment on 2xl screens`

## Communication Style

- **Respond in Italian** if the user writes in Italian (the user is Italian)
- Be **concise and direct**, but explain reasoning for non-trivial decisions
- When proposing changes, **show the "before" and "after"**
- If uncertain about design choices, **ASK before implementing**
- Use **technical Italian terms** where appropriate
- When listing options, present **trade-offs** clearly
- Avoid unnecessary preamble — get to the point
