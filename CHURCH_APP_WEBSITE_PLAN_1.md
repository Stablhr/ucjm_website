# UNITY IN CHRIST JESUS MINISTRIES — Website & Mobile App Plan

> **Current Status:** Website is fully built and deployed.
> **Next Phase:** Cross-platform mobile app (React Native).
> **Stack (Website):** React 19 + Vite + Tailwind CSS + Supabase + YouVersion Platform SDK
> **Stack (Mobile):** React Native (Expo)
> **Last Updated:** June 2026

---

## Current Website Architecture

### What's Already Built (Production)

| Feature | Status | Details |
|---------|--------|---------|
| Authentication | ✅ Live | Email/password, Google OAuth, Facebook OAuth, password reset via Supabase Auth |
| Profile Management | ✅ Live | Edit name, view role/email, auto-profile creation on signup |
| Home Page | ✅ Live | Hero section, Daily Verse (YouVersion), Announcements, Service Times, Feature Teasers, Upcoming Events, Photo Gallery, CTA banner |
| Bible Reader | ✅ Live | Full YouVersion BibleReader with font size controls, dark mode, verse numbers |
| Songs Library | ✅ Live | 14 built-in songs with chords, transpose (-5 to +6), filters (category/artist/album/language), grid/list view |
| Playlists | ✅ Live | Create/manage playlists for service sets, add/remove/sort songs |
| Reading Guide | ✅ Live | 8 seven-day plans (Love, Faith, Prayer, Wisdom, Hope, Grace, Strength, Peace), streak tracking, progress persisted to Supabase |
| Admin Dashboard | ✅ Live | Route-guarded, sidebar layout, CRUD for announcements and events |
| Photo Gallery | ✅ Live | Grid of photos from Supabase `photos` table |

### Technology Stack (Current Website)

```
Frontend:    React 19 + Vite 5 + Tailwind CSS 3
Backend:     Supabase (Auth, Database, Storage)
Bible API:   YouVersion Platform SDK (@youversion/platform-react-ui)
State:       Zustand
Routing:     react-router-dom v6
Icons:       lucide-react
Notifications: react-hot-toast
Fonts:       Inter (body), Playfair Display (display), IBM Plex Mono (verses)
```

### Design Tokens (Current Website)

```
--ivory:       #FAF9F7   (page background)
--charcoal:    #1C1C1C   (primary text)
--slate:       #4A4A4A   (secondary text)
--accent:      #2D5E40   (forest green)
--accent-warm: #C4892A   (gold amber, highlights)
--divider:     #E4E0D8   (hairline borders)
--surface:     #FFFFFF   (cards, modals)
--brand:       #0a1db0   (church branding accent in header)
```

### Supabase Database Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profile, role (member/admin), auto-created via trigger |
| `announcements` | Title, description, image, posted date, publish status |
| `events` | Title, description, date/time, location, image, publish status |
| `photos` | Image URL, alt text, sort order |
| `songs` | Title, artist, key, category, language, lyrics with chords |
| `playlists` | Service playlists with title, date, notes |
| `playlist_songs` | Junction table with position and key override |
| `user_progress` | Reading guide progress, streak, longest streak (JSONB) |

### Environment Variables (Required)

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_YV_APP_KEY=
```

---

## Folder Structure (Current Website)

```
ucjm_website/
  assets/                          # Raw source files (not bundled)
    logo/
    brand/
    photos/
    videos/
    docs/

  public/                          # Static files served as-is
    images/
      logo.jpg
      hero-bg.png
    favicon.ico
    apple-touch-icon.png
    robots.txt
    songs.json                     # Built-in songs data

  src/
    components/
      layout/        # Navbar, Footer, Layout wrapper, AdminRoute
      ui/            # Button, Card
    pages/           # Home, Bible, Songs, Guide, Login, SignUp, Profile, ForgotPassword
    features/
      auth/          # (auth handled by store)
      home/          # DailyVerse, AnnouncementsSection, UpcomingEvents, ServiceTimes, FeatureTeaser, PhotoGallery
      songs/         # SongList, SongCard, SongDetail, ChordTransposer, PlaylistManager, PlaylistDetail, AddSongModal, AddToPlaylistModal
      guide/         # GuidePlanCard, GuideDayCard, GuideReadingView
      admin/         # AdminLayout, AdminDashboard, AdminEvents, AdminEventForm, AdminAnnouncements, AdminAnnouncementForm
    services/
      supabase.js    # Supabase client
      youversion.js  # YouVersion key export
    store/
      authStore.js
    styles/
      index.css      # Tailwind base + global resets
