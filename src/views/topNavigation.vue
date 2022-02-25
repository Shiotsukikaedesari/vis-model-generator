<template>
  <div class="topNavigation-container">
    <div class="left-part">
      <div class="logo">
        <img src="image/logo.png" alt="" srcset="" />
      </div>
      <div class="title">VIS-MODEL-GENERATOR</div>
    </div>
    <div class="middle-part"></div>
    <right-part></right-part>
  </div>
</template>

<script>
const rightPart = () => import("./topNavigation/rightPart.vue");
export default {
  components: {
    rightPart,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.topNavigation-container {
  .boxSetting();
  .flexLayout(row, space-between, center);
  > .left-part {
    width: 30%;
  }
  > div:nth-child(2) {
    flex: 1;
  }
}

.left-part {
  padding-left: @box-padding;
  .flexLayout(row, flex-start, center);
  .logo {
    width: 40px;
    height: 40px;
    margin-right: @box-margin;
    img {
      .boxSetting();
      object-fit: contain;
    }
  }

  .title {
    font-weight: bold;
    white-space: nowrap;
  }
}
</style>
