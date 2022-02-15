<template>
  <div class="textureSettingModule-container" v-if="config">
    <de-collapse-layout
      label="贴图"
      icon="#icontietushezhi"
      arrowPosition="left"
    >
      <template #container>
        <de-controller-input
          :keyframe="false"
          label="名称"
          v-model="textureName"
        >
        </de-controller-input>
        <de-controller-input
          :keyframe="false"
          label="类型"
          v-model="config.type"
          disabled
        >
        </de-controller-input>
      </template>
    </de-collapse-layout>
    <de-collapse-layout
      label="基础设置"
      icon="#iconshezhi"
      arrowPosition="left"
    >
      <template #container>
        <de-controller-number
          label="旋转"
          :step="1"
          :dragMultply="3"
          :min="0"
          :max="360"
          unit="°"
          :displayAccuracy="0"
          :animation="{
            target: config.vid,
            attribute: 'rotation',
          }"
          v-model="rotation"
        >
        </de-controller-number>
        <de-controller-number
          label="中心点x"
          :step="0.01"
          :dragMultply="3"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'center.x',
          }"
          v-model="config.center.x"
        >
        </de-controller-number>
        <de-controller-number
          label="中心点y"
          :step="0.01"
          :dragMultply="3"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'center.y',
          }"
          v-model="config.center.y"
        >
        </de-controller-number>
        <de-controller-select
          label="x包裹"
          :options="warp"
          :animation="{
            target: config.vid,
            attribute: 'wrapS',
          }"
          v-model="config.wrapS"
        >
        </de-controller-select>
        <de-controller-number
          v-if="config.wrapS !== warp[0].value"
          label="x重复"
          :step="1"
          :min="1"
          :dragMultply="2"
          :animation="{
            target: config.vid,
            attribute: 'repeat.x',
          }"
          v-model="config.repeat.x"
        >
        </de-controller-number>
        <de-controller-select
          label="y包裹"
          :options="warp"
          :animation="{
            target: config.vid,
            attribute: 'wrapT',
          }"
          v-model="config.wrapT"
        >
        </de-controller-select>
        <de-controller-number
          v-if="config.wrapS !== warp[0].value"
          label="y重复"
          :step="1"
          :min="1"
          :dragMultply="2"
          :animation="{
            target: config.vid,
            attribute: 'repeat.y',
          }"
          v-model="config.repeat.y"
        >
        </de-controller-number>
        <de-controller-number
          label="x偏移"
          :step="0.01"
          :min="0"
          :max="1"
          :dragMultply="3"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: '',
          }"
          v-model="config.offset.x"
        >
        </de-controller-number>
        <de-controller-number
          label="y偏移"
          :step="0.01"
          :min="0"
          :max="1"
          :dragMultply="3"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: '',
          }"
          v-model="config.offset.y"
        >
        </de-controller-number>
      </template>
    </de-collapse-layout>
    <components :config="config" :is="type"> </components>
  </div>
</template>

<script>
import ImageTexture from "../textureSettingModule/ImageTexture";
import {
  ClampToEdgeWrapping,
  RepeatWrapping,
  MirroredRepeatWrapping,
} from "three";

export default {
  components: {
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
    textureName: {
      get() {
        return this.$store.getters["attribute/getName"](this.config.vid);
      },
      set(value) {
        this.$store.commit("attribute/setName", {
          vid: this.config.vid,
          name: value,
        });
      },
    },
    config() {
      return this.$store.getters["activeConfig/getTexture"];
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
