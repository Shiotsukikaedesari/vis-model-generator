<template>
  <div class="materialSettingModule-container">
    <collapse-layout label="基础设置" icon="#iconshezhi" arrowPosition="left">
      <template #container>
        <vis-controller-picker
          label="材质颜色"
          v-model="config.color"
        ></vis-controller-picker>
        <vis-controller-picker
          label="发光颜色"
          v-model="config.emissive"
        ></vis-controller-picker>
        <vis-controller-number
          label="发光强度"
          :step="0.01"
          :dragMultply="3"
          :min="0"
          :max="1"
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
      </template>
    </collapse-layout>
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
};
</script>

<style lang="less" scoped>
.materialSettingModule-container {
}
</style>
