// 引入UI组件库
import ElementUI from "element-ui";
// 引入全局自定义组件
import VisUI from "./components/global";
import "element-ui/lib/theme-chalk/index.css";
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
// 引入公共less配置
import "./assets/less/init.less";
// 引入elementUI重置配置
import "./assets/less/resetElementUI.less";
// 引入v-tooltip样式
import "./assets/less/tooltip.less";
// 引入 animate
import "animate.css";
// 引入图片懒加载
import VueLazyload from "vue-lazyload";
import VTooltip from "v-tooltip";

import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import { VisEngine } from "./assets/js/VisFrame";
import { CubeTexture, CubeTextureLoader, Mesh, Texture } from "three";
import { generateConfig } from "vis-three";
import { v4 as getUUid } from "uuid";

Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.use(VisUI);
Vue.use(VTooltip);
Vue.use(VueLazyload, {
  error: "/image/error.png",
  loading: "/image/loading.gif",
  silent: false,
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

// 加载预设资源
VisEngine.load(
  {
    assets: [
      "/resource/skyBox/snowScene/nx.jpg",
      "/resource/skyBox/snowScene/ny.jpg",
      "/resource/skyBox/snowScene/nz.jpg",
      "/resource/skyBox/snowScene/px.jpg",
      "/resource/skyBox/snowScene/py.jpg",
      "/resource/skyBox/snowScene/pz.jpg",
    ],
  },
  (event) => {
    const resourceMap = event.resourceMap;
    const background = new CubeTexture();
    background.images = [
      resourceMap.get("/resource/skyBox/snowScene/px.jpg"),
      resourceMap.get("/resource/skyBox/snowScene/nx.jpg"),
      resourceMap.get("/resource/skyBox/snowScene/py.jpg"),
      resourceMap.get("/resource/skyBox/snowScene/ny.jpg"),
      resourceMap.get("/resource/skyBox/snowScene/pz.jpg"),
      resourceMap.get("/resource/skyBox/snowScene/nz.jpg"),
    ];
    background.needsUpdate = true;

    VisEngine.scene.background = background;
    VisEngine.scene.environment = background;
  }
);

VisEngine.eventManager.addEventListener("pointerup", (event) => {
  if (event.button === 0) {
    // 选择模型
    if (event.intersections && event.intersections.length) {
      const object = event.intersections[0].object;
      if (object.isMesh) {
        const vid = VisEngine.compilerManager.getObjectVid(object);
        store.commit("model/setCurrentModel", vid);
      }
    }

    // 替换材质
    if (store.getters["material/draggedMaterial"]) {
      store.commit("model/setMaterial", {
        vid: store.getters["model/currentModel"].vid,
        value: store.getters["material/draggedMaterial"],
      });
      store.commit("material/setDraggedMaterial", "");
    }
  }
});
