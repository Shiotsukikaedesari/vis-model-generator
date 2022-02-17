<template>
  <control-layout :label="label">
    <template #controller>
      <div class="select-controller">
        <el-select
          :value="value"
          size="mini"
          :placeholder="placeholder"
          @change="change"
        >
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item[prop.label]"
            :value="prop.value ? item[prop.value] : item"
          ></el-option>
        </el-select>
      </div>
    </template>
  </control-layout>
</template>

<script>
import controlLayout from "./controlLayout";
export default {
  name: "vis-controller-select",
  components: {
    controlLayout,
  },
  props: {
    label: {
      // 标题
      type: String,
      default: "标签",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    prop: {
      // 规定options字段
      type: Object,
      default: () => {
        return {
          label: "label",
          value: "value",
        };
      },
    },
    options: Array, // 选项
    value: null,
  },
  data() {
    return {};
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
  methods: {
    change(value) {
      this.inputValue = value;
    },
  },
};
</script>

<style lang="less" scoped>
.select-controller {
  .flexLayout(row, flex-end, center);
  .el-select {
    width: 100%;
  }
}
</style>
