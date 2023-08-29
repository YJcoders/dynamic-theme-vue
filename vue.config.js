const path = require("path");
const { defineConfig } = require("@vue/cli-service");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  configureWebpack: {
    plugins: [],
  },
  transpileDependencies: true,

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
