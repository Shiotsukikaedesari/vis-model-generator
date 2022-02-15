<template>
  <div class="objectLibrary-container">
    <side-tabs flip cache>
      <side-tab-item icon="#iconkucunfenxi" title="模型">
        <loader-mesh-library></loader-mesh-library>
      </side-tab-item>
      <side-tab-item icon="#iconcaizhi" title="材质">
        <material-library></material-library>
      </side-tab-item>
      <side-tab-item icon="#icontexture" title="贴图">
        <texture-library></texture-library>
      </side-tab-item>
    </side-tabs>
  </div>
</template>

<script>
import sideTabs from "@/components/sideTabs";
import sideTabItem from "@/components/sideTabItem";
// 模型
const loaderMeshLibrary = () => import("./objectLibrary/loaderMeshLibrary.vue");
// 材质
const materialLibrary = () => import("./objectLibrary/materialLibrary");
// 贴图
const textureLibrary = () => import("./objectLibrary/textureLibrary");

export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: {
    sideTabs,
    sideTabItem,
    materialLibrary,
    textureLibrary,
    loaderMeshLibrary,
  },
};
</script>

<style lang="less" scoped>
.objectLibrary-container {
  .boxSetting();
}
</style>
