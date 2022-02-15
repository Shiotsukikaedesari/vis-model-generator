<template>
  <div class="renderObject-container">
    <div
      v-tooltip.top="'几何'"
      class="renderObject-elem"
      :class="{ 'active-elem ': mode === SCENEDISPLAYMODE.GEOMETRY }"
      @click="
        () => {
          mode = SCENEDISPLAYMODE.GEOMETRY;
        }
      "
    >
      <vis-icon size="16px" code="#iconyibanxuanran"></vis-icon>
    </div>
    <div
      v-tooltip.top="'材质'"
      class="renderObject-elem"
      :class="{ 'active-elem ': mode === SCENEDISPLAYMODE.MATERIAL }"
      @click="
        () => {
          mode = SCENEDISPLAYMODE.MATERIAL;
        }
      "
    >
      <vis-icon size="16px" code="#iconzhuosexuanran"></vis-icon>
    </div>
    <div
      v-tooltip.top="'灯光'"
      class="renderObject-elem"
      :class="{ 'active-elem ': mode === SCENEDISPLAYMODE.LIGHT }"
      @click="
        () => {
          mode = SCENEDISPLAYMODE.LIGHT;
        }
      "
    >
      <vis-icon size="16px" code="#icondengguangxuanran"></vis-icon>
    </div>
    <div
      v-tooltip.top="'场景'"
      class="renderObject-elem"
      :class="{ 'active-elem ': mode === SCENEDISPLAYMODE.ENV }"
      @click="
        () => {
          mode = SCENEDISPLAYMODE.ENV;
        }
      "
    >
      <vis-icon size="16px" code="#iconhuanjingxuanran"></vis-icon>
    </div>
  </div>
</template>

<script>
import { SCENEDISPLAYMODE } from "vis-three";

export default {
  props: {
    connector: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mode: SCENEDISPLAYMODE.GEOMETRY,
      SCENEDISPLAYMODE,
    };
  },
  watch: {
    mode: {
      handler(newVal) {
        this.connector.setDisplayMode(newVal);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.renderObject-container {
  .flexLayout(row, center, center);
  background: @brighterTheme-backgroundColor;
  height: 20px;
  > .renderObject-elem {
    .flexLayout(row, center, center);
    padding: 0 @box-padding / 2;
    .transitionSetting({
      background: @themeDarkHover-color;
    });
    border-left: 1px solid @darkestTheme-backgroundColor;
    cursor: pointer;
  }
  > .renderObject-elem:first-child {
    border-left: unset;
  }
  > .active-elem {
    background: @theme-color;
  }
}
</style>
