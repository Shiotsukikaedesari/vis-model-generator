<template>
  <control-layout :label="label">
    <template #controller>
      <div class="switch-controller">
        <el-switch v-model="inputValue" size="mini"></el-switch>
      </div>
    </template>
  </control-layout>
</template>

<script>
import controlLayout from "./controlLayout";
export default {
  name: "vis-controller-switch",
  components: {
    controlLayout,
  },
  props: {
    label: {
      // 标题
      type: String,
      default: "标签",
    },
    value: null,
  },
  data() {
    return {
      type: "boolean",
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
.switch-controller {
  .flexLayout(row, flex-end, center);
}
</style>
