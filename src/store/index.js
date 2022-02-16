import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const context = require.context("./", true, /\.js$/);

const modules = {};

context.keys().forEach((url) => {
  if (url !== "./index.js") {
    modules[
      url
        .split("/")
        .pop()
        .replace(/.\/|\.js$/g, "")
    ] = context(url).module;
  }
});

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules,
});
