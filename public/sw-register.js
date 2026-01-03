/**
 * Service Worker 注册脚本
 * 在 app/layout.tsx 中引入此脚本
 */

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker 注册成功:', registration);
        
        // 检查更新
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 新的 Service Worker 已安装且旧的仍在控制页面
              console.log('新版本可用，请刷新页面');
              // 可以显示更新提示
              window.dispatchEvent(new Event('sw-updated'));
            }
          });
        });
      })
      .catch((error) => {
        console.error('Service Worker 注册失败:', error);
      });
  });
}
