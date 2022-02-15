import Vue from "vue";

import { TextureDataSupport, MODULETYPE } from "vis-three";

export const textureDataSupport = new TextureDataSupport(Vue.observable({}));

export const module = {
  namespaced: true,
  state: {
    map: textureDataSupport.getData(),
    module: MODULETYPE.TEXTURE,
  },
  getters: {
    get(state) {
      return state.map;
    },
  },
  mutations: {
    add(state, config) {
      const vid = config.vid;
      const name = config.name;

      delete config.name;

      const observeObject = Vue.observable(config);
      state.map[vid] = observeObject;
      state.map.__ob__.dep.notify();

      this.commit("attribute/add", {
        vid,
        config: state.map[vid],
        module: state.module,
        name,
        icon: "",
      });
      this.commit("activeConfig/setTexture", vid);
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
