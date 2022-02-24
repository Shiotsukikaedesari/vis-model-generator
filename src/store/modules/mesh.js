import Vue from "vue";
import { MeshDataSupport, MODULETYPE } from "vis-three";

export const meshDataSupport = new MeshDataSupport(Vue.observable({}));

export const module = {
  namespaced: true,
  state: {
    map: meshDataSupport.getData(),
    module: MODULETYPE.MESH,
    currentModel: "", // 当前物体
  },
  getters: {
    get(state) {
      return state.map;
    },
    currentModel(state) {
      return state.currentModel;
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
        console.warn(`can not found vid in model: ${vid}`);
        return false;
      }

      state.map[vid].material = value;
    },

    setCurrentModel(state, vid) {
      state.currentModel = state.map[vid];

      if (state.currentModel) {
        this.commit("geometry/setCurrentGeometry", state.currentModel.geometry);
      }
    },
  },
  actions: {},
};
