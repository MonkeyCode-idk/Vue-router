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
      // 其余 /api 继续走黑马
      '/api': {
        target: 'http://smart-shop.itheima.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/index.php?s=/api'
        }
      }
    }
  }
})