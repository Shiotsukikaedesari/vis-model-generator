<template>
  <control-layout :label="label">
    <template #controller>
      <div class="vector3-controller">
        <span v-text="elemLabel.x"></span>
        <number-controller
          :step="step"
          :dragMultply="dragMultply"
          :min="min"
          :max="max"
          :unit="unit"
          :showButton="false"
          :displayAccuracy="displayAccuracy"
          v-model="xValue"
        ></number-controller>
        <span v-text="elemLabel.y"></span>
        <number-controller
          :step="step"
          :dragMultply="dragMultply"
          :min="min"
          :max="max"
          :unit="unit"
          :showButton="false"
          :displayAccuracy="displayAccuracy"
          v-model="yValue"
        ></number-controller>
        <span v-text="elemLabel.z"></span>
        <number-controller
          :step="step"
          :dragMultply="dragMultply"
          :min="min"
          :max="max"
          :unit="unit"
          :showButton="false"
          :displayAccuracy="displayAccuracy"
          v-model="zValue"
        ></number-controller>
      </div>
    </template>
  </control-layout>
</template>

<script>
import controlLayout from "./controlLayout";
import numberController from "./numberController.vue";
export default {
  name: "vis-controller-vector3",
  components: {
    controlLayout,
    numberController,
  },
  props: {
    keyframe: {
      // 是否展示k帧
      type: Boolean,
      default: true,
    },
    animation: {
      // 动画设置
      type: Object,
    },
    label: {
      // 标题
      type: String,
      default: "标签",
    },
    elemLabel: {
      type: Object,
      default: () => {
        return {
          x: "X",
          y: "Y",
          z: "Z",
        };
      },
    },
    step: {
      // 步长
      type: Number,
      default: 1,
    },
    dragMultply: {
      // 拖拽倍率
      type: Number,
      default: 1,
    },
    min: {
      // 最小值
      type: Number,
      default: -Infinity,
    },
    max: {
      // 最大值
      type: Number,
      default: Infinity,
    },
    unit: {
      // 单位
      type: String,
      default: "",
    },
    // 显示精度
    displayAccuracy: {
      type: Number,
    },
    throttleTime: {
      type: Number,
      default: 1000 / 25,
    },
    value: null,
  },
  data() {
    return {
      type: "vector3",
      active: false,
    };
  },
  computed: {
    xValue: {
      get() {
        if (this.unit === "°") {
          return (this.value.x * 180) / Math.PI;
        } else {
          return this.value.x;
        }
      },
      set(value) {
        this.value.x = this.unit === "°" ? (value * Math.PI) / 180 : value;
      },
    },
    yValue: {
      get() {
        if (this.unit === "°") {
          return (this.value.y * 180) / Math.PI;
        } else {
          return this.value.y;
        }
      },
      set(value) {
        this.value.y = this.unit === "°" ? (value * Math.PI) / 180 : value;
      },
    },
    zValue: {
      get() {
        if (this.unit === "°") {
          return (this.value.z * 180) / Math.PI;
        } else {
          return this.value.z;
        }
      },
      set(value) {
        this.value.z = this.unit === "°" ? (value * Math.PI) / 180 : value;
      },
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.vector3-controller {
  .flexLayout(row, space-between, center);
  > span {
    color: @placeHolderText-color;
  }
  /deep/ .number-controller {
    width: 20%;
    background: unset;
    border-bottom: 1px dashed @themeDarkHover-color;
    border-radius: unset;
  }
}
</style>
