import Vue from "vue";
// 扩展vue
import { GeometryDataSupport, MODULETYPE } from "vis-three";

export const geometryDataSupport = new GeometryDataSupport(Vue.observable({}));

export const module = {
  namespaced: true,
  state: {
    map: geometryDataSupport.getData(),
    module: MODULETYPE.GEOMETRY,
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
      state.active = state.map[vid];

      this.commit("attribute/add", {
        vid,
        config: state.map[vid],
        module: state.module,
        name,
        icon,
      });
      state.map[vid] = config;
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
