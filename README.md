# InkedN — combined front-end (GitHub Pages static prototype)

This is the **merged** version of two earlier prototypes:

| Source                                       | Role in this build                                            |
| -------------------------------------------- | ------------------------------------------------------------- |
| `inkedn-github-pages-skeleton.zip` (skeleton) | **Base structure & design language.** Provides the warm dark / cream / copper system, soft rounded shape language, semantic view sections, sidebar nav, role switch, artist search, profile, booking, AI assistant, dashboard, lead detail, profile editor, and admin overview. |
| `inkgang-github-pages.zip` (redesign)        | **Current source of truth for product direction.** Drives the new onboarding gate (artist vs. customer), the Reels-style discovery feed as the customer landing, and the Firebase scaffold for shared artist/reel/lead data. |

No build step. No bundler. Plain HTML / CSS / JS that ships to GitHub Pages as-is.

---

## File map

| File                          | Source                       | Purpose                                                                 |
| ----------------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| `index.html`                  | skeleton + onboarding/reels  | All views as semantic sections, switched by JS.                         |
| `styles.css`                  | skeleton + onboarding/reels  | Design system: warm dark ink + cream + copper, soft rounded, mobile-first. |
| `app.js`                      | skeleton + reels + onboarding + Firebase | Sample data, state, view routing, AI assistant mock, reels feed, onboarding gate, Firebase scaffold. |
| `favicon.svg`                 | skeleton                     | Inline SVG mark — stylized **N** with an ink-drop dot.                  |
| `firebase-config.js`          | new (redesign-derived)       | Runtime Firebase config. Ships with placeholders → app runs in demo mode. |
| `firebase-config.example.js`  | new                          | Documented template for filling in your own Firebase project.           |
| `.env.example`                | new                          | Convention for any future Node-side tooling that templates `firebase-config.js`. |
| `.nojekyll`                   | new (redesign convention)    | Tells GitHub Pages not to process this as a Jekyll site.                |
| `.gitignore`                  | skeleton + `.env` rules      | Standard ignores plus local secrets.                                    |
| `README.md`                   | this file                    | You are here.                                                           |

---

## Major flows

### 1. Onboarding (new — gates the app on every first visit)
- A full-bleed onboarding screen asks **"Customer / Artist"**.
- Choice is persisted; the top-bar **Restart onboarding** button (↺) returns you here.
- Admin role is still reachable via the role switch in the top bar.

### 2. Customer — Reels-style discovery (replaces old "Welcome")
- Vertical, scroll-snap **feed** of portfolio pieces. Each card has like, follow, save, and **Book** actions.
- The skeleton's generated SVG portfolio art is reused with per-reel hue shifts so the feed feels visually varied without needing real image assets.
- Other customer views from the skeleton are preserved: Find artists, Saved artists, AI assistant, New request.

### 3. Artist — Studio (preserved & improved from skeleton)
- **Dashboard:** lead counts, segmented filter, lead cards.
- **Lead detail:** status buttons (new → contacted → booked → closed), conversation transcript.
- **Profile editor:** name, shop, city, rate, Instagram, styles, bio, walk-ins.

### 4. Admin — Overview (preserved)
- Artist count, total leads, bookings, lead → booked conversion, recent leads, artist roster.

---

## Firebase scaffold

`firebase-config.js` ships with placeholder credentials. On load `app.js` reads `window.__INKEDN_FIREBASE_CONFIG__`:

- If `apiKey` is still `YOUR_API_KEY` (or missing), the app stays in **demo mode** — all state lives in memory + `localStorage`. The UI is fully functional with seed data.
- If you fill in real values, the modular Firebase SDK is lazy-loaded from `gstatic.com` and `inkednFirebase.db` is exposed for follow-up wiring. The console will log `"[InkedN] Firebase initialised: <projectId>"`.

Suggested Realtime Database shape (documented in `firebase-config.example.js`):

```
/artists/{artistId}
/reels/{reelId}
/leads/{leadId}
/follows/{userId}
/likes/{userId}
```

The current build still drives the UI from `state` (memory + `localStorage`). Wiring reads/writes to Firebase is a follow-up task: replace the in-place mutations in `app.js` (`state.leads.unshift(...)`, etc.) with `set` / `push` / `onValue` calls from `inkednFirebase._db`.

---

## Run locally

```bash
cd inkedn-combined-app
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly — no `fetch()` calls are required at load time.

To **reset the demo** (clears onboarding choice + leads + follows + saved artists):

```js
localStorage.removeItem("inkedn:v2"); location.reload();
```

---

## Deploy to GitHub Pages

1. Push the contents of this folder to the **root** of the repo branch GitHub Pages serves (typically `main` / `(root)`).
2. In **Settings → Pages → Build and deployment**, set source to **Deploy from a branch**, branch `main` / `(root)`.
3. First publish takes a minute or two. Your site URL: `https://<user>.github.io/<repo>/`.

The `.nojekyll` file ensures GitHub Pages serves the files verbatim, including the `_qa-*.png` patterns ignored locally and any underscore-prefixed assets you add later.

All paths are relative, so the site works at both root and subpath URLs.

---

## Design language (preserved from skeleton)

- **Palette:** warm dark ink (`#15100c`), cream (`#f3e7d3`), copper accent (`#d98b4a`), muted sage + berry for status.
- **Type:** Fraunces (display) + Inter (UI) from Google Fonts.
- **Shape:** 18–32 px radii, pill buttons, soft warm shadows.

---

## What is *not* here (intentionally, for now)

- Real auth, payments, calendar sync, SMS / email.
- Real image uploads — reels and portfolios use the skeleton's generated SVG art.
- Real AI calls — the assistant is a mock state machine.
- Real Firebase persistence — the scaffold is wired but the UI still reads/writes through `state`. Swap in `inkednFirebase._db` calls when you're ready.
