<template>
  <div class="basicTransformModule-container" v-if="config">
    <vis-controller-vector3
      label="物体位置"
      :step="1"
      :displayAccuracy="displayAccuracy"
      v-model="config.position"
    ></vis-controller-vector3>
    <vis-controller-vector3
      label="物体旋转"
      :step="1"
      :displayAccuracy="displayAccuracy"
      unit="°"
      v-model="config.rotation"
    ></vis-controller-vector3>
    <vis-controller-vector3
      label="物体缩放"
      :step="1"
      :displayAccuracy="displayAccuracy"
      v-model="config.scale"
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
    config() {
      return this.$store.getters["mesh/currentModel"];
    },
  },
  methods: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.basicTransformModule-container {
  .boxSetting();
}
</style>
