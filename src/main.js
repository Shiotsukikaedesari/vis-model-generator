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
import "./plugins/axios";
import VTooltip from "v-tooltip";

import Vue from "vue";
import App from "./App.vue";
import store from "./store";

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

NProgress.start();

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
