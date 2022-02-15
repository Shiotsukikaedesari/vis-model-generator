<template>
  <div class="renderWindow-container" ref="renderElement">
    <iframe
      width="100%"
      height="100%"
      scrolling="no"
      ref="renderMask"
      class="render-mask"
    >
    </iframe>

    <position-layout-box
      class="bottom-function-box"
      :offsetX="5"
      :offsetY="5"
      :isBottom="true"
    >
      <template #main>
        <render-viewpoint
          v-show="showRenderViewPoint"
          :viewpoint="viewpoint"
          :connector="sceneConnector"
        >
        </render-viewpoint>
        <auxiliary-display
          :sceneConnector="sceneConnector"
          :engineConnector="engineConnector"
        >
        </auxiliary-display>
      </template>
    </position-layout-box>
    <position-layout-box
      class="bottom-function-box"
      :offsetX="5"
      :offsetY="5"
      :isBottom="true"
      :isRight="true"
    >
      <template #main>
        <render-mode :connector="sceneConnector"></render-mode>
      </template>
    </position-layout-box>

    <position-layout-box class="top-function-box" :offsetX="5" :offsetY="5">
      <template #main>
        <performance-monitor :connector="engineConnector"></performance-monitor>
      </template>
    </position-layout-box>
  </div>
</template>

<script>
import Connector from "@/assets/js/Connector";

import { VisEngine } from "../assets/js/VisFrame";

import positionLayoutBox from "@/components/positionLayoutBox";

const renderViewpoint = () => import("./renderWindow/renderViewpoint");
const auxiliaryDisplay = () => import("./renderWindow/auxiliaryDisplay");
const renderMode = () => import("./renderWindow/renderMode");
const performanceMonitor = () => import("./renderWindow/performanceMonitor");

export default {
  components: {
    positionLayoutBox,
    renderViewpoint,
    auxiliaryDisplay,
    renderMode,
    performanceMonitor,
  },
  props: {
    // 是否播放
    play: {
      type: Boolean,
      default: false,
    },
    // 初始的视角
    viewpoint: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {
      timer: "", // 刷新定时器
      canResize: true,
      throttleTime: 1000 / 60,
      width: "",
      height: "",
      sceneConnector: "", // 场景事件连接器
      engineConnector: "", // 引擎事件连接器
      showRenderViewPoint: true,
      visTarget: "", // vis引擎放置的target
    };
  },
  methods: {},
  mounted() {
    // 绑定事件
    // 监听材质拖拽 加载引擎鼠标抬起事件
    const materialFun = (event) => {
      VisEngine.getSceneStatusManager().checkActiveObject(event);
    };
    this.$watch("$store.state.material.dragging", (newVal) => {
      if (newVal) {
        VisEngine.pointerManager.addEventListener("pointerdown", materialFun);
      } else {
        VisEngine.pointerManager.removeEventListener(
          "pointerdown",
          materialFun
        );
      }
    });

    // 设置连通器
    this.engineConnector = new Connector().apply(VisEngine, [
      "setSize",
      "play",
      "stop",
      "setTransformControls",
      "setStats",
    ]);

    this.sceneConnector = new Connector().apply(VisEngine.scene, [
      "setViewPoint",
      "showAxesHelper",
      "showGridHelper",
      "setDisplayMode",
      "showObjectHelper",
    ]);

    // 渲染监听
    this.$watch(
      "play",
      (newVal) => {
        if (newVal) {
          this.engineConnector.play();
        } else {
          this.engineConnector.stop();
        }
      },
      { immediate: true }
    );

    // 自动窗口大小
    const renderMask = this.$refs.renderMask;
    renderMask.contentWindow.addEventListener("resize", () => {
      if (!this.canResize) {
        return false;
      } else {
        this.canResize = false;
        this.timer = setTimeout(() => {
          this.engineConnector.setSize(
            renderMask.offsetWidth,
            renderMask.offsetHeight
          );
          this.canResize = true;
        }, this.throttleTime);
      }
    });

    // 设置dom渲染引擎

    VisEngine.setDom(this.$el).play();
  },
};
</script>

<style lang="less" scoped>
.renderWindow-container {
  position: relative;
  .boxSetting();
  .render-mask {
    position: absolute;
    pointer-events: none;
    z-index: -1;
  }
  .bottom-function-box {
    .flexLayout(row, flex-start, center);
    > * {
      margin-right: @box-margin / 2;
    }
  }
  .top-function-box {
    .flexLayout(row, flex-start, center);
  }
}
</style>
