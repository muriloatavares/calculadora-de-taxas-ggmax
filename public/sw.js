// Service Worker - Calculadora de Taxas GGMAX PWA
const CACHE_NAME = "ggmax-calc-v1.0.0";
const STATIC_ASSETS = [
  "/",
  "/favicon.ico",
  "/manifest.webmanifest",
  "/icons/favicon.png",
  "/icons/icon-512.png",
  "/images/logo.png"
];

// Instalação do Service Worker e pré-cache de arquivos essenciais
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Estratégia Network-First com Fallback para Cache (Ideal para PWA moderna)
self.addEventListener("fetch", (event) => {
  // Ignora requisições que não sejam GET ou de esquemas não suportados (ex: chrome-extension)
  if (event.request.method !== "GET" || !event.request.url.startsWith("http")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a resposta for válida, clonamos e salvamos no cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Em caso de falha de rede (offline), busca no cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Se for uma navegação de página e falhar, retorna a página inicial em cache
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Offline", { status: 503, statusText: "Offline" });
        });
      })
  );
});
