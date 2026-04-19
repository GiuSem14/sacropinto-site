# Client Configuration Playbook

**Purpose**: this document is the operational playbook for adapting the `sacropinto-site` template to a new tattoo studio client. Follow it step-by-step to go from a fresh clone to a deployed, client-ready website.

**Target audience**: Giuseppe Seminato (developer, GitHub: GiuSem14) and any future collaborators of the agency.

---

## Quick Checklist

### Phase 0 — Preparation
- [ ] Collect all content and credentials from client (see Pre-requisites)
- [ ] Create a new private GitHub repo for the client project
- [ ] Clone the `sacropinto-site` template into a new folder

### Phase 1 — Setup
- [ ] Rename project in `package.json` (field `name`)
- [ ] Run `npm install`
- [ ] Verify with `npm run dev` that the template runs correctly
- [ ] Update `README.md` with new client info

### Phase 2 — Content
- [ ] Update `src/utils/constants.js` (SITE_NAME, SITE_DESCRIPTION, SITE_URL, CONTACT, HOURS, ANALYTICS)
- [ ] Replace placeholder data in `src/data/artists.js` (import real photos)
- [ ] Replace placeholder data in `src/data/portfolio.js` (images + styles + titles + alt text)
- [ ] Replace placeholder data in `src/data/services.js`
- [ ] Review and adapt `src/data/faq.js`

### Phase 3 — Assets
- [ ] Replace favicon letter in `public/favicon.svg`
- [ ] Upload portfolio images to `src/assets/`
- [ ] Upload artist photos to `src/assets/`
- [ ] Replace Hero background (`src/assets/Sfondo.JPG`)
- [ ] Generate new OG image (`public/og-image.jpg`)
- [ ] Optimize all images

### Phase 4 — Brand Identity
- [ ] Extract color palette from client brand reference
- [ ] Update `@theme` overrides in `src/index.css`
- [ ] Update body background-color and color in `src/index.css`
- [ ] Review font pairing — update in `index.html` + `src/index.css` if needed
- [ ] Update static OG tags in `index.html`

### Phase 5 — Integrations
- [ ] Create Formspree form → update endpoint in `Contact.jsx`
- [ ] Test contact form end-to-end
- [ ] Create GA4 property → replace `G-PLACEHOLDER` in `constants.js`
- [ ] Update Google Maps embed URL in `constants.js`
- [ ] Create Google My Business listing
- [ ] Set up Google Form feedback (optional)

### Phase 6 — Pre-deploy Testing
- [ ] All 9 routes load (8 pages + 404)
- [ ] Responsive layout (375px, 768px, 1024px, 1920px)
- [ ] Contact form, WhatsApp button, cookie banner, lightbox, CTA scroll all work
- [ ] `npm run build` — zero errors
- [ ] Lighthouse on Vercel: Performance >85, Accessibility >90, SEO >90

### Phase 7 — Deploy
- [ ] Connect GitHub repo to Vercel
- [ ] Configure custom domain + DNS
- [ ] Verify HTTPS + OG image reachable on real domain

### Phase 8 — Measurement Setup
- [ ] Collect baseline data from client
- [ ] Give client Google Form feedback link
- [ ] Verify GA4 realtime data flow
- [ ] Schedule monthly report cadence

### Phase 9 — Handover
- [ ] Send client live URL + credentials
- [ ] Send invoice
- [ ] Archive project (`git tag v1.0-launch`)

---

## Pre-requisites

### Mandatory
- Studio name and tagline
- Physical address (Contact page, Google Maps, SEO)
- Phone / WhatsApp number (FloatingWhatsApp + Navbar + Contact)
- Email address (Formspree destination)
- Instagram handle / URL
- Business hours (all 7 days)
- List of artists: name, role, bio, styles, experience, Instagram, portrait photo
- List of services (confirm if piercing is offered)
- Portfolio: 10-15+ high-quality images with style category and title
- FAQ answers adapted to studio policies
- Legal info: VAT number, legal entity name

### Recommended
- Logo (SVG or high-res PNG)
- Brand color palette or brand reference image
- Typography preferences
- Google Maps link
- Other social accounts (TikTok, Facebook)
- Studio interior/exterior photos for Hero texture
- Google account (for GA4 + Google My Business)

---

## Phase 2 — Content (detailed)

### 2.1 constants.js

```js
export const SITE_NAME = "Studio Name"
export const SITE_DESCRIPTION = "Short description for meta tags"
export const SITE_URL = "https://studio-domain.it"

export const CONTACT = {
  address: "Full address, City, Province, Region",
  phone: "+39 XXX XXX XXXX",
  whatsapp: "+39 XXX XXX XXXX",
  email: "info@studio-domain.it",
  instagram: "https://www.instagram.com/studio-handle",
}

export const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=..."

export const HOURS = [
  { day: "Lunedì", hours: "Chiuso" },
  { day: "Martedì", hours: "10:00 – 19:00" },
  // ... all 7 days
]

export const ANALYTICS_PROVIDER = "google"
export const ANALYTICS_ID = "G-XXXXXXXXXX"
```

