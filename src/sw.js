// Service Worker for 3D Cuboid App
// Version: 2.0
// 实现离线缓存和快速加载

const CACHE_NAME = '3d-cuboid-v2.0';
const urlsToCache = [
  './',
  './index.html',
  './css/all.min.css',
  './js/three.min.js',
  './js/OrbitControls.min.js',
  './webfonts/fa-solid-900.woff2',
  './webfonts/fa-regular-400.woff2',
  './webfonts/fa-brands-400.woff2',
  './manifest.json'
];

// 安装 Service Worker 并缓存资源
self.addEventListener('install', event => {
  console.log('[Service Worker] 正在安装...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] 正在缓存所有文件');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] 安装完成');
        return self.skipWaiting(); // 立即激活
      })
      .catch(err => {
        console.error('[Service Worker] 缓存失败:', err);
      })
  );
});

// 激活 Service Worker 并清理旧缓存
self.addEventListener('activate', event => {
  console.log('[Service Worker] 正在激活...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] 激活完成');
      return self.clients.claim(); // 立即控制所有页面
    })
  );
});

// 拦截网络请求，优先使用缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有，直接返回缓存
        if (response) {
          console.log('[Service Worker] 从缓存加载:', event.request.url);
          return response;
        }
        
        // 如果缓存中没有，从网络获取
        console.log('[Service Worker] 从网络加载:', event.request.url);
        return fetch(event.request).then(response => {
          // 检查是否是有效响应
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // 克隆响应并缓存
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        }).catch(err => {
          console.error('[Service Worker] 网络请求失败:', err);
          // 可以返回一个默认的离线页面
          return new Response('离线模式：无法加载资源', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// 监听消息事件（用于强制更新缓存）
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => {
        return self.clients.claim();
      })
    );
  }
});

// 后台同步（可选功能）
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('[Service Worker] 后台同步');
    event.waitUntil(
      // 这里可以添加后台同步逻辑
      Promise.resolve()
    );
  }
});

console.log('[Service Worker] 已加载');
