import Vue from "vue";
import { MaterialDataSupport, MODULETYPE } from "vis-three";

export const materialDataSupport = new MaterialDataSupport(Vue.observable({}));

export const module = {
  namespaced: true,
  state: {
    map: materialDataSupport.getData(),
    module: MODULETYPE.MATERIAL,
    draggedMaterial: "",
    dragging: false,
    currentMaterial: "",
  },
  getters: {
    get(state) {
      return state.map;
    },
    currentMaterial(state) {
      return state.currentMaterial;
    },
    dragging(state) {
      return state.dragging;
    },
    draggedMaterial(state) {
      return state.draggedMaterial;
    },
  },
  mutations: {
    dragging(state, status) {
      state.dragging = status;
    },
    setDraggedMaterial(state, vid) {
      state.draggedMaterial = vid;
    },

    setCurrentMaterial(state, vid) {
      state.currentMaterial = state.map[vid];
    },

    add(state, config) {
      const observeObject = Vue.observable(config);
      state.map[observeObject.vid] = observeObject;
      state.map.__ob__.dep.notify();
      this.commit("material/setCurrentMaterial", config.vid);
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
  },
  actions: {},
};