### 2.2 artists.js

```js
import artistPhoto from "../assets/Artista1.jpg"

export const artistsData = [
  {
    id: 1,
    name: "Artist Name",
    role: "Tattoo Artist & Founder",
    bio: "Real biography.",
    styles: ["Blackwork", "Realistico", "Neo-Traditional"],
    experience: "X anni di esperienza",
    instagram: "https://www.instagram.com/...",
    image: artistPhoto,
    alt: "Artist Name, tattoo artist at Studio Name",
  },
]
```

### 2.3 portfolio.js

```js
import tattoo1 from "../assets/Tattoo1.jpg"

export const portfolioData = [
  {
    id: 1,
    title: "Descriptive Title",
    style: "Blackwork",
    image: tattoo1,
    alt: "Descriptive alt text — include studio name and location",
  },
]

export const portfolioStyles = ["Tutti", "Blackwork", "Realistico", ...]
```

---

## Phase 4 — Brand Identity (detailed)

### 4.1 Color palette

Override Tailwind defaults in `@theme` block of `src/index.css`:

```css
@theme {
  --color-black: #XXXXXX;
  --color-white: #XXXXXX;
  --color-gray-50 through --color-gray-950: full scale
}
```

All components use Tailwind classes (`bg-black`, `text-white`, `text-gray-400`) which resolve to these overrides. **Zero component files need editing.**

Sacropinto reference: warm earth tones (`#1a1210` dark → `#f5f0e8` light).

### 4.2 Fonts

Two files to edit:
1. `index.html` — Google Fonts `<link>` tag
2. `src/index.css` — `--font-sans` and `--font-display` in `@theme`

Change time: ~5 minutes.

### 4.3 Static OG tags

Update `index.html` with client-specific title, description, canonical URL, og:image URL. These are what social crawlers see (they don't execute JS).

### 4.4 OG image generation

```bash
convert TattooPhoto.jpg \
  -resize 1200x630^ -gravity center -extent 1200x630 \
  \( +clone -fill black -colorize 55% \) -composite \
  -gravity center -fill white -font "DejaVu-Sans-Bold" \
  -pointsize 80 -annotate +0-20 "STUDIO NAME" \
  -pointsize 30 -annotate +0+50 "TATTOO STUDIO — CITY" \
  public/og-image.jpg
```

---

## Phase 5 — Integrations (detailed)

### 5.1 Formspree
1. Login formspree.io (Google auth)
2. Create form → copy endpoint ID
3. Replace in `Contact.jsx`: `action="https://formspree.io/f/NEW_ID"`
4. Test with real submission

### 5.2 Google Analytics
1. Create GA4 property → get Measurement ID
2. Replace `G-PLACEHOLDER` in `constants.js`
3. System is consent-aware (fires only after cookie acceptance)
4. Test via GA4 Realtime report

### 5.3 Google Maps
1. Google Maps → find studio → Share → Embed → copy `src` URL
2. Update `GOOGLE_MAPS_EMBED_URL` in `constants.js`
3. Contact page renders automatically with grayscale hover effect

### 5.4 Google My Business
1. business.google.com → Add business
2. Fill: name, category "Tattoo shop", address, phone, hours, website
3. Verify → add photos and description
4. High-value free service — offer as bonus to clients

### 5.5 Measurement setup
1. Collect baseline from client (monthly clients, traffic sources)
2. Create Google Form (3 sections: discovery channel, booking method, rating)
3. Connect to Google Sheet
4. Give client WhatsApp template for post-session feedback
5. Monthly: compile GA4 + Formspree + Google Form data

---

## Estimated Timeline

| Phase | Time |
|-------|------|
| Phase 1 — Setup | 30 min |
| Phase 2 — Content | 2-3 hours |
| Phase 3 — Assets | 1-2 hours |
| Phase 4 — Brand Identity | 1 hour |
| Phase 5 — Integrations | 1-2 hours |
| Phase 6 — Testing | 1 hour |
| Phase 7 — Deploy | 30 min |
| Phase 8-9 — Measurement + Handover | 1 hour |
| **Total** | **7-10 hours** |

With Claude Code, Phase 2-4 can be done in ~3 hours. Spread over 2 working days for client review.

---

## Lessons Learned

### Project #0 — Sacropinto (April 2026)
- lucide-react v1.0 removed brand icons — use react-icons/fa
- Universal CSS reset breaks Tailwind v4 centering — never add one
- Google Translate auto-translates nav labels — test in incognito
- OpenCode Big Pickle unreliable — use Claude Code CLI
- Lighthouse localhost scores artificially low — test on Vercel production
- SPA + social crawlers: static OG fallback tags in index.html are essential
- Fixed navbar covers anchor targets — use scroll-mt-24 + setTimeout
- Brand palette: override @theme defaults, zero component changes needed
- Formspree free: 50 submissions/month, sufficient for small studios
- Vercel free: auto-deploy, HTTPS, CDN — zero hosting cost
- Performance: 85/96/100/100 on Vercel (LCP 4.1s, improvable with WebP)

### Project #1 — [Next client]
- [ ] To be filled
