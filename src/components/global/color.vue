<template>
  <control-layout :label="label">
    <template #controller>
      <div class="color-controller">
        <el-input v-model="inputValue" size="mini"></el-input>
        <el-color-picker
          size="mini"
          v-model="inputValue"
          :show-alpha="showAlpha"
          :color-format="colorFormat"
        ></el-color-picker>
      </div>
    </template>
  </control-layout>
</template>

<script>
import controlLayout from "./controlLayout";
// import { Photoshop } from 'vue-color'
export default {
  name: "vis-controller-picker",
  components: {
    controlLayout,
    // 'photoshop-picker': Photoshop
  },
  props: {
    label: {
      // 标题
      type: String,
      default: "标签",
    },
    colorFormat: {
      // 色彩格式
      type: String,
      default: "rgb",
    },
    showAlpha: {
      // 展示透明度
      type: Boolean,
      default: false,
    },
    value: null,
  },
  data() {
    return {
      type: "color", // 数据类型
      active: false, // 是否激活
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

<style lang="less" scoped>
.color-controller {
  .flexLayout(row, space-between, center);
  > .el-input {
    margin-right: @box-margin / 2;
  }
}
</style>
