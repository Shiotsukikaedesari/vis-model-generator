<template>
  <div class="topNavigation-container">
    <!-- <common-function-navigation></common-function-navigation> -->
    <div></div>
  </div>
</template>

<script>
// const commonFunctionNavigation = () => import("./commonFunctionNavigation");
export default {
  components: {
    // commonFunctionNavigation,
  },
};
</script>

<style lang="less" scoped>
.topNavigation-container {
  .boxSetting();
  .flexLayout(row, space-between, center);
  > div:first-child,
  div:last-child {
    width: 30%;
  }
  > div:nth-child(2) {
    flex: 1;
  }
}
</style>
