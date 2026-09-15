const CACHE_NAME = 'ype-prospero-v2'; // Mude o 'v1' para 'v2', 'v3' quando quiser forçar uma atualização grande

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Força o app a aceitar a nova versão imediatamente
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Apaga caches velhos para não acumular lixo
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepta as requisições para garantir que sempre busque a versão mais atualizada online
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
