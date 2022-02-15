const path = require("path");

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
};
