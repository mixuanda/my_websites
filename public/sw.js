/**
 * Service Worker 
 * 支持离线功能和推送通知
 */

const CACHE_NAME = 'my-site-v2';
const urlsToCache = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

const PRIVATE_PATH_PATTERNS = [
  /^\/api(?:\/|$)/,
  /^\/admin(?:\/|$)/,
  /^\/diary(?:\/|$)/,
  /^\/login(?:\/|$)/,
  /^\/private(?:\/|$)/,
  /^\/settings(?:\/|$)/,
  /^\/(?:en|zh-hk|zh-cn)\/premium(?:\/|$)/,
  /^\/premium(?:\/|$)/,
];

const STATIC_CACHEABLE_PATH_PATTERNS = [
  /^\/$/,
  /^\/offline\.html$/,
  /^\/manifest\.json$/,
  /^\/icon-[\w-]+\.png$/,
  /^\/_next\/static\//,
  /^\/fonts\//,
  /^\/.*\.(?:css|js|png|jpg|jpeg|webp|gif|svg|ico|woff2?)$/,
];

function isPrivatePath(pathname) {
  return PRIVATE_PATH_PATTERNS.some((pattern) => pattern.test(pathname));
}

function isStaticCacheablePath(pathname) {
  return STATIC_CACHEABLE_PATH_PATTERNS.some((pattern) => pattern.test(pathname));
}

function shouldCacheRequest(request) {
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return false;
  }

  if (request.method !== 'GET' || isPrivatePath(url.pathname)) {
    return false;
  }

  return isStaticCacheablePath(url.pathname);
}

function shouldCacheResponse(response) {
  if (!response || response.status !== 200 || response.type === 'error') {
    return false;
  }

  const cacheControl = response.headers.get('Cache-Control') || '';
  return !/(?:^|,)\s*(?:no-store|private)\b/i.test(cacheControl);
}

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch 事件 - 离线支持（网络优先策略）
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http') || !shouldCacheRequest(event.request)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!shouldCacheResponse(response)) {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // 网络请求失败时，从缓存返回
        return caches.match(event.request).then((response) => {
          return response || new Response('离线 - 内容不可用', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          });
        });
      })
  );
});

// 推送通知事件
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const options = {
    body: event.data.text(),
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'notification',
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification('新消息', options)
  );
});

// 点击通知事件
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // 查找已打开的窗口
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // 如果没有窗口打开，则打开新窗口
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
