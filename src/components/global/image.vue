<template>
  <el-image
    :src="src"
    class="vis-image"
    :style="{
      width,
      height,
    }"
  >
    <div slot="placeholder">
      <img src="/image/loading.gif" alt="加载中" />
    </div>
    <div slot="error">
      <img src="/image/error.png" alt="加载失败" />
    </div>
  </el-image>
</template>

<script>
export default {
  name: "vis-image",
  props: {
    // 图标code
    src: {
      type: String,
    },
    fit: {
      type: String,
      default: "cover",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="less">
.vis-image {
  > div {
    .boxSetting();
    .flexLayout(row, center, center);
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
}
</style>
