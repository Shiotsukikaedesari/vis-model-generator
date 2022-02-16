import Vue from "vue";
import { ModelDataSupport, MODULETYPE } from "vis-three";

export const modelDataSupport = new ModelDataSupport(Vue.observable({}));

export const module = {
  namespaced: true,
  state: {
    map: modelDataSupport.getData(),
    module: MODULETYPE.MODEL,
    currentModel: "", // 当前物体
  },
  getters: {
    get(state) {
      return state.map;
    },
  },
  mutations: {
    add(state, config) {
      const observeObject = Vue.observable(config);
      state.map[observeObject.vid] = observeObject;
      state.map.__ob__.dep.notify();
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
