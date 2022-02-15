import Vue from "vue";
import { ModelDataSupport, MODULETYPE } from "vis-three";

export const modelDataSupport = new ModelDataSupport(Vue.observable({}));

export const module = {
  namespaced: true,
  state: {
    map: modelDataSupport.getData(),
    module: MODULETYPE.MODEL,
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
      const icon = config.icon;

      delete config.name;
      delete config.icon;

      const observeObject = Vue.observable(config);
      state.map[vid] = observeObject;
      state.map.__ob__.dep.notify();

      this.commit("attribute/add", {
        vid,
        config: state.map[vid],
        module: state.module,
        name,
        icon,
      });
    },

    remove(state, vid) {
      delete state.map[vid];
    },

    change(state, { path = [], key, value }) {
      let temp = state.map;
      path.forEach((elem) => {
        temp = temp[elem];
      });
      temp[key] = value;
    },

    setMaterial(state, { vid, value }) {
      if (!state.map[vid]) {
        console.warn("can not found vid in model");
        return false;
      }

      state.map[vid].material = value;
    },
  },
  actions: {},
};
