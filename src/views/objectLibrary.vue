<template>
  <div class="objectLibrary-container" ref="objectLibrary">
    <side-tabs flip cache>
      <side-tab-item icon="#iconkucunfenxi" title="模型">
        <loader-mesh-library :height="planeHeight"></loader-mesh-library>
      </side-tab-item>
      <side-tab-item icon="#iconcaizhi" title="材质">
        <material-library :height="planeHeight"></material-library>
      </side-tab-item>
      <side-tab-item icon="#icontexture" title="贴图">
        <texture-library :height="planeHeight"></texture-library>
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
  components: {
    sideTabs,
    sideTabItem,
    materialLibrary,
    textureLibrary,
    loaderMeshLibrary,
  },
  data() {
    return {
      activeName: "first",
      planeHeight: "",
    };
  },
  mounted() {
    this.planeHeight = this.$refs.objectLibrary.offsetHeight;
  },
};
</script>

<style lang="less" scoped>
.objectLibrary-container {
  .boxSetting();
}
</style>
