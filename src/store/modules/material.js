import Vue from "vue";
import { MaterialDataSupport, MODULETYPE } from "vis-three";

export const materialDataSupport = new MaterialDataSupport(Vue.observable({}));

export const module = {
  namespaced: true,
  state: {
    map: materialDataSupport.getData(),
    module: MODULETYPE.MATERIAL,
    active: "",
    draggedMaterial: "",
    dragging: false,
  },
  getters: {
    get(state) {
      return state.map;
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

      this.commit("activeConfig/setMaterial", vid);
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
