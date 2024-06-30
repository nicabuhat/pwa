const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/pwa/' : '/',
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://nicabuhat.github.io/pwa/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'my-pwa-cache-v1',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
            }
          }
        }
      ]
    }
  }
});
