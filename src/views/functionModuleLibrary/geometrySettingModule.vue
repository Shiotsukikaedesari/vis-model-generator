<template>
  <div class="geometrySettingModule-container">
    <de-collapse-layout
      label="锚点位置"
      icon="#iconpingyi"
      arrowPosition="left"
    >
      <template #container>
        <de-controller-number
          :keyframe="false"
          label="X轴"
          :step="1"
          :dragMultply="3"
          unit="%"
          :displayAccuracy="0"
          v-model="positionX"
        >
        </de-controller-number>
        <de-controller-number
          :keyframe="false"
          label="y轴"
          :step="1"
          :dragMultply="3"
          unit="%"
          :displayAccuracy="0"
          v-model="positionY"
        >
        </de-controller-number>
        <de-controller-number
          :keyframe="false"
          label="z轴"
          :step="1"
          :dragMultply="3"
          unit="%"
          :displayAccuracy="0"
          v-model="positionZ"
        >
        </de-controller-number>
      </template>
    </de-collapse-layout>

    <de-collapse-layout
      label="锚点旋转"
      icon="#iconpingyi"
      arrowPosition="left"
    >
      <template #container>
        <de-controller-number
          :keyframe="false"
          label="X轴"
          :step="1"
          unit="°"
          :dragMultply="5"
          :displayAccuracy="0"
          v-model="rotationX"
        >
        </de-controller-number>
        <de-controller-number
          :keyframe="false"
          label="Y轴"
          :step="1"
          unit="°"
          :dragMultply="5"
          :displayAccuracy="0"
          v-model="rotationY"
        >
        </de-controller-number>
        <de-controller-number
          :keyframe="false"
          label="Z轴"
          :step="1"
          unit="°"
          :dragMultply="5"
          :displayAccuracy="0"
          v-model="rotationZ"
        >
        </de-controller-number>
      </template>
    </de-collapse-layout>
  </div>
</template>

<script>
export default {
  components: {},
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
      return this.$store.getters["activeConfig/getGeometry"];
    },

    positionX: {
      get() {
        return this.config.position.x * 100;
      },
      set(value) {
        this.config.position.x = value / 100;
      },
    },
    positionY: {
      get() {
        return this.config.position.y * 100;
      },
      set(value) {
        this.config.position.y = value / 100;
      },
    },
    positionZ: {
      get() {
        return this.config.position.z * 100;
      },
      set(value) {
        this.config.position.z = value / 100;
      },
    },

    rotationX: {
      get() {
        // 弧度转角度
        return (this.config.rotation.x * 180) / Math.PI;
      },
      set(value) {
        this.config.rotation.x = (value * Math.PI) / 180;
      },
    },
    rotationY: {
      get() {
        // 弧度转角度
        return (this.config.rotation.y * 180) / Math.PI;
      },
      set(value) {
        this.config.rotation.y = (value * Math.PI) / 180;
      },
    },
    rotationZ: {
      get() {
        // 弧度转角度
        return (this.config.rotation.z * 180) / Math.PI;
      },
      set(value) {
        this.config.rotation.z = (value * Math.PI) / 180;
      },
    },
  },
};
</script>

<style lang="less" scoped></style>
