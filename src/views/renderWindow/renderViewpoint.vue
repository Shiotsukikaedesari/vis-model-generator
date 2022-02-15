<template>
  <div class="render-viewpoint-container" v-tooltip.top="'视角切换'">
    <el-select v-model="cameraView" size="mini" placeholder="请选择">
      <el-option
        v-for="(item, index) in cameraViewList"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { SCENEVIEWPOINT } from "vis-three";

export default {
  props: {
    connector: {
      type: Object,
      required: true,
    },
    viewpoint: {
      type: String,
      default: SCENEVIEWPOINT.DEFAULT,
    },
  },
  data() {
    return {
      cameraView: "",
      cameraViewList: [
        { label: "默认视图", value: SCENEVIEWPOINT.DEFAULT },
        { label: "俯视图", value: SCENEVIEWPOINT.TOP },
        { label: "右视图", value: SCENEVIEWPOINT.RIGHT },
        { label: "正视图", value: SCENEVIEWPOINT.FRONT },
        { label: "仰视图", value: SCENEVIEWPOINT.BOTTOM },
        { label: "左视图", value: SCENEVIEWPOINT.LEFT },
        { label: "后视图", value: SCENEVIEWPOINT.BACK },
      ],
    };
  },
  watch: {
    cameraView: {
      handler(newVal) {
        this.connector.setViewPoint(newVal);
      },
    },
    viewpoint: {
      handler(newVal) {
        this.cameraView = newVal;
      },
      immediate: true,
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.render-viewpoint-container {
  .flexLayout(row, center, center);
  width: 100px;
  background: @brighterTheme-backgroundColor;
}
</style>