```

---

## Mobile App Build Plan (React Native / Expo)

### Phase 1 — Foundation

**Goal:** Shared code, navigation shell, auth parity with website.

**Tasks:**
- Initialize Expo project with TypeScript
- Set up shared API layer (Supabase JS client + YouVersion SDK for React Native)
- Build navigation structure (React Navigation): Auth stack + Main tabs
- Port auth flow: Login, SignUp, ForgotPassword using Supabase Auth
- Port Zustand auth store (or migrate to MMKV-persisted store)
- Create shared UI component library matching web design tokens
- Set up font system (Inter, Playfair Display via expo-font)

**Key Decisions:**
- YouVersion SDK for web uses DOM APIs — need to check if React Native fallback exists or build custom Bible text fetcher
- Supabase JS client works in React Native out of the box
- Use `@supabase/auth-ui-react` native or custom auth forms

### Phase 2 — Core Content Features

**Goal:** Home, Songs, Guide, Bible on mobile.

**Tasks:**
- **Home Screen:** Hero, Daily Verse (API.Bible or YouVersion REST fallback), Announcements, Events, Photo Gallery
- **Screens:** Song list, Song detail (with chord rendering + transposition), Playlists
- **Reading Guide:** Plan list, daily reading view, streak display, completion toggle
- **Bible Reader:** If YouVersion SDK has no RN support, use API.Bible REST API directly to fetch chapters and render with custom reader UI
- **Dark Mode:** Follow system appearance, persisted preference

### Phase 3 — Admin & Polish

**Goal:** Feature parity with web + mobile-specific enhancements.

**Tasks:**
- **Admin Screens:** Dashboard, Announcement CRUD, Event CRUD (responsive forms)
- **Push Notifications:** Expo push notifications for new announcements, daily reading reminders
- **Offline Support:** Cache Bible chapters, songs, and reading plans with expo-file-system + SQLite
- **Profile & Settings:** Edit profile, theme toggle, notification preferences
- **Deep Linking:** Share song/verse/event links
- **App Icon & Splash Screen:** Match church branding

### Phase 4 — Release

**Tasks:**
- EAS Build setup (iOS + Android)
- TestFlight + Google Play beta testing
- Church community feedback
- Production release

---

## Key Differences: Web vs Mobile

| Concern | Web (Current) | Mobile (Planned) |
|---------|---------------|------------------|
| Bible SDK | YouVersion SDK (`@youversion/platform-react-ui`) | API.Bible REST or custom YouVersion integration |
| Storage | Supabase Storage | Supabase Storage + local cache |
| Auth Persistence | HTTP-only cookies | MMKV / SecureStore |
| Push Notifications | None (planned: FCM) | Expo Push Notifications |
| Offline | None | SQLite + file caching |
| Deployment | Vercel / Firebase Hosting | EAS Build → App Store + Google Play |
| Font Loading | fontsource npm packages | expo-google-fonts |

---

## Summary

The web version is **complete** — all planned features (Auth, Bible, Songs, Guide, Admin, Home) are built and functional. The next step is to build a **React Native (Expo)** mobile app that mirrors the website's functionality while adding mobile-native features (offline, push notifications, deep linking).

The mobile app should prioritize **shared Supabase backend** and **reusable design tokens** to minimize duplicated work.
