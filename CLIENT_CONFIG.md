# Client Configuration Playbook

**Purpose**: this document is the operational playbook for adapting the `sacropinto-site` template to a new tattoo studio client. Follow it step-by-step to go from a fresh clone to a deployed, client-ready website.

**Target audience**: Giuseppe Seminato (developer, GitHub: GiuSem14) and any future collaborators of the agency.

---

## Quick Checklist

Use this checklist when you already know the process and just need a reminder of the steps. Detailed instructions follow below.

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
- [ ] Update `src/utils/constants.js` (SITE_NAME, SITE_DESCRIPTION, SITE_URL, CONTACT, HOURS)
- [ ] Replace placeholder data in `src/data/artists.js`
- [ ] Replace placeholder data in `src/data/portfolio.js`
- [ ] Replace placeholder data in `src/data/services.js`
- [ ] Review and adapt `src/data/faq.js`
- [ ] Update meta descriptions in each page (`src/pages/*.jsx`)

### Phase 3 — Assets
- [ ] Replace favicon in `public/` (all formats)
- [ ] Add client logo (if any) to `src/assets/`
- [ ] Upload portfolio images to `public/portfolio/` or equivalent
- [ ] Upload artist photos to `public/artists/` or equivalent
- [ ] Optimize all images (WebP, correct dimensions)

### Phase 4 — Integrations
- [ ] Configure Formspree endpoint in `src/pages/Contact.jsx`
- [ ] Test contact form end-to-end
- [ ] (Optional) Configure Google Analytics / Plausible
- [ ] (Optional) Configure Google Maps embed in Contact page

### Phase 5 — Pre-deploy testing
- [ ] Test all routes in incognito mode
- [ ] Test responsive layout (desktop, tablet, mobile)
- [ ] Verify all links work (internal + external)
- [ ] Verify contact form submission
- [ ] Verify social icons open correct profiles
- [ ] Test on 2+ different browsers (Chrome, Firefox)
- [ ] Run `npm run build` to ensure production build works
- [ ] Check console for errors/warnings

### Phase 6 — Deploy
- [ ] Connect GitHub repo to Vercel
- [ ] Configure custom domain in Vercel
- [ ] Verify DNS propagation
- [ ] Test production URL
- [ ] Verify HTTPS is active

### Phase 7 — Handover
- [ ] Send client deploy URL and credentials
- [ ] Provide instructions for future content updates
- [ ] Send invoice
- [ ] Archive project files

---

## Pre-requisites

Before starting, collect the following from the client. **Do not start development until you have at least the mandatory items** — otherwise you'll end up with placeholder content in production.

### Mandatory (block starting the project)
- **Studio name and tagline**
- **Physical address** (for Contact page and SEO)
- **Phone / WhatsApp number** (real, working)
- **Email address** (real, working)
- **Instagram handle / URL**
- **Business hours** (all 7 days of the week)
- **List of artists** with: name, role, bio, styles, years of experience, Instagram handle
- **List of services** offered (name + description for each)
- **Portfolio**: at least 10-15 high-quality images of real work, with style category and title
- **FAQ answers** adapted to the specific studio's policies (deposit, minors, walk-ins, etc.)
- **Legal info**: VAT number, legal entity name for Privacy/Cookie policies

### Recommended (can start without, but collect ASAP)
- **Artist photos** (portrait shots, min 1000x1000px)
- **Logo** in vector format (SVG preferred)
- **Brand color palette** (primary, secondary, accent)
- **Typography preferences** (any specific fonts?)
- **Google Maps link** to their location
- **Social accounts** beyond Instagram (TikTok, Facebook, etc.)
- **Testimonials** from existing clients

### Optional (nice to have)
- Short video / reel for homepage hero
- Custom domain already purchased
- Formspree account (or we create one on behalf of client)
- Google Analytics / Google Business account

---

## Phase 1 — Setup

### 1.1 Clone the template

Open a terminal in your projects folder:

```powershell
cd C:\Dev\Projects\React
git clone https://github.com/GiuSem14/sacropinto-site.git client-studio-name
cd client-studio-name
```

Replace `client-studio-name` with a meaningful short name (e.g., `dragontattoo-milano`, `inkstudio-roma`).

### 1.2 Reset Git history for the new project

The cloned project has all of Sacropinto's commit history. For a new client, start fresh:

```powershell
Remove-Item -Recurse -Force .git
git init
git add .
git commit -m "chore: initial commit from sacropinto-site template"
```

### 1.3 Create new GitHub repo

