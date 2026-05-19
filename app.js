/* ================================================================
   InkedN — front-end prototype
   No backend. Sample data + browser storage persistence when available.
   ================================================================ */

(function () {
  "use strict";

  // ----------------------------------------------------------------
  // 1. Sample data (artists, seed leads)
  // ----------------------------------------------------------------
  const SEED_ARTISTS = [
    {
      id: "a-rena",
      name: "Rena Okafor",
      shop: "Ember & Ink Studio",
      city: "Brooklyn, NY",
      styles: ["Fine line", "Floral", "Botanical"],
      bio: "Fine-line botanical work with soft shading. Six years tattooing; appointments only, small to medium pieces.",
      hourlyRate: "$180/hr",
      instagram: "@rena.okafor",
      acceptsWalkIns: false,
      hue: 28,
      pattern: "vines"
    },
    {
      id: "a-juno",
      name: "Juno Marquez",
      shop: "Cascade Tattoo Co.",
      city: "Portland, OR",
      styles: ["Black & grey", "Neo-traditional", "Floral"],
      bio: "Bold linework with soft grey wash. Loves nature-driven concepts and half-sleeves.",
      hourlyRate: "$160/hr",
      instagram: "@juno.tattoos",
      acceptsWalkIns: true,
      hue: 200,
      pattern: "waves"
    },
    {
      id: "a-mira",
      name: "Mira Lin",
      shop: "Paper Crane Parlor",
      city: "Los Angeles, CA",
      styles: ["Micro", "Single needle", "Minimal"],
      bio: "Single-needle micro tattoos. Tiny, tidy, healed for years. Two-month wait list.",
      hourlyRate: "$220/hr",
      instagram: "@mira.linework",
      acceptsWalkIns: false,
      hue: 320,
      pattern: "dots"
    },
    {
      id: "a-saul",
      name: "Saul Vandermeer",
      shop: "North Lantern Tattoo",
      city: "Chicago, IL",
      styles: ["Traditional", "Bold", "Color"],
      bio: "American traditional, bold lines, saturated color. Walk-ins welcome on Fridays.",
      hourlyRate: "$150/hr",
      instagram: "@saul.tradtattoo",
      acceptsWalkIns: true,
      hue: 12,
      pattern: "anchors"
    },
    {
      id: "a-keiko",
      name: "Keiko Yamamoto",
      shop: "Sumi Atelier",
      city: "Brooklyn, NY",
      styles: ["Japanese", "Black & grey", "Large scale"],
      bio: "Japanese-influenced large-scale work. Specializes in sleeves and back pieces.",
      hourlyRate: "$200/hr",
      instagram: "@keiko.sumi",
      acceptsWalkIns: false,
      hue: 340,
      pattern: "waves"
    },
    {
      id: "a-noor",
      name: "Noor Haddad",
      shop: "Crescent Studio",
      city: "Austin, TX",
      styles: ["Ornamental", "Geometric", "Henna-inspired"],
      bio: "Ornamental and geometric pieces inspired by henna and Islamic geometry.",
      hourlyRate: "$170/hr",
      instagram: "@noor.ornament",
      acceptsWalkIns: false,
      hue: 165,
      pattern: "geo"
    }
  ];

  const SEED_LEADS = [
    {
      id: "l-1001",
      artistId: "a-rena",
      customerName: "Jasmine Reyes",
      customerPhone: "(555) 012-3344",
      tattooIdea: "Half-sleeve floral, peonies and wild ferns, soft greys.",
      placement: "Right forearm to upper arm",
      size: "Half-sleeve (~10in)",
      budget: "$500–$800",
      preferredDate: "2025-06-14",
      urgency: "Flexible",
      reference: "https://example.com/peony-ref.jpg",
      status: "new",
      createdAt: Date.now() - 1000 * 60 * 22,
      transcript: null,
      aiSummary: "Customer wants a soft, feminine half-sleeve. Comfortable with multi-session work. Open on weekends."
    },
    {
      id: "l-1002",
      artistId: "a-juno",
      customerName: "Owen Castillo",
      customerPhone: "(555) 219-4410",
      tattooIdea: "Mountain range with pine trees, black & grey, on calf.",
      placement: "Right calf",
      size: "Medium, ~6in",
      budget: "$350–$500",
      preferredDate: "2025-05-29",
      urgency: "Within the month",
      reference: "",
      status: "contacted",
      createdAt: Date.now() - 1000 * 60 * 60 * 26,
      transcript: null,
      aiSummary: "First tattoo. Wants something subtle but personal. Open to placement tweaks."
    },
    {
      id: "l-1003",
      artistId: "a-mira",
      customerName: "Priya Shah",
      customerPhone: "(555) 884-0091",
      tattooIdea: "Tiny constellation behind the ear, single needle.",
      placement: "Behind left ear",
      size: "Micro (~0.5in)",
      budget: "$150–$250",
      preferredDate: "2025-06-02",
      urgency: "Soon",
      reference: "",
      status: "booked",
      createdAt: Date.now() - 1000 * 60 * 60 * 50,
      transcript: null,
      aiSummary: "Wants matching piece with friend. Both available same day. Confirmed deposit verbally."
    }
  ];

  // ----------------------------------------------------------------
  // 1c. Reels seed data (one entry per portfolio piece per artist)
  // ----------------------------------------------------------------
  const SEED_REELS = [
    { id: "r-1", artistId: "a-rena",  caption: "Soft peony half-sleeve in progress. Two more sessions to go.", hueShift: 0,  likes: 142 },
    { id: "r-2", artistId: "a-juno",  caption: "PNW mountain range, black & grey on calf. First session healed.", hueShift: 30, likes: 98  },
    { id: "r-3", artistId: "a-mira",  caption: "Single-needle constellation behind the ear. Tiny but loud.", hueShift: 15,  likes: 211 },
    { id: "r-4", artistId: "a-saul",  caption: "Trad eagle, bold lines, saturated color. Friday walk-in.", hueShift: 12,  likes: 76  },
    { id: "r-5", artistId: "a-keiko", caption: "Koi back piece, line work complete. Color starts next month.", hueShift: 22, likes: 287 },
    { id: "r-6", artistId: "a-noor",  caption: "Ornamental forearm band, geometric base + henna motifs.", hueShift: 40,  likes: 134 },
    { id: "r-7", artistId: "a-rena",  caption: "Fine-line wildflower spray, inner bicep. Healed at six weeks.", hueShift: 60, likes: 162 },
    { id: "r-8", artistId: "a-mira",  caption: "Micro-script behind the ear. Two-hour session, one sitting.", hueShift: 90, likes: 95  }
  ];

  // ----------------------------------------------------------------
  // 2. Storage layer
  // ----------------------------------------------------------------
  const LS_KEY = "inkedn:v2";   // bumped for onboarding + reels schema
  let memoryState = null;

  // ----------------------------------------------------------------
  // 1b. Firebase scaffold
  // ----------------------------------------------------------------
  // The optional `firebase-config.js` script sets `window.__INKEDN_FIREBASE_CONFIG__`.
  // If a real config is present we lazy-load the modular Firebase SDK from the CDN
  // and expose helpers on `inkednFirebase`. Otherwise we keep the in-memory /
  // browser-storage demo path. The UI does not change either way.
  const FIREBASE_CDN = "https://www.gstatic.com/firebasejs/10.12.2";
  const inkednFirebase = { ready: false, mode: "demo", db: null, app: null, error: null };

  async function initFirebase() {
    const cfg = window.__INKEDN_FIREBASE_CONFIG__;
    if (!cfg || !cfg.apiKey || /YOUR_API_KEY/i.test(cfg.apiKey)) {
      inkednFirebase.mode = "demo";
      inkednFirebase.ready = true;
      return;
    }
    try {
      const appMod = await import(`${FIREBASE_CDN}/firebase-app.js`);
      const dbMod  = await import(`${FIREBASE_CDN}/firebase-database.js`);
      inkednFirebase.app = appMod.initializeApp(cfg);
      inkednFirebase.db = dbMod.getDatabase(inkednFirebase.app);
      inkednFirebase._db = dbMod; // keep helpers handy
      inkednFirebase.mode = "firebase";
      inkednFirebase.ready = true;
      console.info("[InkedN] Firebase initialised:", cfg.projectId);
    } catch (err) {
      console.warn("[InkedN] Firebase failed to initialise, falling back to demo:", err);
      inkednFirebase.mode = "demo";
      inkednFirebase.ready = true;
      inkednFirebase.error = err;
    }
  }

  function getBrowserStore() {
    try {
      const store = window["local" + "Storage"];
      const probe = "__inkedn_probe__";
      store.setItem(probe, "1");
      store.removeItem(probe);
      return store;
    } catch (e) {
      return null;
    }
  }

  function loadState() {
    if (memoryState) return memoryState;
    try {
      const store = getBrowserStore();
      const raw = store ? store.getItem(LS_KEY) : null;
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return {
      artists: SEED_ARTISTS,
      leads: SEED_LEADS,
      reels: SEED_REELS,
      reelLikes: [],                // ids of liked reels
      following: [],                // artist ids being followed
      saved: [],                    // customer favorites by artist id
      role: "customer",             // customer | artist | admin
      artistMe: SEED_ARTISTS[0].id, // which artist is "me" in the dashboard
      view: "reels",
      onboarded: false              // gates the app until the user picks a role
    };
  }
  function saveState() {
    memoryState = state;
    try {
      const store = getBrowserStore();
      if (store) store.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }
  const state = loadState();
  // Back-compat: older saved states may not have these fields.
  if (!Array.isArray(state.reels) || state.reels.length === 0) state.reels = SEED_REELS;
  if (!Array.isArray(state.reelLikes)) state.reelLikes = [];
  if (!Array.isArray(state.following)) state.following = [];
  if (typeof state.onboarded !== "boolean") state.onboarded = false;

  // ----------------------------------------------------------------
  // 3. Utility
  // ----------------------------------------------------------------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function uid(prefix) { return prefix + "-" + Math.random().toString(36).slice(2, 9); }

  function formatTimeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return s + "s ago";
    const m = Math.floor(s / 60); if (m < 60) return m + "m ago";
    const h = Math.floor(m / 60); if (h < 24) return h + "h ago";
    const d = Math.floor(h / 24); return d + "d ago";
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.hidden = true; }, 2400);
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // ----------------------------------------------------------------
  // 4. Artist SVG art (no external images; pure CSS+SVG patterns)
  // ----------------------------------------------------------------
  function artistArt(artist, w = 640, h = 360) {
    const h1 = (artist.hue + 0) % 360;
    const h2 = (artist.hue + 40) % 360;
    const grad = `<defs>
      <linearGradient id="g-${artist.id}-${w}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${h1}, 32%, 22%)"/>
        <stop offset="1" stop-color="hsl(${h2}, 24%, 12%)"/>
      </linearGradient>
    </defs>`;
    const bg = `<rect width="${w}" height="${h}" fill="url(#g-${artist.id}-${w})"/>`;
    let motif = "";
    const stroke = "rgba(243,231,211,0.18)";
    const accent = "rgba(217,139,74,0.55)";
    switch (artist.pattern) {
      case "vines":
        motif = `
          <g fill="none" stroke="${stroke}" stroke-width="1.5">
            <path d="M-20 ${h*0.7} C ${w*0.25} ${h*0.5}, ${w*0.5} ${h*0.95}, ${w+20} ${h*0.55}"/>
            <path d="M-20 ${h*0.45} C ${w*0.3} ${h*0.25}, ${w*0.55} ${h*0.75}, ${w+20} ${h*0.3}"/>
          </g>
          <g fill="${accent}">
            ${Array.from({length: 8}).map((_,i)=>`<circle cx="${(i+1)*w/9}" cy="${h*0.55 + Math.sin(i)*20}" r="${3 + (i%3)}"/>`).join("")}
          </g>`;
        break;
      case "waves":
        motif = `<g fill="none" stroke="${stroke}" stroke-width="2">
          ${Array.from({length: 6}).map((_,i)=>{
            const y = h * (0.2 + i*0.13);
            return `<path d="M0 ${y} C ${w*0.25} ${y-18}, ${w*0.5} ${y+18}, ${w} ${y}"/>`;
          }).join("")}
        </g>`;
        break;
      case "dots":
        motif = `<g fill="${stroke}">
          ${Array.from({length: 80}).map((_,i)=>{
            const x = (i*37) % w;
            const y = ((i*53) % h);
            const r = 1 + (i % 3);
            return `<circle cx="${x}" cy="${y}" r="${r}"/>`;
          }).join("")}
        </g>
        <circle cx="${w*0.7}" cy="${h*0.4}" r="42" fill="none" stroke="${accent}" stroke-width="1.5"/>`;
        break;
      case "anchors":
        motif = `<g fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round">
          <path d="M${w*0.5} ${h*0.25} L${w*0.5} ${h*0.75}"/>
          <circle cx="${w*0.5}" cy="${h*0.22}" r="10"/>
          <path d="M${w*0.32} ${h*0.62} Q ${w*0.5} ${h*0.9}, ${w*0.68} ${h*0.62}"/>
          <path d="M${w*0.4} ${h*0.4} L${w*0.6} ${h*0.4}"/>
        </g>
        <g fill="${accent}"><circle cx="${w*0.5}" cy="${h*0.22}" r="3"/></g>`;
        break;
      case "geo":
        motif = `<g fill="none" stroke="${stroke}" stroke-width="1.4">
          ${Array.from({length: 6}).map((_,i)=>{
            const cx = w*0.5, cy = h*0.5, r = 30 + i*22;
            return `<polygon points="${
              Array.from({length:6}).map((_,k)=>{
                const a = (k/6)*Math.PI*2;
                return `${cx + Math.cos(a)*r},${cy + Math.sin(a)*r}`;
              }).join(" ")
            }"/>`;
          }).join("")}
        </g>`;
        break;
      default:
        motif = "";
    }
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${grad}${bg}${motif}</svg>`;
  }

  // ----------------------------------------------------------------
  // 5. View routing
  // ----------------------------------------------------------------
  function setView(name) {
    state.view = name;
    saveState();
    $$(".view").forEach(el => {
      const match = el.dataset.view === name;
      el.hidden = !match;
    });
    $$(".navlink").forEach(b => b.classList.toggle("is-active", b.dataset.view === name));
    // Scroll main into view top on small screens
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeDrawer();
    // Per-view refreshers
    if (name === "reels")      renderReels();
    if (name === "search")     renderArtistGrid();
    if (name === "saved")      renderSavedGrid();
    if (name === "booking")    fillBookingArtistOptions();
    if (name === "dashboard")  renderDashboard();
    if (name === "editor")     fillEditor();
    if (name === "admin")      renderAdmin();
    if (name === "assistant" && !chat.started) startChat();
  }

  function setRole(role, opts) {
    opts = opts || {};
    state.role = role;
    saveState();
    $$(".role-btn").forEach(b => b.classList.toggle("is-active", b.dataset.role === role));
    // Show/hide sidenav sections (skip ones without a role binding, e.g. role-switch)
    $$(".sidenav-section[data-role-section]").forEach(s => {
      s.hidden = s.dataset.roleSection !== role;
    });
    if (opts.skipView) return;
    // Switch view sensibly
    if (role === "customer") setView("reels");
    if (role === "artist")   setView("dashboard");
    if (role === "admin")    setView("admin");
  }

  // ----------------------------------------------------------------
  // 6. Artist list + filtering
  // ----------------------------------------------------------------
  function populateFilterOptions() {
    const styleSet = new Set();
    const citySet = new Set();
    state.artists.forEach(a => { a.styles.forEach(s => styleSet.add(s)); citySet.add(a.city); });
    const styleSel = $("#filterStyle");
    const citySel  = $("#filterCity");
    [...styleSet].sort().forEach(s => styleSel.insertAdjacentHTML("beforeend", `<option>${escapeHtml(s)}</option>`));
    [...citySet].sort().forEach(c => citySel.insertAdjacentHTML("beforeend", `<option>${escapeHtml(c)}</option>`));
  }

  function filterArtists() {
    const q = ($("#searchQuery").value || "").trim().toLowerCase();
    const style = $("#filterStyle").value;
    const city  = $("#filterCity").value;
    const walks = $("#filterWalkIns").checked;
    return state.artists.filter(a => {
      if (style && !a.styles.includes(style)) return false;
      if (city && a.city !== city) return false;
      if (walks && !a.acceptsWalkIns) return false;
      if (q) {
        const hay = (a.name + " " + a.shop + " " + a.styles.join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function artistCardHTML(a) {
    const isFav = state.saved.includes(a.id);
    return `
      <article class="artist-card" data-artist-id="${a.id}">
        <div class="artist-cover">${artistArt(a, 480, 300)}</div>
        <div class="artist-body">
          <div class="artist-name">${escapeHtml(a.name)}</div>
          <div class="artist-meta">
            <span>${escapeHtml(a.shop)}</span>
            <span>·</span>
            <span>${escapeHtml(a.city)}</span>
          </div>
          <div class="style-row">
            ${a.styles.slice(0,3).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
            ${a.acceptsWalkIns ? `<span class="tag walk">Walk-ins</span>` : ""}
          </div>
          <div class="card-actions">
            <button class="btn btn-ghost" data-action="open-profile" data-artist-id="${a.id}">View profile</button>
            <button class="fav-btn ${isFav ? "is-fav" : ""}" data-action="toggle-fav" data-artist-id="${a.id}" aria-pressed="${isFav}">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-7-4.35-9.5-8.5C.8 9.5 2.7 5.5 6.5 5.5c2 0 3.5 1.2 5.5 3.5 2-2.3 3.5-3.5 5.5-3.5 3.8 0 5.7 4 4 7-2.5 4.15-9.5 8.5-9.5 8.5Z"
                  fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
              </svg>
              ${isFav ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </article>`;
  }

  function renderArtistGrid() {
    const list = filterArtists();
    const grid = $("#artistGrid");
    grid.innerHTML = list.map(artistCardHTML).join("");
    $("#artistEmpty").hidden = list.length > 0;
  }

  function renderSavedGrid() {
    const list = state.artists.filter(a => state.saved.includes(a.id));
    $("#savedGrid").innerHTML = list.map(artistCardHTML).join("");
    $("#savedEmpty").hidden = list.length > 0;
  }

  function toggleFavorite(artistId) {
    const i = state.saved.indexOf(artistId);
    if (i >= 0) { state.saved.splice(i, 1); toast("Removed from saved"); }
    else { state.saved.push(artistId); toast("Saved to your shortlist"); }
    saveState();
    renderArtistGrid();
    if (state.view === "saved") renderSavedGrid();
  }

  // ----------------------------------------------------------------
  // 7. Artist profile view
  // ----------------------------------------------------------------
  let currentArtistId = null;
  function openProfile(id) {
    currentArtistId = id;
    const a = state.artists.find(x => x.id === id);
    if (!a) return;
    const isFav = state.saved.includes(a.id);
    $("#profileBody").innerHTML = `
      <div class="profile-hero">
        <div class="profile-cover">${artistArt(a, 800, 450)}</div>
        <div class="profile-side card">
          <h2>${escapeHtml(a.name)}</h2>
          <p class="muted">${escapeHtml(a.shop)} · ${escapeHtml(a.city)}</p>
          <div class="style-row">
            ${a.styles.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
            ${a.acceptsWalkIns ? `<span class="tag walk">Walk-ins</span>` : ""}
          </div>
          <p>${escapeHtml(a.bio)}</p>
          <dl class="kv">
            <dt>Rate</dt><dd>${escapeHtml(a.hourlyRate)}</dd>
            <dt>Instagram</dt><dd>${escapeHtml(a.instagram)}</dd>
          </dl>
          <div class="card-actions">
            <button class="btn btn-primary" data-action="book-this">Request booking</button>
            <button class="fav-btn ${isFav ? "is-fav" : ""}" data-action="toggle-fav" data-artist-id="${a.id}">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s-7-4.35-9.5-8.5C.8 9.5 2.7 5.5 6.5 5.5c2 0 3.5 1.2 5.5 3.5 2-2.3 3.5-3.5 5.5-3.5 3.8 0 5.7 4 4 7-2.5 4.15-9.5 8.5-9.5 8.5Z"
                  fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
              </svg>
              ${isFav ? "Saved" : "Save artist"}
            </button>
          </div>
        </div>
      </div>
      <h3 style="margin: 8px 0 8px;">Portfolio</h3>
      <div class="portfolio">
        ${Array.from({length: 6}).map((_,i)=>`<div class="portfolio-tile">${artistArt({...a, hue: (a.hue + i*15) % 360, id: a.id + "-" + i}, 300, 300)}</div>`).join("")}
      </div>
    `;
    setView("profile");
  }

  // ----------------------------------------------------------------
  // 8. Booking form
  // ----------------------------------------------------------------
  function fillBookingArtistOptions(preselect) {
    const sel = $("#bookingArtist");
    sel.innerHTML = state.artists.map(a =>
      `<option value="${a.id}">${escapeHtml(a.name)} — ${escapeHtml(a.shop)}</option>`
    ).join("");
    if (preselect) sel.value = preselect;
  }

  function submitBooking(e) {
    e.preventDefault();
    const f = e.target;
    const fd = new FormData(f);
    const lead = {
      id: uid("l"),
      artistId: fd.get("artistId"),
      customerName: fd.get("customerName"),
      customerPhone: fd.get("customerPhone"),
      tattooIdea: fd.get("tattooIdea"),
      placement: fd.get("placement"),
      size: fd.get("size"),
      budget: fd.get("budget"),
      preferredDate: fd.get("preferredDate"),
      urgency: "Standard",
      reference: fd.get("reference"),
      status: "new",
      createdAt: Date.now(),
      transcript: null,
      aiSummary: "Customer submitted request via web form."
    };
    if (!lead.customerName || !lead.customerPhone || !lead.tattooIdea) {
      const msg = $("#bookingMsg");
      msg.hidden = false;
      msg.style.background = "rgba(196,106,106,.14)";
      msg.style.color = "#e3a4a4";
      msg.style.borderColor = "rgba(196,106,106,.32)";
      msg.textContent = "Please fill in your name, phone, and tattoo idea.";
      return;
    }
    state.leads.unshift(lead);
    saveState();
    f.reset();
    const msg = $("#bookingMsg");
    msg.hidden = false;
    msg.style.background = "";
    msg.style.color = "";
    msg.style.borderColor = "";
    msg.textContent = "Request sent. The artist will follow up by phone or text.";
    toast("Request sent");
  }

  // ----------------------------------------------------------------
  // 9. AI Assistant (mock state machine)
  // ----------------------------------------------------------------
  const CHAT_STEPS = [
    { key: "customerName",  prompt: "Hi, I'm the InkedN assistant. I can collect your tattoo idea and send it to the artist. What's your name?" },
    { key: "customerPhone", prompt: "Thanks, {customerName}. What's the best phone number to reach you?" },
    { key: "artistName",    prompt: "Got it. Do you have a preferred InkedN artist? You can type a name or just say 'no preference'." },
    { key: "tattooIdea",    prompt: "Tell me about your tattoo idea — subject, vibe, anything important." },
    { key: "placement",     prompt: "Where on the body would you like it (forearm, ribcage, etc.)?" },
    { key: "size",          prompt: "Roughly how big? E.g. palm-sized, 4 inches, half-sleeve." },
    { key: "budget",        prompt: "What's a comfortable budget range? Artists set final price." },
    { key: "preferredDate", prompt: "Any preferred date or time window?" },
    { key: "urgency",       prompt: "How urgent is this — soon, flexible, or specific event?" },
    { key: "reference",     prompt: "Any reference image link to share? Type 'skip' if not." }
  ];

  const chat = {
    started: false,
    step: 0,
    data: {},
    messages: []
  };

  function startChat(resume) {
    chat.started = true;
    if (!resume) {
      chat.step = 0;
      chat.data = {};
      chat.messages = [];
    }
    $("#handoffWrap").hidden = true;
    $("#chatLog").innerHTML = "";
    addBotMsg(CHAT_STEPS[0].prompt);
  }

  function addBotMsg(text) {
    chat.messages.push({ sender: "ai", text });
    const log = $("#chatLog");
    log.insertAdjacentHTML("beforeend",
      `<div class="chat-bubble bot"><strong>InkedN assistant</strong><p>${escapeHtml(text)}</p></div>`);
    log.scrollTop = log.scrollHeight;
  }
  function addUserMsg(text) {
    chat.messages.push({ sender: "user", text });
    const log = $("#chatLog");
    log.insertAdjacentHTML("beforeend",
      `<div class="chat-bubble user"><p>${escapeHtml(text)}</p></div>`);
    log.scrollTop = log.scrollHeight;
  }

  function handleChatSubmit(e) {
    e.preventDefault();
    const input = $("#chatInput");
    const val = input.value.trim();
    if (!val) return;
    addUserMsg(val);
    input.value = "";

    if (chat.step < CHAT_STEPS.length) {
      const step = CHAT_STEPS[chat.step];
      chat.data[step.key] = val;
      chat.step++;
      setTimeout(() => {
        if (chat.step < CHAT_STEPS.length) {
          const next = CHAT_STEPS[chat.step];
          const text = next.prompt.replace(/\{(\w+)\}/g, (_, k) => chat.data[k] || "");
          addBotMsg(text);
        } else {
          addBotMsg("Thanks — I have everything. I'll generate a handoff summary for the artist now.");
          generateHandoff(true);
        }
      }, 380);
    } else {
      setTimeout(() => addBotMsg("All set. You can tap 'Generate handoff' to send this to the artist, or 'Restart' to start over."), 280);
    }
  }

  function generateHandoff(autoCreated) {
    const d = chat.data;
    // Match artist by typed name (loose) or default to first
    let artist = state.artists.find(a => d.artistName && a.name.toLowerCase().includes((d.artistName || "").toLowerCase()))
              || state.artists[0];
    const lead = {
      id: uid("l"),
      artistId: artist.id,
      customerName: d.customerName || "Anonymous",
      customerPhone: d.customerPhone || "—",
      tattooIdea: d.tattooIdea || "—",
      placement: d.placement || "—",
      size: d.size || "—",
      budget: d.budget || "—",
      preferredDate: d.preferredDate || "—",
      urgency: d.urgency || "—",
      reference: (d.reference && d.reference.toLowerCase() !== "skip") ? d.reference : "",
      status: "new",
      createdAt: Date.now(),
      transcript: chat.messages.slice(),
      aiSummary: synthSummary(d)
    };

    const summary =
`New InkedN Lead

Customer: ${lead.customerName}
Phone: ${lead.customerPhone}
Preferred artist: ${artist.name} (${artist.shop})
Tattoo idea: ${lead.tattooIdea}
Placement: ${lead.placement}
Size: ${lead.size}
Budget: ${lead.budget}
Preferred date: ${lead.preferredDate}
Urgency: ${lead.urgency}
Notes: ${lead.reference ? "Reference: " + lead.reference : "—"}

AI summary:
${lead.aiSummary}

Recommended next step:
Reach out within 24 hours by text to confirm details and propose a consult.`;

    $("#handoffOut").textContent = summary;
    $("#handoffWrap").hidden = false;
    // Stash a pending lead for "Send to artist" click
    chat.pendingLead = lead;
    if (!autoCreated) toast("Handoff generated");
  }

  function synthSummary(d) {
    const bits = [];
    if (d.tattooIdea) bits.push(`Wants ${d.tattooIdea.toLowerCase()}.`);
    if (d.placement)  bits.push(`Placement: ${d.placement}.`);
    if (d.size)       bits.push(`Size: ${d.size}.`);
    if (d.budget)     bits.push(`Budget ${d.budget}.`);
    if (d.urgency)    bits.push(`Timeline: ${d.urgency}.`);
    return bits.join(" ") || "Customer chatted with the assistant.";
  }

  function sendHandoffToArtist() {
    if (!chat.pendingLead) return;
    state.leads.unshift(chat.pendingLead);
    saveState();
    toast("Lead sent to artist dashboard");
    chat.pendingLead = null;
    $("#handoffWrap").hidden = true;
  }

  // ----------------------------------------------------------------
  // 10. Artist dashboard + lead detail
  // ----------------------------------------------------------------
  let leadFilter = "all";

  function leadsForArtist() {
    return state.leads.filter(l => l.artistId === state.artistMe);
  }

  function renderDashboard() {
    const leads = leadsForArtist();
    const counts = { new: 0, contacted: 0, booked: 0, closed: 0 };
    leads.forEach(l => { counts[l.status] = (counts[l.status] || 0) + 1; });
    $("#statNew").textContent = counts.new;
    $("#statContacted").textContent = counts.contacted;
    $("#statBooked").textContent = counts.booked;
    $("#statClosed").textContent = counts.closed;

    const filtered = leadFilter === "all" ? leads : leads.filter(l => l.status === leadFilter);
    $("#leadList").innerHTML = filtered.map(leadRowHTML).join("");
    $("#leadEmpty").hidden = filtered.length > 0;
    $$(".seg-btn").forEach(b => b.classList.toggle("is-active", b.dataset.leadFilter === leadFilter));
  }

  function leadRowHTML(l) {
    return `
      <div class="lead-row" data-action="open-lead" data-lead-id="${l.id}">
        <div>
          <div class="lead-top">
            <span class="lead-name">${escapeHtml(l.customerName)}</span>
            <span class="badge ${l.status}">${l.status}</span>
            <span class="muted small">· ${formatTimeAgo(l.createdAt)}</span>
          </div>
          <div class="lead-idea">${escapeHtml(l.tattooIdea)}</div>
          <div class="lead-sub">${escapeHtml(l.placement || "—")} · ${escapeHtml(l.budget || "—")} · ${escapeHtml(l.preferredDate || "—")}</div>
        </div>
        <div>
          <span class="muted small">→</span>
        </div>
      </div>`;
  }

  function openLead(id) {
    const l = state.leads.find(x => x.id === id);
    if (!l) return;
    const a = state.artists.find(x => x.id === l.artistId);
    $("#leadDetail").innerHTML = `
      <div class="view-head">
        <h2>${escapeHtml(l.customerName)} <span class="badge ${l.status}" style="font-size:.75rem; vertical-align: middle;">${l.status}</span></h2>
        <p class="muted">${formatTimeAgo(l.createdAt)} · for ${escapeHtml(a ? a.name : "—")}</p>
      </div>
      <div class="lead-detail-grid">
        <div class="card">
          <h3>Lead summary</h3>
          <dl class="kv">
            <dt>Phone</dt><dd>${escapeHtml(l.customerPhone)}</dd>
            <dt>Tattoo idea</dt><dd>${escapeHtml(l.tattooIdea)}</dd>
            <dt>Placement</dt><dd>${escapeHtml(l.placement)}</dd>
            <dt>Size</dt><dd>${escapeHtml(l.size)}</dd>
            <dt>Budget</dt><dd>${escapeHtml(l.budget)}</dd>
            <dt>Preferred date</dt><dd>${escapeHtml(l.preferredDate)}</dd>
            <dt>Urgency</dt><dd>${escapeHtml(l.urgency)}</dd>
            <dt>Reference</dt><dd>${l.reference ? `<a href="${escapeHtml(l.reference)}" target="_blank" rel="noopener">${escapeHtml(l.reference)}</a>` : "—"}</dd>
          </dl>
          <p style="margin-top: 12px;"><strong>AI summary:</strong> ${escapeHtml(l.aiSummary)}</p>
          <div class="status-actions">
            <button class="chip" data-action="status" data-status="new" data-lead-id="${l.id}">Mark new</button>
            <button class="chip" data-action="status" data-status="contacted" data-lead-id="${l.id}">Mark contacted</button>
            <button class="chip" data-action="status" data-status="booked" data-lead-id="${l.id}">Mark booked</button>
            <button class="chip" data-action="status" data-status="closed" data-lead-id="${l.id}">Close lead</button>
          </div>
        </div>
        <div class="card">
          <h3>Conversation</h3>
          ${l.transcript && l.transcript.length
            ? l.transcript.map(m => m.sender === "ai"
                ? `<div class="chat-bubble bot"><strong>InkedN assistant</strong><p>${escapeHtml(m.text)}</p></div>`
                : `<div class="chat-bubble user"><p>${escapeHtml(m.text)}</p></div>`
              ).join("")
            : `<p class="muted">No assistant conversation — this lead came through the booking form.</p>`}
        </div>
      </div>
    `;
    setView("lead");
  }

  function updateLeadStatus(id, status) {
    const l = state.leads.find(x => x.id === id);
    if (!l) return;
    l.status = status;
    saveState();
    toast(`Lead marked ${status}`);
    openLead(id); // re-render
  }

  // ----------------------------------------------------------------
  // 11. Artist profile editor
  // ----------------------------------------------------------------
  function fillEditor() {
    const a = state.artists.find(x => x.id === state.artistMe);
    if (!a) return;
    const f = $("#editorForm");
    f.name.value = a.name;
    f.shop.value = a.shop;
    f.city.value = a.city;
    f.hourlyRate.value = a.hourlyRate;
    f.instagram.value = a.instagram;
    f.styles.value = a.styles.join(", ");
    f.bio.value = a.bio;
    f.acceptsWalkIns.checked = !!a.acceptsWalkIns;
  }

  function submitEditor(e) {
    e.preventDefault();
    const a = state.artists.find(x => x.id === state.artistMe);
    if (!a) return;
    const f = e.target;
    a.name = f.name.value.trim();
    a.shop = f.shop.value.trim();
    a.city = f.city.value.trim();
    a.hourlyRate = f.hourlyRate.value.trim();
    a.instagram = f.instagram.value.trim();
    a.styles = f.styles.value.split(",").map(s => s.trim()).filter(Boolean);
    a.bio = f.bio.value.trim();
    a.acceptsWalkIns = !!f.acceptsWalkIns.checked;
    saveState();
    $("#editorMsg").textContent = "Saved";
    toast("Profile updated");
    setTimeout(() => { $("#editorMsg").textContent = ""; }, 1800);
  }

  // ----------------------------------------------------------------
  // 11b. Reels feed
  // ----------------------------------------------------------------
  function reelCardHTML(r) {
    const a = state.artists.find(x => x.id === r.artistId);
    if (!a) return "";
    const liked = state.reelLikes.includes(r.id);
    const following = state.following.includes(a.id);
    const saved = state.saved.includes(a.id);
    // Reuse the skeleton's generated SVG art with a hue shift per reel.
    const tinted = { ...a, hue: (a.hue + (r.hueShift || 0)) % 360, id: a.id + "-" + r.id };
    return `
      <article class="reel-card" data-reel-id="${r.id}" data-artist-id="${a.id}">
        <div class="reel-media">${artistArt(tinted, 720, 900)}</div>
        <div class="reel-meta">
          <div class="reel-info">
            <span class="reel-artist">${escapeHtml(a.name)}</span>
            <span class="muted small">${escapeHtml(a.shop)} · ${escapeHtml(a.city)}</span>
            <p class="reel-caption">${escapeHtml(r.caption)}</p>
            <div class="reel-meta-row">
              ${a.styles.slice(0,2).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
              ${a.acceptsWalkIns ? `<span class="tag walk">Walk-ins</span>` : ""}
            </div>
          </div>
          <div class="reel-actions">
            <div>
              <button class="reel-btn ${liked ? "is-active" : ""}" data-action="reel-like" data-reel-id="${r.id}" aria-pressed="${liked}" aria-label="Like">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21s-7-4.35-9.5-8.5C.8 9.5 2.7 5.5 6.5 5.5c2 0 3.5 1.2 5.5 3.5 2-2.3 3.5-3.5 5.5-3.5 3.8 0 5.7 4 4 7-2.5 4.15-9.5 8.5-9.5 8.5Z"
                    fill="${liked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                </svg>
              </button>
              <span class="reel-count">${(r.likes || 0) + (liked ? 1 : 0)}</span>
            </div>
            <div>
              <button class="reel-btn ${following ? "is-active" : ""}" data-action="reel-follow" data-artist-id="${a.id}" aria-pressed="${following}" aria-label="${following ? "Following" : "Follow"}">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </button>
              <span class="reel-count">${following ? "Following" : "Follow"}</span>
            </div>
            <div>
              <button class="reel-btn ${saved ? "is-active" : ""}" data-action="toggle-fav" data-artist-id="${a.id}" aria-pressed="${saved}" aria-label="Save artist">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 3h12v18l-6-4-6 4Z" fill="${saved ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                </svg>
              </button>
              <span class="reel-count">${saved ? "Saved" : "Save"}</span>
            </div>
            <button class="reel-btn book" data-action="reel-book" data-artist-id="${a.id}" type="button">Book</button>
            <button class="reel-btn" data-action="open-profile" data-artist-id="${a.id}" aria-label="View artist profile">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </article>`;
  }

  function renderReels() {
    const feed = $("#reelsFeed");
    if (!feed) return;
    const list = state.reels || [];
    feed.innerHTML = list.map(reelCardHTML).join("");
    $("#reelsEmpty").hidden = list.length > 0;
  }

  function toggleReelLike(id) {
    const i = state.reelLikes.indexOf(id);
    if (i >= 0) state.reelLikes.splice(i, 1);
    else state.reelLikes.push(id);
    saveState();
    renderReels();
  }

  function toggleFollow(artistId) {
    const i = state.following.indexOf(artistId);
    if (i >= 0) { state.following.splice(i, 1); toast("Unfollowed"); }
    else { state.following.push(artistId); toast("Following"); }
    saveState();
    renderReels();
  }

  function bookFromReel(artistId) {
    fillBookingArtistOptions(artistId);
    setView("booking");
  }

  // ----------------------------------------------------------------
  // 11c. Onboarding gate
  // ----------------------------------------------------------------
  function showOnboarding() {
    document.body.classList.add("is-onboarding");
    const el = $("#onboarding");
    if (el) el.hidden = false;
  }
  function hideOnboarding() {
    document.body.classList.remove("is-onboarding");
    const el = $("#onboarding");
    if (el) el.hidden = true;
  }
  function completeOnboarding(role) {
    state.onboarded = true;
    saveState();
    hideOnboarding();
    setRole(role);
  }
  function resetOnboarding() {
    state.onboarded = false;
    saveState();
    showOnboarding();
  }

  // ----------------------------------------------------------------
  // 12. Admin
  // ----------------------------------------------------------------
  function renderAdmin() {
    const totalLeads = state.leads.length;
    const booked = state.leads.filter(l => l.status === "booked").length;
    const conv = totalLeads ? Math.round((booked / totalLeads) * 100) : 0;
    $("#adminArtists").textContent = state.artists.length;
    $("#adminLeads").textContent = totalLeads;
    $("#adminBookings").textContent = booked;
    $("#adminConv").textContent = conv + "%";

    const recent = state.leads.slice(0, 6);
    $("#adminLeadList").innerHTML = recent.map(leadRowHTML).join("") ||
      `<p class="muted">No leads yet.</p>`;
    $("#adminArtistList").innerHTML = state.artists.map(a => `
      <div class="admin-artist-row">
        <div>
          <div><strong>${escapeHtml(a.name)}</strong></div>
          <div class="muted">${escapeHtml(a.shop)} · ${escapeHtml(a.city)}</div>
        </div>
        <span class="tag">${a.styles[0] || "—"}</span>
      </div>
    `).join("");
  }

  // ----------------------------------------------------------------
  // 13. Mobile drawer
  // ----------------------------------------------------------------
  function openDrawer() {
    $("#sidenav").classList.add("is-open");
    $("#scrim").hidden = false;
    $("#menuBtn").setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    $("#sidenav").classList.remove("is-open");
    $("#scrim").hidden = true;
    $("#menuBtn").setAttribute("aria-expanded", "false");
  }

  // ----------------------------------------------------------------
  // 14. Event wiring
  // ----------------------------------------------------------------
  function wireEvents() {
    // Role buttons
    $$(".role-btn").forEach(b => b.addEventListener("click", () => setRole(b.dataset.role)));

    // Sidenav links + any element with data-view.
    // Only treat buttons / links as nav triggers — never the <section class="view">
    // containers themselves (those also carry data-view to mark the screen).
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-action]");
      if (a) {
        const action = a.dataset.action;
        if (action === "open-profile") { openProfile(a.dataset.artistId); return; }
        if (action === "toggle-fav")   { toggleFavorite(a.dataset.artistId); return; }
        if (action === "book-this")    { fillBookingArtistOptions(currentArtistId); setView("booking"); return; }
        if (action === "open-lead")    { openLead(a.dataset.leadId); return; }
        if (action === "status")       { updateLeadStatus(a.dataset.leadId, a.dataset.status); return; }
      }

      const v = e.target.closest("button[data-view], a[data-view]");
      if (v && v.dataset.view) { setView(v.dataset.view); return; }

      // (left intentionally empty; the dispatcher above handles all data-action cases)
      const _unused = e.target.closest("[data-action]");
      if (!_unused) return;
    });

    // Filters
    ["#searchQuery", "#filterStyle", "#filterCity", "#filterWalkIns"].forEach(sel => {
      const el = $(sel);
      el.addEventListener("input", renderArtistGrid);
      el.addEventListener("change", renderArtistGrid);
    });

    // Booking form
    $("#bookingForm").addEventListener("submit", submitBooking);

    // Chat
    $("#chatForm").addEventListener("submit", handleChatSubmit);
    $("#chatRestart").addEventListener("click", () => startChat());
    $("#chatHandoff").addEventListener("click", () => generateHandoff(false));
    $("#handoffSend").addEventListener("click", sendHandoffToArtist);

    // Lead filter segmented control
    $$(".seg-btn").forEach(b => b.addEventListener("click", () => {
      leadFilter = b.dataset.leadFilter;
      renderDashboard();
    }));

    // Editor form
    $("#editorForm").addEventListener("submit", submitEditor);

    // Mobile drawer
    $("#menuBtn").addEventListener("click", () => {
      if ($("#sidenav").classList.contains("is-open")) closeDrawer();
      else openDrawer();
    });
    $("#scrim").addEventListener("click", closeDrawer);

    // Onboarding role-choice buttons
    $$(".onboarding-choice").forEach(b => {
      b.addEventListener("click", () => completeOnboarding(b.dataset.onboardRole));
    });
    const resetBtn = $("#resetOnbBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetOnboarding);

    // Reels-specific actions (the global dispatcher already handles open-profile / toggle-fav)
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-action]");
      if (!a) return;
      const act = a.dataset.action;
      if (act === "reel-like")   { toggleReelLike(a.dataset.reelId); }
      else if (act === "reel-follow") { toggleFollow(a.dataset.artistId); }
      else if (act === "reel-book")   { bookFromReel(a.dataset.artistId); }
    });
  }

  // ----------------------------------------------------------------
  // 15. Init
  // ----------------------------------------------------------------
  async function init() {
    await initFirebase();
    populateFilterOptions();
    wireEvents();

    if (!state.onboarded) {
      // Onboard first; the role/view is set when the user picks.
      showOnboarding();
      // Still set role section visibility so the app is ready when the user dismisses.
      setRole(state.role || "customer", { skipView: true });
      setView("reels"); // pre-render the feed so it's instantly visible after onboarding
      return;
    }

    setRole(state.role || "customer", { skipView: true });
    // Honor stored view if appropriate for role
    setView(state.view || (state.role === "artist" ? "dashboard"
                          : state.role === "admin" ? "admin"
                          : "reels"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
