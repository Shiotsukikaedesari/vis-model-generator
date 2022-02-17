<template>
  <div class="controlLayout-container">
    <div class="config-title" v-text="label"></div>
    <div class="config-component">
      <slot name="controller"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      // 标题
      type: String,
      default: "标签",
    },
  },
  data() {
    return {
      watcher: "",
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.controlLayout-container {
  .boxSetting(100%);
  .flexLayout(row, flex-start, center);
  margin-bottom: @box-margin;
  .config-keyframe {
    margin-right: @box-margin;
    cursor: pointer;
    .transitionSetting({
      color: @themeDarkHover-color;
    });
  }
  .active {
    color: @theme-color;
  }
  .config-title {
    width: 64px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: @box-margin;
    .transitionSetting({
      max-width: unset;
    });
  }
  .config-component {
    width: calc(~"100% - 74px");
  }
}
</style>
