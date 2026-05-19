/* ================================================================
   InkedN — Firebase config example
   ----------------------------------------------------------------
   Copy this file to `firebase-config.js` and replace the values
   below with your own Firebase project credentials (Project
   settings → Your apps → Web app config).

   The included "InkGang Worldwide" redesign was originally built
   against the Firebase project below. You can reuse it for a quick
   demo, but for any production / multi-user deployment you should
   create a fresh project and lock down the Realtime Database rules.

   `app.js` reads `window.__INKEDN_FIREBASE_CONFIG__`. If `apiKey`
   is missing or still set to `YOUR_API_KEY`, the app silently falls
   back to its in-memory / browser-storage demo store.

   Data shape used in the Realtime Database:
     /artists/{artistId}  ->  artist record (see SEED_ARTISTS in app.js)
     /reels/{reelId}      ->  reel record   (see SEED_REELS   in app.js)
     /leads/{leadId}      ->  booking lead  (see SEED_LEADS   in app.js)
     /follows/{userId}    ->  { [artistId]: true }
     /likes/{userId}      ->  { [reelId]: true }
   ================================================================ */

window.__INKEDN_FIREBASE_CONFIG__ = {
  apiKey:            "AIzaSy-REPLACE-WITH-YOUR-OWN-KEY",
  authDomain:        "your-project.firebaseapp.com",
  databaseURL:       "https://your-project-default-rtdb.firebaseio.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "0000000000",
  appId:             "1:0000000000:web:xxxxxxxxxxxxxxxx",
  measurementId:     "G-XXXXXXXXXX"
};
