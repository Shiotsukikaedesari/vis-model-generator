<template>
  <div class="loaderMesh-container">
    <drag-plane :amount="2" width="100%" height="100%" :showDragsign="false">
      <template #view1>
        <collapse-layout icon="#iconkucunfenxi" label="导入模型">
          <template #container>
            <div class="model-generate">
              <el-input
                size="mini"
                placeholder="输入需要导入的模型http地址"
                v-model="modelAddress"
              ></el-input>
              <el-button size="mini" type="primary" @click="loadModel">
                导入
              </el-button>
            </div>
          </template>
        </collapse-layout>
      </template>

      <template #view2>
        <collapse-layout icon="#iconkucunfenxi" label="模型配置">
          <template #container></template>
        </collapse-layout>
      </template>
    </drag-plane>
  </div>
</template>

<script>
import dragPlane from "../../components/dragPlane.vue";
import collapseLayout from "../../components/collapseLayout.vue";
import { VisEngine } from "../../assets/js/VisFrame";
import { CONFIGTYPE, generateConfig } from "vis-three";
import { v4 as getUUid } from "uuid";

export default {
  components: {
    dragPlane,
    collapseLayout,
  },
  data() {
    return {
      modelAddress:
        "http://localhost:3000/examples/public/model/katana/katana.obj",
      // "http://localhost:8080/resource/largeBuilding1/largeBuilding1.obj",
    };
  },
  methods: {
    loadModel() {
      VisEngine.load({
        assets: [this.modelAddress],
      });

      VisEngine.resourceManager.addEventListener("mapped", (event) => {
        const config = {
          model: {},
          geometry: {},
        };
        // 把当前url中的所有结构模型取出来
        const structure = event.structureMap.get(this.modelAddress);
        const configMap = event.configMap;
        // 递归模型
        const recursionStructure = (structure) => {
          if (structure.type === "Mesh") {
            const model = generateConfig("Model", {
              vid: getUUid(),
            });
            if (structure.geometry) {
              const geometry = generateConfig(
                "LoadGeometry",
                Object.assign({}, configMap.get(structure.geometry), {
                  vid: getUUid(),
                  url: structure.geometry,
                })
              );

              model.geometry = geometry.vid;
              config.model[model.vid] = model;
              config.geometry[geometry.vid] = geometry;

              this.$store.commit("geometry/add", geometry);
              this.$store.commit("model/add", model);
            }
          }

          if (structure.children && structure.children.length) {
            structure.children.forEach((structureChild) => {
              recursionStructure(structureChild);
            });
          }
        };

        recursionStructure(structure);
      });
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.loaderMesh-container {
  .boxSetting();
}

.model-generate {
  width: 100%;
  .flexLayout(row, space-between, center);
  > .el-input {
    margin-right: @box-margin;
  }
}

.dragFlexPanel-box {
  border-width: 0 !important;
}
</style>
