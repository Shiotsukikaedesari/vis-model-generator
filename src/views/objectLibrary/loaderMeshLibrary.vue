<template>
  <div class="loaderMesh-container">
    <drag-plane
      :amount="2"
      width="100%"
      :height="`${height}px`"
      :showDragsign="false"
    >
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
        <collapse-layout icon="#iconkucunfenxi" label="几何配置">
          <template #container>
            <geometry-setting-module></geometry-setting-module>
          </template>
        </collapse-layout>
        <collapse-layout icon="#iconkucunfenxi" label="变换配置">
          <template #container>
            <basic-transform-model></basic-transform-model>
          </template>
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

const basicTransformModel = () =>
  import("../functionModuleLibrary/basicTransformModule.vue");

const geometrySettingModule = () =>
  import("../functionModuleLibrary/geometrySettingModule.vue");
export default {
  components: {
    dragPlane,
    collapseLayout,
    basicTransformModel,
    geometrySettingModule,
  },
  props: {
    height: {
      type: Number,
    },
  },
  data() {
    return {
      modelAddress: "",
    };
  },
  methods: {
    loadModel() {
      VisEngine.loadConfig(
        {
          assets: [this.modelAddress],
        },
        (event) => {
          // 把当前url中的所有结构模型取出来
          const structure = event.structureMap.get(this.modelAddress);
          const configMap = event.configMap;
          // 递归模型
          const recursionStructure = (structure) => {
            if (structure.type === "Mesh") {
              const mesh = generateConfig("Mesh");
              if (structure.geometry) {
                const geometry = generateConfig(
                  "LoadGeometry",
                  Object.assign({}, configMap.get(structure.geometry), {
                    url: structure.geometry,
                  })
                );

                mesh.geometry = geometry.vid;

                this.$store.commit("geometry/add", geometry);
                this.$store.commit("mesh/add", mesh);
              }
            }

            if (structure.children && structure.children.length) {
              structure.children.forEach((structureChild) => {
                recursionStructure(structureChild);
              });
            }
          };

          recursionStructure(structure);
        }
      );
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
