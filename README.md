Sacropinto

Website for a tattoo studio in Sicily, Italy. Built and deployed for a real client.

Stack

React · Vite · Tailwind CSS · React Router · deployed on Vercel

What it does
Portfolio gallery — the studio's work presented with a lightbox viewer, since the portfolio is the sales pitch for a tattoo studio.
Artists and services — content kept in plain data modules under src/data/ (artists.js, services.js, portfolio.js, faq.js), so adding an artist or a service is a data edit, not a layout change.
Pluggable analytics — src/lib/analytics.js sits behind a provider interface with Google Analytics and Plausible implementations, so the tracking tool can be swapped without touching the components that fire events.
Cookie consent — a useCookieConsent hook gates analytics: nothing loads before the visitor agrees.
Direct contact — floating WhatsApp button, the channel this audience uses.
Structure
src/components/ui/          reusable primitives (Button, Card, Badge, SectionTitle)
src/components/sections/    page sections (Hero, Services, Artists, Portfolio, FAQ, CTA)
src/components/layout/      Navbar, Footer, Container
src/components/cookie/      banner and preferences
src/hooks/                  useCookieConsent, useFadeIn, useScrollToTop
src/data/                   content as data
src/lib/                    analytics abstraction and providers
Running locally
bash
npm install
npm run dev
