const path = require("path");
const configureWebpack = require("./utils/configureWebpack");

module.exports = {
  runtimeCompiler: true,
  publicPath: "./",
  productionSourceMap: process.env.NODE_ENV !== "production",
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/less/common.less")],
    },
  },
  configureWebpack,
};
