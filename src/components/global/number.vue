<template>
  <control-layout :label="label">
    <template #controller>
      <number-controller
        :step="step"
        :dragMultply="dragMultply"
        :min="min"
        :max="max"
        :unit="unit"
        :displayAccuracy="displayAccuracy"
        v-model="inputValue"
      ></number-controller>
    </template>
  </control-layout>
</template>

<script>
import controlLayout from "./controlLayout";
import numberController from "./numberController.vue";
export default {
  name: "vis-controller-number",
  components: {
    controlLayout,
    numberController,
  },
  props: {
    label: {
      // 标题
      type: String,
      default: "标签",
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
      type: "number",

      active: false,
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
