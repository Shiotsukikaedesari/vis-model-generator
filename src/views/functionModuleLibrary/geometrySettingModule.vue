<template>
  <div class="geometrySettingModule-container" v-if="config">
    <vis-controller-vector3
      label="锚点位置"
      :step="0.1"
      :displayAccuracy="displayAccuracy"
      v-model="config.position"
    ></vis-controller-vector3>
    <vis-controller-vector3
      label="锚点缩放"
      :step="1"
      :displayAccuracy="displayAccuracy"
      unit="°"
      v-model="config.scale"
    ></vis-controller-vector3>
    <vis-controller-vector3
      label="锚点旋转"
      :step="1"
      :displayAccuracy="displayAccuracy"
      unit="°"
      v-model="config.rotation"
    ></vis-controller-vector3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayAccuracy: 2,
    };
  },
  computed: {
    component() {
      return this.config?.type;
    },

    config() {
      return this.$store.getters["geometry/currentGeometry"];
    },
  },
};
</script>

<style lang="less" scoped>
.geometrySettingModule-container {
  .boxSetting();
}
</style>
