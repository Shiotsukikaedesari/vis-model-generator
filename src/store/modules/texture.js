import Vue from "vue";

import { TextureDataSupport, MODULETYPE } from "vis-three";

export const textureDataSupport = new TextureDataSupport(Vue.observable({}));

export const module = {
  namespaced: true,
  state: {
    map: textureDataSupport.getData(),
    module: MODULETYPE.TEXTURE,
    currentTexture: "",
  },
  getters: {
    get(state) {
      return state.map;
    },
    currentTexture(state) {
      return state.currentTexture;
    },
  },
  mutations: {
    add(state, config) {
      const observeObject = Vue.observable(config);
      state.map[observeObject.vid] = observeObject;
      state.map.__ob__.dep.notify();
      this.commit("texture/setCurrentTexture", config.vid);
    },

    notify(state) {
      state.map.__ob__.dep.notify();
    },

    setCurrentTexture(state, vid) {
      state.currentTexture = state.map[vid];
    },

    remove(state, vid) {
      delete state.map[vid];
      this.commit("attribute/remove", vid);
    },

    change(state, { path = [], key, value }) {
      let temp = state.map;
      path.forEach((elem) => {
        temp = temp[elem];
      });
      temp[key] = value;
    },
  },
  actions: {},
};
