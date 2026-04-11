# Sacropinto Site — Agent Guide

## Project Overview

Sacropinto is a website for a tattoo studio located in Sicily, Italy. The site showcases the studio's artists, services, portfolio, FAQ, and contact information. It also includes legal pages (Privacy Policy, Cookie Policy).

This project also serves as a **reusable template** for future tattoo studio websites that Giuseppe Seminato (developer, GitHub: GiuSem14) plans to build for other clients across Italy as part of a freelance web agency focused on the tattoo studio niche.

## Tech Stack

- **Framework**: React 18+ with functional components and hooks
- **Build tool**: Vite
- **Styling**: Tailwind CSS **v4** (via `@tailwindcss/vite` plugin) — no `tailwind.config.js` file (v4 uses CSS-first config)
- **Routing**: React Router (v6+)
- **SEO**: react-helmet-async for managing document head
- **Icons**: lucide-react (preferred over inline SVGs)
- **Deployment**: Vercel
- **Package manager**: npm
- **Language**: JavaScript (NOT TypeScript)
- **Linting**: ESLint (config in `eslint.config.js`)

## Project Structure

```
sacropinto-site/
├── public/                 # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── assets/             # Project images and media imported by components
│   ├── components/
│   │   ├── layout/         # App-wide layout components
│   │   │   ├── Container.jsx     # Centered max-width wrapper (USE THIS instead of inline max-w-* mx-auto)
│   │   │   ├── Footer.jsx        # Site footer with social links
│   │   │   └── Navbar.jsx        # Top navigation bar
│   │   ├── sections/       # Page sections used inside pages
│   │   │   ├── ArtistsPreview.jsx
│   │   │   ├── ContactCTA.jsx
│   │   │   ├── FAQPreview.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HomePortfolioPreview.jsx
│   │   │   └── ServicesPreview.jsx
│   │   └── ui/             # Reusable UI primitives
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── SectionTitle.jsx
│   ├── data/               # Static data (currently placeholder, will be replaced with real client data)
│   │   ├── artists.js
│   │   ├── faq.js
│   │   ├── portfolio.js
│   │   └── services.js
│   ├── hooks/              # Custom React hooks
│   │   └── useScrollToTop.js
│   ├── pages/              # Route pages (one file per route)
│   │   ├── Artists.jsx
│   │   ├── Contact.jsx
│   │   ├── CookiePolicy.jsx
│   │   ├── Faq.jsx
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   └── Services.jsx
│   ├── utils/              # Utility functions and constants
│   │   ├── constants.js    # Project-wide constants (URLs, contact info, etc.)
│   │   └── seo.js          # SEO helper functions
│   ├── App.css             # Legacy CSS (Vite default, mostly unused — Tailwind handles styling)
│   ├── App.jsx             # Root component with router setup
│   ├── index.css           # Global Tailwind imports (@import "tailwindcss")
│   └── main.jsx            # Entry point (React root mounting)
├── .gitignore
├── AGENTS.md               # This file
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js          # Vite configuration with Tailwind v4 plugin
```

## Routes Map

| Route              | Page File          | Purpose                                  |
|--------------------|--------------------|------------------------------------------|
| `/`                | Home.jsx           | Landing page with hero and section previews |
| `/portfolio`       | Portfolio.jsx      | Full portfolio with style filters        |
| `/artisti`         | Artists.jsx        | Artists showcase                         |
| `/servizi`         | Services.jsx       | Services list                            |
| `/faq`             | Faq.jsx            | Frequently asked questions               |
| `/contatti`        | Contact.jsx        | Contact form and studio info             |
| `/privacy-policy`  | PrivacyPolicy.jsx  | Privacy policy (legal)                   |
| `/cookie-policy`   | CookiePolicy.jsx   | Cookie policy (legal)                    |

**Note**: Routes mix Italian (`/artisti`, `/servizi`, `/contatti`) and English (`/portfolio`, `/faq`). This is intentional — `portfolio` and `faq` are commonly used as-is in Italian. Do not change route names without explicit approval.

## Coding Conventions

### React components
- Use **functional components** only, no class components
- Use **hooks** (useState, useEffect, useContext, etc.) for state and side effects
- **Pages**: use `default export`
- **Components** (layout, sections, ui): prefer `named exports`
- Component files use **PascalCase**: `Navbar.jsx`, `PortfolioCard.jsx`
- Props should be destructured in the function signature: `function Card({ title, image }) { ... }`
- Each page should wrap its content with `<Helmet>` from `react-helmet-async` for SEO

