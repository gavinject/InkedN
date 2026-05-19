/* ================================================================
   InkedN — Firebase config (runtime placeholder)
   ----------------------------------------------------------------
   This file is intentionally a placeholder. The app detects the
   `YOUR_API_KEY` value below and falls back to demo data in memory /
   browser storage, so the prototype is fully usable without a real
   Firebase project.

   To connect a real Firebase Realtime Database:
   1. Copy `firebase-config.example.js` over this file, or fill in
      the values below.
   2. Reload the page. The init log in the browser console will say
      "[InkedN] Firebase initialised: <projectId>".

   For local-only secrets you may also load this from a `.env`-style
   file via a separate build step; see `.env.example`.
   ================================================================ */

window.__INKEDN_FIREBASE_CONFIG__ = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "your-project.firebaseapp.com",
  databaseURL:       "https://your-project-default-rtdb.firebaseio.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "0000000000",
  appId:             "1:0000000000:web:xxxxxxxxxxxxxxxx",
  measurementId:     "G-XXXXXXXXXX"
};
