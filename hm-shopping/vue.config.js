// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      // 本地 mock 的接口走 json-server
      '/api/mock': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api/mock': '' }
      },
      // 其余 /api 直接转发到黑马后端（支持 PATHINFO 路由）
      '/api': {
        target: 'https://smart-shop.itheima.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/index.php?s=/api'
        }
      }
    }
  }
})