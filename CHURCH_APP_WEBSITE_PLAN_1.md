# ⛪ Church App — Website Build Plan
### Phase-by-Phase Development Guide with Design Reference

> **Design Reference:** [Eindhoven Design District](https://www.eindhovendesigndistrict.com/)
> **Stack:** ReactJS (Vite) + Tailwind CSS
> **Last Updated:** June 2026

---

## What We're Extracting from the Design Reference

Before a single line of code, here's what the Eindhoven Design District site teaches us about look and feel — applied to the Church App:

| EDD Pattern | Church App Adaptation |
|---|---|
| Full-bleed hero image, minimal text overlay | Hero with a powerful church/worship photo, one bold headline |
| White/off-white editorial background | Clean white canvas with warm off-white section breaks |
| Large bold section headers, generous whitespace | Big "Bible", "Songs", "Reading Guide" section headers |
| Card layout for projects | Cards for daily verse, announcements, song previews |
| Minimal top nav (5 items max) | Home · Bible · Songs · Guide · Login |
| Alternating image + text rows | Features section: image left, desc right, then flip |
| Horizontal scroll carousel for articles | Horizontal scroll for featured songs or announcements |
| Single CTA section at the bottom | "Join the community" or "Start Reading Today" CTA |
| Flat, no heavy shadows or gradients | Flat UI — borders over box shadows, thin rules |
| Footer: links + logo only | Footer: quick links + church name + social icons |

---

## Design Token System

Define these once in `tailwind.config.js` and use them everywhere.

### Colors
```
--ivory:       #FAF9F7   (page background — warmer than pure white)
--charcoal:    #1C1C1C   (primary text)
--slate:       #4A4A4A   (secondary text, captions)
--accent:      #2D5E40   (forest green — reverent, grounded, not generic blue)
--accent-warm: #C4892A   (gold amber — used sparingly for highlights, verse callouts)
--divider:     #E4E0D8   (hairline borders between sections)
--surface:     #FFFFFF   (cards, modal backgrounds)
```

### Typography
```
Display:   "Playfair Display" — serif, used for hero headline and section titles
Body:      "Inter" — clean sans-serif for all readable content
Utility:   "IBM Plex Mono" — for verse references (e.g., John 3:16) and chord labels
```

> Why Playfair Display? It carries a sense of reverence and gravitas without feeling outdated — matching EDD's editorial serif energy but rooted in a spiritual context.

### Spacing Scale (Tailwind)
Use only: `4, 8, 12, 16, 24, 32, 48, 64, 96` (px equivalents)
Generous whitespace between sections — minimum `py-24` on desktop.

---

## Constraints You Must Know Before Building

### Technical Constraints
- **ReactJS (Vite) only** — no Next.js for Phase 1. Server-side rendering comes later.
- **Tailwind CSS only** — no separate CSS files except for `index.css` global resets.
- **No browser localStorage for auth tokens** — use in-memory or HTTP-only cookies.
- **Bible API rate limits** — API.Bible free tier caps at 5,000 requests/day. Cache responses in state.
- **No bundling native mobile yet** — Phase 1 is web only. PWA added in Phase 3.
- **Firebase free tier limits** — Firestore: 50k reads/day, 20k writes/day, 1GB storage.

### Design Constraints
- **Font loading** — Use `<link rel="preconnect">` for Google Fonts or self-host via `fontsource`.
- **Full-bleed hero images** — Must have a real, high-quality photo. Use Unsplash or your own church photos. No stock illustrations.
- **Mobile-first** — Design every component at 375px wide first, then scale up.
- **No carousels with auto-play** — EDD uses manual swipe. Auto-play carousels hurt UX.
- **Tailwind purge** — Only classes used in JSX will be included in the build. Don't use dynamic class strings like `text-${color}`.

### Scope Constraints (per PRD Phases)
- Phase 1: No Songs feature, no Reading Guide, no full Bible reader — these are Phase 2.
- Phase 1: Admin posting is done directly in Firebase console for MVP. Dashboard is Phase 3.
- Phase 2: Chord transposer is a nice-to-have, not a blocker.
- Phase 3: Multi-language (English + Filipino) — don't hardcode strings in Phase 1 so i18n can be added.

---

## Tools You Need

### Core Dev Tools
| Tool | Purpose | Install |
|---|---|---|
| **Node.js (v20+)** | JavaScript runtime | nodejs.org |
| **npm or pnpm** | Package manager | Comes with Node |
| **Vite** | Build tool for ReactJS | `npm create vite@latest` |
| **Git + GitHub** | Version control | git-scm.com |
| **VS Code** | Code editor | code.visualstudio.com |

### VS Code Extensions (Install These)
| Extension | Purpose |
|---|---|
| Tailwind CSS IntelliSense | Autocomplete for Tailwind classes |
| ES7+ React Snippets | Fast component scaffolding |
| Prettier | Auto-format on save |
| ESLint | Catch errors before they ship |
| Auto Rename Tag | Rename JSX open/close tags together |
| GitLens | Better Git history inside VS Code |

### NPM Packages (Full List by Phase)

**Phase 1**
```bash
npm install react-router-dom        # Page routing
npm install axios                   # API calls
npm install firebase                # Auth + Firestore DB
npm install zustand                 # Global state (lightweight)
npm install @fontsource/playfair-display
npm install @fontsource/inter
npm install lucide-react            # Icons
npm install react-hot-toast         # Notification toasts
```

**Phase 2**
```bash
npm install @tanstack/react-query   # Data fetching + caching (Bible API calls)
npm install react-virtuoso          # Virtualized list for long Bible chapters
npm install tone                    # Optional: audio tuner for chord practice
```

**Phase 3**
```bash
npm install vite-plugin-pwa         # PWA (installable on mobile)
npm install react-i18next           # Multi-language (English + Filipino)
npm install i18next
npm install workbox-window          # Service worker for offline Bible
```

### Design Tools
| Tool | Purpose |
|---|---|
| **Figma** (free) | Design mockups before coding |
| **Google Fonts** | Playfair Display + Inter (or use fontsource) |
| **Unsplash** | Free high-quality hero photos |
| **Coolors.co** | Verify color contrast ratios |
| **Responsively App** | Preview at multiple screen sizes simultaneously |

### Backend / Services
| Service | Purpose | Cost |
|---|---|---|
| **Firebase Auth** | Login, signup, Google OAuth | Free tier |
| **Firestore** | Announcements, songs, user data | Free tier |
| **API.Bible** | Fetch Bible chapters/verses | Free (5k req/day) |
| **Firebase Hosting** | Deploy the web app | Free tier |
| **Vercel** (alternative) | Deploy frontend with CI/CD | Free tier |
| **Cloudinary** (optional) | Store announcement images, church photos | Free tier |

---

## Phase 1 — Foundation & Core Pages
### Timeline: Weeks 1–6
### Goal: A working, beautiful public-facing website that members can visit

---

### Week 1 — Project Setup

**Tasks:**
- `npm create vite@latest church-app -- --template react`
- Install and configure Tailwind CSS
- Set up folder structure (see PRD Appendix)
- Create `tailwind.config.js` with custom colors and fonts
- Set up React Router with placeholder pages
- Connect GitHub repo, set up auto-deploy to Vercel or Firebase Hosting
- Add Google Fonts (Playfair Display + Inter) via fontsource

**Deliverable:** A blank app that runs, has routing, and shows your color palette on screen.

**Folder Structure to Create:**
```
src/
  components/
    layout/        # Navbar, Footer, Layout wrapper
    ui/            # Button, Card, Badge, Input — reusable atoms
  pages/
    Home.jsx
    Login.jsx
    SignUp.jsx
    ForgotPassword.jsx
  features/
    auth/          # Login logic, Firebase hooks
    home/          # Announcements, daily verse
  services/
    firebase.js    # Firebase config + exports
    bibleApi.js    # API.Bible wrapper
  store/
    authStore.js   # Zustand store for user session
  assets/
    images/        # Hero photos, church logo
  styles/
    index.css      # Tailwind base + custom global resets
```

---

### Week 2 — Navbar & Home Page Shell (EDD-Inspired Layout)

**Tasks:**
- Build `Navbar.jsx` — minimal, sticky, transparent on hero then solid on scroll
  - Left: Church logo/name
  - Right: Home · Bible · Songs · Guide · Login
  - Mobile: Hamburger menu with slide-in drawer
- Build `Footer.jsx` — two columns: quick links + church name/social
- Build `Home.jsx` layout skeleton with these sections (no data yet):
  1. Hero — full-bleed image + bold headline + one CTA button
  2. Daily Verse — centered card with verse text + reference
  3. Announcements — 3-column card grid
  4. Feature teaser — alternating image/text rows for Bible, Songs, Guide
  5. CTA banner — "Join the community" with Sign Up button

**EDD Patterns to Apply:**
- Hero: `h-screen` with `object-cover` background image, `absolute` text overlay
- Announcements: CSS Grid, `gap-8`, cards with thin border (not shadow)
- Section headers: `font-['Playfair_Display'] text-5xl font-bold tracking-tight`
- Whitespace: `py-24` between every section

**Deliverable:** A visually complete Home page shell. No real data yet — use placeholder text.

---

### Week 3 — Firebase Setup & Authentication

**Tasks:**
- Create Firebase project at console.firebase.google.com
- Enable Email/Password Auth + Google OAuth
- Create `src/services/firebase.js` with your config
- Build `Login.jsx` page — email + password form, Google sign-in button
- Build `SignUp.jsx` page — name, email, password, confirm password
- Build `ForgotPassword.jsx` page — email input, sends reset link
- Create `authStore.js` in Zustand — stores `user` object, `isLoggedIn` bool
- Add protected route wrapper — redirect to Login if not authenticated
- Handle auth errors with toast notifications

**Firebase Auth Setup:**
```javascript
// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { /* your config */ };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

**EDD Pattern Applied to Auth Pages:**
- Split layout: left half = full-bleed church photo, right half = form
- Form inputs: borderless with bottom border only (`border-b border-divider`)
- Submit button: solid accent green, full width, rounded-none (flat, editorial)

**Deliverable:** Working login, signup, and password reset. Users can authenticate.

---

### Week 4 — Daily Verse & Announcements (Live Data)

**Tasks:**
- Register at scripture.api.bible and get your API key
- Build `bibleApi.js` service — function to fetch verse of the day
- Create Firestore collection: `announcements` with fields: `title, body, imageUrl, postedAt`
- Manually add 2–3 test announcements directly in Firebase console
- Build `DailyVerse.jsx` component — fetches and displays verse, caches in Zustand
- Build `AnnouncementCard.jsx` — image, date, title, excerpt, "Read more" link
- Build `AnnouncementFeed.jsx` — fetches from Firestore, renders cards in grid
- Wire both into `Home.jsx`

**Firestore Announcement Structure:**
```
Collection: announcements
Document fields:
  title: "Sunday Service — June 22"
  body: "Join us this Sunday at 9AM for worship..."
  imageUrl: "https://..."
  postedAt: Timestamp
  isPublished: true
```

**Deliverable:** Home page shows a real daily Bible verse and real announcements from Firestore.

---

### Week 5 — Polish, Responsiveness & Animations

**Tasks:**
- Make every page responsive: 375px (mobile) → 768px (tablet) → 1280px (desktop)
- Add scroll-triggered fade-in for sections using Intersection Observer API
- Add hover states on all cards and nav links
- Add loading skeletons for verse and announcements (not spinner — EDD uses content-shaped placeholders)
- Test on real phone using your local IP (`vite --host`)
- Fix any Tailwind class conflicts (padding/margin between sections)
- Lighthouse audit — target 90+ on Performance, Accessibility, Best Practices

**EDD Micro-Interactions to Copy:**
- Nav links: underline slides in from left on hover (`transition-transform`)
- Cards: slight `translateY(-4px)` on hover, no shadow added
- Hero: text fades up on page load (CSS keyframe, no JS library)

**Deliverable:** Pixel-perfect, responsive, polished Phase 1 website.

---

### Week 6 — Deploy & Test Phase 1

**Tasks:**
- Connect GitHub repo to Vercel (or Firebase Hosting)
- Set environment variables (Firebase config, Bible API key) in Vercel dashboard
- Set up `.env.local` for local dev (never commit this file)
- Test all flows: Sign up → Login → View home → See verse → Read announcement
- Share with 3–5 church members for feedback
- Fix any bugs or UX confusion reported

**Environment Variables:**
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_BIBLE_API_KEY=...
```

**Deliverable:** Live URL. Phase 1 is shipped. ✅

---

## Phase 2 — Spiritual Features (Songs + Bible + Reading Guide)
### Timeline: Weeks 7–12
### Goal: The core spiritual tools are live and usable

---

### Week 7 — Bible Reader Page

**Tasks:**
- Build `Bible.jsx` page with:
  - Book selector dropdown
  - Chapter selector dropdown
  - Verse list rendered below
- Integrate API.Bible — fetch books → fetch chapters → fetch verses
- Wrap all fetches with `@tanstack/react-query` for caching
- Add font size controls (3 sizes: Normal, Large, Extra Large) stored in Zustand
- Add dark mode toggle (Tailwind `dark:` classes, stored in Zustand + localStorage)
- Add "Copy verse" button on each verse
- Add verse bookmark — saves to Firestore under `users/{uid}/bookmarks`

**EDD Layout Pattern:**
- Bible page: Left column = navigator (sticky), Right column = verse content
- Verse text: `font-['Playfair_Display']` for body text — matches EDD's editorial serif feel
- Verse reference: `font-['IBM_Plex_Mono'] text-sm text-slate` — distinct typographic role

---

### Week 8 — Songs Library

**Tasks:**
- Create Firestore collection: `songs` with fields: `title, artist, key, category, language, lyricsWithChords`
- Manually add 5–10 church songs to Firestore for testing
- Build `Songs.jsx` page — searchable list with filter tabs (All, Praise, Worship, Hymn)
- Build `SongCard.jsx` — title, artist, key badge
- Build `SongDetail.jsx` — full lyrics with chords displayed above lines
- Build `ChordTransposer.jsx` — +/- buttons to shift key up or down, updates displayed chords

**Chord Format (store in Firestore as plain text):**
```
[G]Maglilingkod [C]ako sa 'Yo
[G]Sa buo kong [D]puso at [G]kaluluwa
```

**Chord parsing logic** — regex to find `[CHORD]` markers, render above lyric text using relative positioning.

**EDD Pattern Applied:**
- Song list: same card grid as announcements, consistent visual language
- SongDetail: full-width page, chords in `IBM Plex Mono`, lyrics in `Inter`
- Key badge: pill with `bg-accent/10 text-accent` — minimal color use

---

### Week 9 — Bible Reading Guide

**Tasks:**
- Create Firestore collections: `readingPlans` + `readingPlanDays`
- Add one starter plan manually: "New Testament in 30 Days"
- Build `ReadingGuide.jsx` — shows active plan, today's reading, progress bar
- Build `DayItem.jsx` — day number, reading reference, checkbox to mark complete
- Store completion in Firestore: `users/{uid}/progress/{planId}/days/{dayNumber}`
- Show streak count (consecutive days checked) in the header
- Add "Start a Plan" flow if user hasn't joined one yet

---

### Week 10 — Search Feature

**Tasks:**
- Build `Search.jsx` page with a single text input
- On submit: query Firestore for matching songs (by title), announcements (by title)
- For Bible search: use API.Bible search endpoint
- Show results in tabbed sections: Bible | Songs | Announcements
- Add recent searches (stored in Zustand, lost on refresh — no persistence needed yet)

---

### Week 11 — Profile & Settings Page

**Tasks:**
- Build `Profile.jsx` — display name, email, church role, joined date
- Allow editing display name (updates Firebase Auth + Firestore user doc)
- Build `Settings.jsx` — controls for: theme, font size, default Bible version, notification toggle
- All settings stored in Firestore `users/{uid}/settings` so they sync across devices

---

### Week 12 — Phase 2 Polish & Testing

**Tasks:**
- Full regression test: Auth → Bible → Songs → Guide → Search → Profile
- Test on slow 3G connection (Chrome DevTools throttle)
- Add error boundaries to every major page
- Add empty states for all lists (no songs yet, no announcements, etc.)
- Lighthouse audit again — maintain 90+ scores

**Deliverable:** Full spiritual feature set live. ✅

---

## Phase 3 — Admin, PWA & Scale
### Timeline: Weeks 13–18
### Goal: Admins can self-serve, app is installable on mobile, ready to scale

---

### Week 13–14 — Admin Dashboard

**Tasks:**
- Create `/admin` route — only accessible if `user.role === 'admin'`
- Build `AdminLayout.jsx` — left sidebar nav for admin sections
- Build admin pages:
  - `AdminAnnouncements.jsx` — create, edit, delete announcements (rich text via `react-quill`)
  - `AdminSongs.jsx` — add/edit/delete songs
  - `AdminReadingPlans.jsx` — create custom plans with daily readings
  - `AdminMembers.jsx` — view members, assign roles
- Add `react-quill` for rich text announcement editor

---

### Week 15 — PWA (Progressive Web App)

**Tasks:**
- Install and configure `vite-plugin-pwa`
- Create `manifest.json` with app name, icons, theme color
- Set up service worker to cache: app shell, fonts, and Bible chapters already read
- Add "Add to Home Screen" prompt for mobile users
- Test install on Android Chrome and iOS Safari

**This makes the app installable on phones without going through an app store.**

---

### Week 16 — Notifications & Multi-language

**Tasks:**
- Set up Firebase Cloud Messaging (FCM) for push notifications
- Add notification permission prompt in Settings page
- Send daily reading reminders at user-set time
- Install `react-i18next` + `i18next`
- Extract all UI strings to `en.json` and `fil.json` (Filipino)
- Add language toggle in Settings

---

### Week 17–18 — Final Polish, SEO & Launch

**Tasks:**
- Add `<meta>` tags for SEO and social sharing (Open Graph)
- Add church logo as favicon
- Final Lighthouse audit — 90+ on all categories
- Cross-browser test: Chrome, Firefox, Safari, Edge
- Gather feedback from soft launch (share with core members)
- Fix final bugs
- Announce official launch

---

## Summary Table

| Phase | Weeks | Key Deliverables |
|---|---|---|
| **Phase 1** | 1–6 | Project setup, Navbar, Home page, Auth (Login/Signup), Daily Verse, Announcements, Deployed live |
| **Phase 2** | 7–12 | Bible Reader, Songs + Chord Transposer, Reading Guide, Search, Profile & Settings |
| **Phase 3** | 13–18 | Admin Dashboard, PWA (installable), Push notifications, Filipino language support, Final launch |

---

## Quick Reference — File Naming Conventions

```
Pages:        PascalCase       Home.jsx, SongDetail.jsx
Components:   PascalCase       AnnouncementCard.jsx, ChordTransposer.jsx
Hooks:        camelCase + use  useAuth.js, useBible.js
Services:     camelCase        firebase.js, bibleApi.js
Store:        camelCase        authStore.js, settingsStore.js
Constants:    SCREAMING_SNAKE  BIBLE_VERSIONS.js, READING_PLANS.js
```

---

> *Build Phase 1 first. Ship it. Get real feedback from your church community before writing Phase 2 code.*
>
> **Stack:** ReactJS (Vite) + Tailwind CSS + Firebase + API.Bible
> **Design Reference:** eindhovendesigndistrict.com
> **PRD Reference:** See `README.md` in this project