### Page structure pattern
Pages typically follow this pattern:
```jsx
import { Helmet } from 'react-helmet-async';
import Container from '../components/layout/Container';

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
      {/* optional CTA section at bottom */}
    </>
  );
}
```

### Styling
- **Tailwind v4 utility classes only** — do NOT add custom CSS unless absolutely necessary
- Tailwind v4 uses CSS-first config: directives are inside `src/index.css`, not in a separate `tailwind.config.js`
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) for responsive design
- **Color palette**: dark theme with gold accents — do NOT introduce new colors without asking
- Typography: use Tailwind's font size scale, no arbitrary values unless justified
- **Always prefer `<Container>` component** for centered max-width wrappers — do NOT use inline `max-w-* mx-auto` patterns

### Icons
- **ALWAYS use `lucide-react` icons** — never write inline SVG icons
- Example: `import { Instagram } from 'lucide-react'` instead of pasting SVG markup
- If a needed icon is not in lucide-react, ask before adding another icon library

### File organization
- One component per file
- Keep components small and focused (single responsibility)
- Extract reusable logic into custom hooks in `src/hooks/`
- Keep static data (e.g., artists list) in `src/data/` as plain JS objects
- Constants and helper functions go in `src/utils/`

### Accessibility
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, `<button>`, etc.)
- All images must have meaningful `alt` text
- Interactive elements must be keyboard-accessible
- Color contrast should meet WCAG AA standards

## Known Issues / Work in Progress

### 🐛 Portfolio left-alignment on large monitors
The portfolio section has a left-alignment problem on wide screens (likely 1920px+ desktops). The portfolio grid does not align correctly with the rest of the page content on large viewports. **This is a high-priority bug to fix.** When investigating:
- Check `src/pages/Portfolio.jsx` and any related section components
- Verify if `Container.jsx` is being used consistently
- Check Tailwind's `2xl:` breakpoint handling
- The issue may be related to how `max-width` interacts with the portfolio grid layout

### 📝 Placeholder data
Files in `src/data/` (especially `artists.js` and `portfolio.js`) currently contain placeholder/dummy data (generic names, `image: null`, etc.). These need to be replaced with real client content before launch. Do NOT delete the placeholders during refactoring — they show the expected data shape.

### 🎨 No custom fonts
The site currently uses `system-ui` only. For a tattoo studio (visually-driven brand), introducing a custom font (e.g., from Google Fonts) would significantly improve the visual identity. This is a planned improvement.

### 🔧 Inline SVG in Footer
`Footer.jsx` contains an inline SVG for the Instagram icon instead of using `lucide-react`'s `<Instagram />` component. This should be refactored for consistency.

### 🔧 FAQ data possibly disconnected
`src/data/faq.js` exists but may not be properly imported by `Faq.jsx` or `FAQPreview.jsx`. Verify and connect if needed.

### 🔧 Container usage inconsistent
Some pages use inline `max-w-6xl mx-auto` instead of the `<Container>` component. Refactor for consistency.

## What to Avoid

- Do NOT add **TypeScript** (project is pure JS)
- Do NOT add **CSS-in-JS libraries** (styled-components, emotion, etc.)
- Do NOT add **state management libraries** (Redux, Zustand, Jotai, etc.) — the app is small enough to use React's built-in state and Context if needed
- Do NOT add **UI component libraries** (Material UI, Ant Design, Chakra, shadcn, etc.) — we want full control via Tailwind primitives in `src/components/ui/`
- Do NOT add a `tailwind.config.js` file — we use Tailwind v4 with CSS-first configuration
- Do NOT introduce **breaking changes to the routing structure** without explicit approval
- Do NOT replace **placeholder data** in `src/data/` without first confirming with the user
- Do NOT add **new dependencies** to `package.json` without justification — keep the project lean
- Do NOT use **inline SVGs** for icons — always use lucide-react

## Working with the Codebase

### When making changes
1. **Read related files first** to understand the context before modifying
2. **Match the existing style** — look at neighboring components for patterns
3. **For non-trivial changes**, propose the approach before implementing (especially in plan mode)
4. **Show before/after** when modifying existing code so the user can verify
5. **Run `npm run dev`** mentally — does the change make sense at runtime?
6. **Don't reformat unrelated code** — keep diffs minimal and focused

### Commit messages
Use Conventional Commits format when suggesting commit messages:
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
- When proposing changes, **show the "before" and "after"** if modifying existing code
- If uncertain about design choices, **ASK before implementing** — especially for visual/UX decisions
- Use **technical Italian terms** where appropriate (don't over-translate technical jargon)
- When listing options, present **trade-offs** clearly so the user can choose
- Avoid unnecessary preamble — get to the point quickly