Create a new **private** repo on GitHub for this client (don't reuse the same repo). Then connect:

```powershell
git remote add origin https://github.com/GiuSem14/<new-repo-name>.git
git branch -M main
git push -u origin main
```

### 1.4 Update `package.json`

Change the `name` field to match the new project:

```json
{
  "name": "client-studio-name",
  "version": "0.1.0",
  ...
}
```

### 1.5 Install dependencies

```powershell
npm install
```

### 1.6 Verify the template runs

```powershell
npm run dev
```

Open `http://localhost:5173` in incognito mode and verify the template loads correctly with Sacropinto's placeholder content. This is your starting baseline.

---

## Phase 2 — Content

All client-specific content lives in **two places**:
- `src/utils/constants.js` → identity and contact info
- `src/data/*.js` → collections (artists, portfolio, services, FAQ)

### 2.1 Update `src/utils/constants.js`

This is the most critical file. Update every field:

```js
export const SITE_NAME = "Studio Name"
export const SITE_DESCRIPTION = "Short description for meta tags"
export const SITE_URL = "https://studio-domain.it"

export const CONTACT = {
  address: "Full address, City, Province",
  phone: "+39 XXX XXX XXXX",
  whatsapp: "+39 XXX XXX XXXX",
  email: "info@studio-domain.it",
  instagram: "https://www.instagram.com/studio-handle",
  googleMapsUrl: "https://maps.google.com/?q=...",
  googleMapsEmbed: "<iframe embed code from Google Maps>",
}

export const HOURS = [
  { day: "Lunedì", hours: "Chiuso" },
  { day: "Martedì", hours: "10:00 – 19:00" },
  // ... update all 7 days
]

export const NAV_LINKS = [
  // Usually no changes needed — routes stay the same
]
```

### 2.2 Update `src/data/artists.js`

Replace the placeholder artist with real data. Add one object per artist:

```js
export const artistsData = [
  {
    id: 1,
    name: "Real Artist Name",
    role: "Tattoo Artist / Owner / etc.",
    bio: "Real biography with style philosophy and approach.",
    styles: ["Blackwork", "Realistico", ...],
    experience: "X anni di esperienza",
    instagram: "https://www.instagram.com/artist-handle",
    image: "/artists/artist-name.jpg",  // path to image in public/
  },
  // ... more artists
]
```

### 2.3 Update `src/data/portfolio.js`

Replace placeholder opere with real portfolio pieces:

```js
export const portfolioData = [
  {
    id: 1,
    title: "Title of the work",
    style: "Blackwork",  // must match a style in portfolioStyles
    image: "/portfolio/work-001.jpg",
    alt: "Descriptive alt text for accessibility and SEO",
  },
  // ... more works
]

export const portfolioStyles = ["Tutti", "Blackwork", "Linework", ...]
```

Also update `portfolioStyles` to match the actual styles present.

### 2.4 Update `src/data/services.js`

Review the default services and adapt to what this specific studio offers. Remove services they don't offer, add new ones if needed.

### 2.5 Review `src/data/faq.js`

Adapt answers to client-specific policies (deposit amount, minors policy, walk-ins, payment methods, etc.). Don't just copy Sacropinto's answers — each studio has different rules.

### 2.6 Update meta descriptions in pages

For each file in `src/pages/*.jsx`, update the `<meta name="description">` inside `<Helmet>` to reflect the new studio name and location. Keep meta descriptions between 140-160 characters for SEO.

---

## Phase 3 — Assets

### 3.1 Favicon

The template uses a simple SVG-only favicon at `public/favicon.svg` with a single letter on a black background (default: "S" for Sacropinto). SVG is supported by all modern browsers and scales perfectly at any size.

**To adapt the favicon for a new client**:

1. Open `public/favicon.svg` in any text editor (e.g., VS Code)
2. Locate the `<text>` element — it contains a single letter
3. Replace the letter with the client's initial (e.g., "D" for "Dragon Tattoo", "I" for "Ink Studio")
4. Optionally, change `fill="#000000"` (background) or `fill="#ffffff"` (text color) to match the client's brand palette
5. Save the file

**To update the title and meta description** shown in browser tabs before React mounts:

1. Open `index.html` at the project root
2. Update the `<title>` tag with the client's studio name
3. Update the `<meta name="description">` tag with a short client-specific description
4. Update the `<meta name="theme-color">` to match the client's brand color (controls the mobile browser bar color)
5. Also ensure `<html lang="it">` matches the actual site language

**Note**: avoid PNG fallbacks unless targeting very old browsers — they require additional files and generation steps without real-world benefit. All browsers released after 2020 support SVG favicons natively.

### 3.2 Logo

If the client provides a logo image, add it to `src/assets/logo.svg` (or `.png`) and update `Navbar.jsx` to use it instead of the text logo. Otherwise, keep the text logo with the studio name.

### 3.3 Portfolio images

Create `public/portfolio/` and upload all portfolio images. Recommendations:
- **Format**: WebP (better compression) with JPG fallback
- **Dimensions**: 1200x1200px (square) for portfolio grid
- **File size**: < 200KB per image after compression
- **Naming**: descriptive filenames (e.g., `blackwork-dragon-01.webp`)

### 3.4 Artist photos

Create `public/artists/` and upload artist portraits. Same recommendations as portfolio.

### 3.5 Image optimization

Before deploy, run images through a compressor:
- **Online**: squoosh.app (Google, free)
- **CLI**: `sharp-cli` or `imagemin`

Target: < 100KB per image when possible.

---

## Phase 4 — Integrations

### 4.1 Formspree (contact form)

1. Create a Formspree account (or use the agency's master account)
2. Create a new form for this client
3. Copy the form endpoint URL (looks like `https://formspree.io/f/XXXXXXXX`)
4. Open `src/pages/Contact.jsx` and replace the placeholder endpoint:

```jsx
<form action="https://formspree.io/f/TUOID" method="POST" ...>
```

Replace `TUOID` with the real form ID.

5. Test the form by submitting a test message and verifying it arrives.

### 4.2 Google Analytics (optional)

If the client wants analytics:
1. Create a GA4 property in the client's Google account
2. Add the tracking script to `index.html` or use a React wrapper
3. Test that data flows after 24 hours

### 4.3 Google Maps embed (optional)

1. Go to Google Maps, find the studio location
2. Click "Share" → "Embed a map" → copy the HTML iframe
3. Paste the iframe src into `CONTACT.googleMapsEmbed` in `constants.js`
4. Add the iframe rendering in `Contact.jsx`

---

## Phase 5 — Pre-deploy Testing

Run through this checklist **before** deploying to production. Better to catch bugs now than have the client find them.

### Functional tests
- [ ] All 8 routes load without errors
- [ ] Navbar links navigate correctly
- [ ] Footer links navigate correctly
- [ ] Contact form submits successfully (test with real submission)
- [ ] Social icons in navbar open Instagram and WhatsApp correctly
- [ ] Social icons in footer open correctly
- [ ] Phone/email links work (`tel:` and `mailto:`)
- [ ] Portfolio filters work for all styles

### Visual tests
- [ ] Layout is centered on wide monitors (no left-alignment bug)
- [ ] All images load correctly (no broken links)
- [ ] Responsive layout works at 375px, 768px, 1024px, 1920px
- [ ] No horizontal scroll at any breakpoint
- [ ] All text is readable (contrast, size)
- [ ] Italian characters render correctly (`à`, `è`, `ì`, `ò`, `ù`, `€`, `©`)

### Technical tests
- [ ] `npm run build` completes without errors
- [ ] Browser console shows zero errors
- [ ] Lighthouse score > 85 for Performance, Accessibility, SEO
- [ ] All meta descriptions are 140-160 characters
- [ ] All images have meaningful `alt` text
- [ ] Favicon displays in browser tab
- [ ] Page titles are unique per page

### Browser tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (if available)
- [ ] Mobile Chrome on a real phone

---

## Phase 6 — Deploy

### 6.1 Vercel deployment

1. Log in to Vercel with the agency's account
2. Click "New Project" → "Import Git Repository"
3. Select the client's GitHub repo
4. Vercel auto-detects Vite — accept default settings
5. Click "Deploy"
6. Wait for first build to complete (1-3 minutes)
7. Test the provided `*.vercel.app` URL

### 6.2 Custom domain

1. In Vercel project → Settings → Domains
2. Add the client's domain (e.g., `studiotattoo.it`)
3. Follow Vercel's DNS configuration instructions
4. Update DNS records at the domain registrar (Aruba, Register, etc.)
5. Wait for propagation (can take 1-24 hours)
6. Verify HTTPS is active (automatic via Vercel)

### 6.3 Production verification

After deploy, run the Phase 5 tests again on the live URL. Things that worked locally may break in production due to:
- Different environment variables
- Missing build optimizations
- Asset loading paths

---

## Phase 7 — Handover

### 7.1 Documentation for the client

Send the client a short handover document including:
- **Live URL** of the website
- **How to request content changes** (email/WhatsApp to you)
- **Social account links** that are connected
- **Formspree account info** (if they'll manage it themselves)
- **Your support policy** (e.g., "30 days of free bug fixes after launch")

### 7.2 Credentials to transfer

Depending on the agreement, transfer or keep the following:
- Vercel project access
- GitHub repo access
- Domain registrar credentials
- Formspree access
- Google Analytics access

### 7.3 Invoicing

Send the invoice with:
- Project description
- Agreed price
- Payment terms
- Bank details or payment link

### 7.4 Archive

- Tag the final commit in Git (`git tag v1.0-launch`)
- Keep a local backup of the final project folder
- Archive client communications in a dedicated folder

---

## Estimated Timeline

For a solo developer with all content ready:

| Phase | Time |
|-------|------|
| Phase 1 — Setup | 30 min |
| Phase 2 — Content | 3-5 hours |
| Phase 3 — Assets | 2-4 hours |
| Phase 4 — Integrations | 1 hour |
| Phase 5 — Testing | 1-2 hours |
| Phase 6 — Deploy | 30 min |
| Phase 7 — Handover | 1 hour |
| **Total** | **9-14 hours** |

Spread this over 2-3 working days to allow for review iterations with the client.

---

## Lessons Learned (update after each project)

> Add notes here after completing each client project. What went well? What slowed you down? What would you change next time?

### Project #0 — Sacropinto (template baseline)
- Initial template development
- Discovered lucide-react v1.0 removed brand icons — switched to react-icons
- Fixed universal CSS selector bug that broke Tailwind v4 centering

### Project #1 — [Next client]
- [ ] To be filled after first real client
