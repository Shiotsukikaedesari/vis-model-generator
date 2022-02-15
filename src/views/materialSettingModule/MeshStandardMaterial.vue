<template>
  <div class="materialSettingModule-container">
    <de-collapse-layout
      label="基础设置"
      icon="#iconshezhi"
      arrowPosition="left"
    >
      <template #container>
        <de-controller-switch
          label="线框化"
          :animation="{
            target: config.vid,
            attribute: 'wireframe',
          }"
          v-model="config.wireframe"
        >
        </de-controller-switch>
        <de-controller-switch
          label="透明度"
          :animation="{
            target: config.vid,
            attribute: 'transparent',
          }"
          v-model="config.transparent"
        >
        </de-controller-switch>
        <de-controller-number
          label="透明程度"
          :animation="{
            target: config.vid,
            attribute: 'opacity',
          }"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :max="1"
          :displayAccuracy="2"
          v-model="config.opacity"
        >
        </de-controller-number>
        <de-controller-picker
          label="材质颜色"
          :animation="{
            target: config.vid,
            attribute: 'color',
          }"
          v-model="config.color"
        >
        </de-controller-picker>
        <de-controller-picker
          label="反光颜色"
          :animation="{
            target: config.vid,
            attribute: 'emissive',
          }"
          v-model="config.emissive"
        >
        </de-controller-picker>
        <de-controller-number
          label="反光强度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'emissiveIntensity',
          }"
          v-model="config.emissiveIntensity"
        >
        </de-controller-number>
        <de-controller-number
          label="金属度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :max="1"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'metalness',
          }"
          v-model="config.metalness"
        >
        </de-controller-number>
        <de-controller-number
          label="粗糙度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :max="1"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'roughness',
          }"
          v-model="config.roughness"
        >
        </de-controller-number>
        <de-controller-number
          label="环境遮挡"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'aoMapIntensity',
          }"
          v-model="config.aoMapIntensity"
        >
        </de-controller-number>
        <de-controller-number
          label="环境反射"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'envMapIntensity',
          }"
          v-model="config.envMapIntensity"
        >
        </de-controller-number>
      </template>
    </de-collapse-layout>
    <de-collapse-layout
      label="贴图设置"
      icon="#icontexture"
      arrowPosition="left"
    >
      <template #container>
        <de-controller-select
          :keyframe="true"
          label="表面贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'map',
          }"
          v-model="config.map"
        >
        </de-controller-select>
        <de-controller-select
          :keyframe="true"
          label="反光贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'emissiveMap',
          }"
          v-model="config.emissiveMap"
        >
        </de-controller-select>
        <de-controller-select
          :keyframe="true"
          label="透明贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'alphaMap',
          }"
          v-model="config.alphaMap"
        >
        </de-controller-select>
        <de-controller-select
          :keyframe="true"
          label="金属贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'metalnessMap',
          }"
          v-model="config.metalnessMap"
        >
        </de-controller-select>
        <de-controller-select
          :keyframe="true"
          label="粗糙贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'roughnessMap',
          }"
          v-model="config.roughnessMap"
        >
        </de-controller-select>
        <de-controller-select
          :keyframe="true"
          label="凹凸贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'bumpMap',
          }"
          v-model="config.bumpMap"
        >
        </de-controller-select>
        <de-controller-number
          v-if="config.displacementMap"
          label="凹凸程度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'bumpScale',
          }"
          v-model="config.bumpScale"
        >
        </de-controller-number>
        <de-controller-select
          :keyframe="true"
          label="位移贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'displacementMap',
          }"
          v-model="config.displacementMap"
        >
        </de-controller-select>
        <de-controller-number
          v-if="config.displacementMap"
          label="位移程度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'displacementScale',
          }"
          v-model="config.displacementScale"
        >
        </de-controller-number>
        <de-controller-number
          v-if="config.displacementMap"
          label="偏移量"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :displayAccuracy="2"
          :animation="{
            target: config.vid,
            attribute: 'displacementBias',
          }"
          v-model="config.displacementBias"
        >
        </de-controller-number>
        <de-controller-select
          :keyframe="true"
          label="法线贴图"
          :options="textureList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'normalMap',
          }"
          v-model="config.normalMap"
        >
        </de-controller-select>
      </template>
    </de-collapse-layout>
  </div>
</template>

<script>
export default {
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
          name: this.$store.getters["attribute/getName"](vid),
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
