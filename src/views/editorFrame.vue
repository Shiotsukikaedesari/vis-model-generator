<template>
  <div class="eidtor-container">
    <!-- 顶部导航 STR -->
    <div
      class="top-area"
      :style="{
        height: `${topAreaSetting.size}px`,
      }"
    >
      <top-navigation></top-navigation>
    </div>
    <!-- 顶部导航 END -->
    <div
      class="middle-area"
      :style="{
        height: `${middleAreaHeight}px`,
      }"
    >
      <drag-trans-box
        rightDrag
        :size="leftAreaSetting.size"
        @draging="(result) => draging(result, leftAreaSetting)"
        @draged="
          () => {
            leftAreaSetting.bufferSize = leftAreaSetting.size;
          }
        "
      >
        <object-library></object-library>
      </drag-trans-box>
      <!-- 3d可视化区域 STR -->
      <div
        class="three-vis"
        :style="{
          width: `${threeVisWidth}px`,
          height: `${middleAreaHeight}px`,
        }"
      >
        <render-window></render-window>
      </div>
    </div>
  </div>
</template>

<script>
import dragTransBox from "@/components/dragTransBox";
import renderWindow from "./renderWindow.vue";
import objectLibrary from "./objectLibrary";
import topNavigation from "./topNavigation";

export default {
  components: {
    dragTransBox,
    objectLibrary,
    topNavigation,
    renderWindow,
  },
  data() {
    return {
      topAreaSetting: {
        // 顶部
        size: 60,
      },
      leftAreaSetting: {
        // 左侧拖拽盒子设置
        size: 322,
        bufferSize: 322,
        max: 600,
        min: 130,
      },
    };
  },
  computed: {
    middleAreaHeight() {
      return window.innerHeight - this.topAreaSetting.size;
    },
    threeVisWidth() {
      return window.innerWidth - this.leftAreaSetting.size;
    },
  },
  watch: {},
  methods: {
    draging(result, setting) {
      let resultSize = setting.bufferSize + result;
      if (resultSize <= setting.min) {
        resultSize = setting.min;
      } else if (resultSize >= setting.max) {
        resultSize = setting.max;
      }
      setting.size = resultSize;
    },

    resetWindow() {
      this.leftAreaSetting = {
        // 左侧拖拽盒子设置
        size: 300,
        bufferSize: 300,
        max: 600,
        min: 130,
      };
    },
  },
  mounted() {
    window.onresize = () => {
      this.resetWindow();
    };
  },
};
</script>

<style lang="less" scoped>
.eidtor-container {
  .boxSetting();
  overflow: hidden;
  .flexLayout(column, flex-start, center);
  .top-area {
    .flexLayout(row, flex-start, center);
    width: 100%;
  }
  .middle-area {
    width: 100%;
    .flexLayout(row, space-between, center);
  }
  .bottom-area {
    width: 100%;
  }
}
</style>
