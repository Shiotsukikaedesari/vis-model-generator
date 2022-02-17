<template>
  <control-layout :label="label">
    <template #controller>
      <div class="color-controller">
        <el-input
          v-model="inputValue"
          size="mini"
          :disabled="disabled"
        ></el-input>
      </div>
    </template>
  </control-layout>
</template>

<script>
import controlLayout from "./controlLayout";
export default {
  name: "vis-controller-input",
  components: {
    controlLayout,
  },
  props: {
    label: {
      // 标题
      type: String,
      default: "标签",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: null,
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
