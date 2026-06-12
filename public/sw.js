// GOAT Mode service worker — lessons, quizzes, and cram sheets work offline.
const CACHE = "goat-v1";

const ROUTES = [
  "/",
  "/flashcards",
  "/practice",
  "/cram/kat",
  "/cram/cam",
  "/exam/kat",
  "/exam/cam",
  "/module/m1", "/module/m1/quiz",
  "/module/m2", "/module/m2/quiz",
  "/module/m3", "/module/m3/quiz",
  "/module/m4", "/module/m4/quiz",
  "/module/m5", "/module/m5/quiz",
  "/module/m6", "/module/m6/quiz",
  "/module/m7", "/module/m7/quiz",
  "/module/m8", "/module/m8/quiz",
  "/module/m9", "/module/m9/quiz",
  "/module/m10", "/module/m10/quiz",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ROUTES))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  // Network-first with cache fallback; cache keyed by full URL so HTML
  // navigations and RSC payloads never collide.
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      try {
        const fresh = await fetch(request);
        if (fresh.ok) cache.put(request, fresh.clone());
        return fresh;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          const page = await cache.match(url.pathname);
          if (page) return page;
          const home = await cache.match("/");
          if (home) return home;
        }
        return Response.error();
      }
    })
  );
});
