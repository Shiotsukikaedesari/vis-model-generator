<template>
  <div class="textureSettingModule-container" v-if="config">
    <collapse-layout label="贴图" icon="#icontietushezhi" arrowPosition="left">
      <template #container>
        <vis-controller-input
          label="名称"
          v-model="config.vid"
        ></vis-controller-input>
        <vis-controller-input
          label="类型"
          v-model="config.type"
          disabled
        ></vis-controller-input>
      </template>
    </collapse-layout>
    <collapse-layout label="基础设置" icon="#iconshezhi" arrowPosition="left">
      <template #container>
        <vis-controller-number
          label="旋转"
          :step="1"
          :dragMultply="3"
          :min="0"
          :max="360"
          unit="°"
          :displayAccuracy="0"
          v-model="rotation"
        ></vis-controller-number>
        <vis-controller-number
          label="中心点x"
          :step="0.01"
          :dragMultply="3"
          :displayAccuracy="2"
          v-model="config.center.x"
        ></vis-controller-number>
        <vis-controller-number
          label="中心点y"
          :step="0.01"
          :dragMultply="3"
          :displayAccuracy="2"
          v-model="config.center.y"
        ></vis-controller-number>
        <vis-controller-select
          label="x包裹"
          :options="warp"
          v-model="config.wrapS"
        ></vis-controller-select>
        <vis-controller-number
          v-if="config.wrapS !== warp[0].value"
          label="x重复"
          :step="1"
          :min="1"
          :dragMultply="2"
          v-model="config.repeat.x"
        ></vis-controller-number>
        <vis-controller-select
          label="y包裹"
          :options="warp"
          v-model="config.wrapT"
        ></vis-controller-select>
        <vis-controller-number
          v-if="config.wrapS !== warp[0].value"
          label="y重复"
          :step="1"
          :min="1"
          :dragMultply="2"
          v-model="config.repeat.y"
        ></vis-controller-number>
        <vis-controller-number
          label="x偏移"
          :step="0.01"
          :min="0"
          :max="1"
          :dragMultply="3"
          :displayAccuracy="2"
          v-model="config.offset.x"
        ></vis-controller-number>
        <vis-controller-number
          label="y偏移"
          :step="0.01"
          :min="0"
          :max="1"
          :dragMultply="3"
          :displayAccuracy="2"
          v-model="config.offset.y"
        ></vis-controller-number>
      </template>
    </collapse-layout>

    <components :config="config" :is="type"></components>
  </div>
</template>

<script>
import ImageTexture from "../textureSettingModule/ImageTexture";
import collapseLayout from "../../components/collapseLayout.vue";

import {
  ClampToEdgeWrapping,
  RepeatWrapping,
  MirroredRepeatWrapping,
} from "three";

export default {
  components: {
    collapseLayout,
    ImageTexture,
  },
  data() {
    return {
      warp: [
        { label: "末尾延展", value: ClampToEdgeWrapping },
        { label: "重复覆盖", value: RepeatWrapping },
        { label: "镜像覆盖", value: MirroredRepeatWrapping },
      ],
    };
  },
  computed: {
    config() {
      return this.$store.getters["texture/currentTexture"];
    },
    type() {
      if (this.config) {
        return this.config.type;
      } else {
        return false;
      }
    },
    rotation: {
      get() {
        return (this.config.rotation * 180) / Math.PI;
      },
      set(value) {
        this.config.rotation = (value * Math.PI) / 180;
      },
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.textureSettingModule-container {
}
</style>
