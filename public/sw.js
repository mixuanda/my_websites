/**
 * Service Worker 
 * 支持离线功能和推送通知
 */

const CACHE_NAME = 'my-site-v1';
const urlsToCache = [
  '/',
  '/offline.html',
  '/styles.css',
  '/app.js',
];

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
  // 只处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  // 跳过非 HTTP(S) 请求
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 如果响应成功，缓存它
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // 克隆响应
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
