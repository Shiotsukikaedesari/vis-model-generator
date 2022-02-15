<template>
  <div class="loaderMesh-container">
    <collapse-layout
      v-for="(item, index) in model"
      :key="index"
      icon="#iconkucunfenxi"
      :label="item.type"
    >
      <template #container>
        <div class="loaderMesh-main">
          <div
            class="loaderMesh-elem"
            v-for="(childrenItem, childrenIndex) in item.children"
            :key="childrenIndex"
            @click="addModel(item.type, childrenItem)"
          >
            <div
              class="element-icon-box"
              :style="{ backgroundImage: `url('${childrenItem.poster}')` }"
            ></div>
            <div class="element-title" v-text="childrenItem.name"></div>
          </div>
        </div>
      </template>
    </collapse-layout>
  </div>
</template>

<script>
import collapseLayout from "@/components/collapseLayout";
import { v4 as getUuid } from "uuid";

export default {
  components: {
    collapseLayout,
  },
  data() {
    return {
      model: "",
      loaderMesh: {
        icon: "#iconkucunfenxi",
      },
    };
  },
  methods: {
    addModel(type, item) {
      const loaderMap = {
        obj: "VisOBJLoader",
        fbx: "VisFBXLoader",
      };
      this.$store.commit("loadingManager/load", {
        url: item.url,
        loader: loaderMap[type],
        callBackFun: () => {
          const geometryConfig = this.loaderMesh.getGeometryConfig();
          const meshConfig = this.loaderMesh.getMeshConfig();

          geometryConfig.vid = getUuid();
          geometryConfig.url = item.url;

          meshConfig.vid = getUuid();
          meshConfig.icon = this.loaderMesh.icon;
          meshConfig.name = `${item.name}${meshConfig.vid.slice(-2)}`;

          geometryConfig.object = meshConfig.vid;
          meshConfig.geometry = geometryConfig.vid;
          this.$store.commit("action/meshAdd", { geometryConfig, meshConfig });
        },
      });
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
@boxWidth: 75px;
.loaderMesh-main {
  .flexLayout(row, space-around, center);
  flex-wrap: wrap;
  width: 100%;
  .loaderMesh-elem {
    margin-bottom: @box-margin;
    cursor: pointer;
    width: @boxWidth;
    > .element-icon-box {
      .boxSetting(100%, 55px);
      background: @brighterTheme-backgroundColor;
      margin-bottom: @box-margin;
      .flexLayout(row, center, center);
      .transitionSetting({
        filter: sepia(60%);
      });
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
    > .element-title {
      width: 100%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
