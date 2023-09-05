const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 此处开启 https

  devServer: {

    proxy: {
      '/api': {
        target: 'http://192.168.2.163:8888/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 此处开启 https
    https: false,

  },


})
