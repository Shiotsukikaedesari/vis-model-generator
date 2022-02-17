<template>
  <div class="materialSettingModule-container">
    <collapse-layout label="基础设置" icon="#iconshezhi" arrowPosition="left">
      <template #container>
        <vis-controller-switch
          label="线框化"
          v-model="config.wireframe"
        ></vis-controller-switch>
        <vis-controller-switch
          label="透明度"
          v-model="config.transparent"
        ></vis-controller-switch>
        <vis-controller-number
          label="透明程度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :max="1"
          :displayAccuracy="2"
          v-model="config.opacity"
        ></vis-controller-number>
        <vis-controller-picker
          label="材质颜色"
          v-model="config.color"
        ></vis-controller-picker>
        <vis-controller-picker
          label="反光颜色"
          v-model="config.emissive"
        ></vis-controller-picker>
        <vis-controller-number
          label="反光强度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          v-model="config.emissiveIntensity"
        ></vis-controller-number>
        <vis-controller-number
          label="金属度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :max="1"
          :displayAccuracy="2"
          v-model="config.metalness"
        ></vis-controller-number>
        <vis-controller-number
          label="粗糙度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :max="1"
          :displayAccuracy="2"
          v-model="config.roughness"
        ></vis-controller-number>
        <vis-controller-number
          label="环境遮挡"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          v-model="config.aoMapIntensity"
        ></vis-controller-number>
        <vis-controller-number
          label="环境反射"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          v-model="config.envMapIntensity"
        ></vis-controller-number>
      </template>
    </collapse-layout>
    <collapse-layout label="贴图设置" icon="#icontexture" arrowPosition="left">
      <template #container>
        <vis-controller-select
          label="表面贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          v-model="config.map"
        ></vis-controller-select>
        <vis-controller-select
          label="反光贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          v-model="config.emissiveMap"
        ></vis-controller-select>
        <vis-controller-select
          label="透明贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          v-model="config.alphaMap"
        ></vis-controller-select>
        <vis-controller-select
          label="金属贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          v-model="config.metalnessMap"
        ></vis-controller-select>
        <vis-controller-select
          label="粗糙贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          v-model="config.roughnessMap"
        ></vis-controller-select>
        <vis-controller-select
          label="凹凸贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          v-model="config.bumpMap"
        ></vis-controller-select>
        <vis-controller-number
          v-if="config.displacementMap"
          label="凹凸程度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          v-model="config.bumpScale"
        ></vis-controller-number>
        <vis-controller-select
          :keyframe="true"
          label="位移贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          v-model="config.displacementMap"
        ></vis-controller-select>
        <vis-controller-number
          v-if="config.displacementMap"
          label="位移程度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          v-model="config.displacementScale"
        ></vis-controller-number>
        <vis-controller-number
          v-if="config.displacementMap"
          label="偏移量"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          v-model="config.displacementBias"
        ></vis-controller-number>
        <vis-controller-select
          :keyframe="true"
          label="法线贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          v-model="config.normalMap"
        ></vis-controller-select>
      </template>
    </collapse-layout>
  </div>
</template>

<script>
import collapseLayout from "../../components/collapseLayout.vue";
export default {
  components: {
    collapseLayout,
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  computed: {
    textureList() {
      const list = [
        {
          name: "无",
          vid: "",
        },
      ];
      const textureMap = this.$store.getters["texture/get"];
      Object.keys(textureMap).forEach((vid) => {
        list.push({
          vid,
          name: vid,
        });
      });
      return list;
    },
  },
};
</script>

<style lang="less" scoped>
.materialSettingModule-container {
}
</style>
