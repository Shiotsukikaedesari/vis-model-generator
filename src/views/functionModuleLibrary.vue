<template>
  <div class="functionModelLibrary-container">
    <side-tabs>
      <side-tab-item icon="#iconjichubianhuan" title="基础变换">
        <basic-transform-module></basic-transform-module>
      </side-tab-item>
      <side-tab-item icon="#iconzhuanshupeizhi" title="物体配置">
        <object-setting-module></object-setting-module>
      </side-tab-item>
      <side-tab-item icon="#iconcaizhishezhi" title="材质配置">
        <material-setting-module></material-setting-module>
      </side-tab-item>
      <side-tab-item icon="#icontietushezhi" title="贴图配置">
        <texture-setting-module></texture-setting-module>
      </side-tab-item>
    </side-tabs>
  </div>
</template>

<script>
import sideTabs from "@/components/sideTabs";
import sideTabItem from "@/components/sideTabItem";
const basicTransformModule = () =>
  import("./functionModuleLibrary/basicTransformModule");
const objectSettingModule = () =>
  import("./functionModuleLibrary/objectSettingModule");
const materialSettingModule = () =>
  import("./functionModuleLibrary/materialSettingModule");
const textureSettingModule = () =>
  import("./functionModuleLibrary/textureSettingModule");
export default {
  components: {
    sideTabs,
    sideTabItem,
    basicTransformModule,
    objectSettingModule,
    materialSettingModule,
    textureSettingModule,
  },
  data() {
    return {};
  },

  watch: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.functionModelLibrary-container {
  .boxSetting();
}
</style>
