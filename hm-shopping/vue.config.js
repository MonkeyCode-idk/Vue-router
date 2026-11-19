// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
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