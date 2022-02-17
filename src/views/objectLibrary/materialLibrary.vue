<template>
  <div class="material-container">
    <drag-plane
      :amount="2"
      width="100%"
      :height="`${height}px`"
      :showDragsign="false"
    >
      <template #view1>
        <div class="box-header">
          <el-input
            size="mini"
            prefix-icon="el-icon-search"
            placeholder="材质筛选"
          ></el-input>
          <el-dropdown trigger="click" @command="addMaterial">
            <el-button
              size="mini"
              icon="el-icon-circle-plus-outline"
              type="primary"
            >
              添加材质
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in material"
                :key="index"
                v-text="item.label"
                :command="item"
              ></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="box-container">
          <div class="material-main">
            <div
              class="material-elem"
              v-for="(item, index) in materialList"
              :key="index"
              @mousedown="
                () => {
                  $store.commit('material/setCurrentMaterial', item.vid);
                }
              "
            >
              <div
                draggable="true"
                class="render-box"
                :class="{ active: currentMaterial.vid === item.vid }"
                :id="item.vid"
                :ref="item.vid"
                @dragstart="dragstart($event, item.vid)"
              ></div>
              <div class="operate-box" v-tooltip.top="'删除'">
                <vis-icon code="#iconshanchu"></vis-icon>
              </div>
              <div
                class="element-title"
                v-text="item.vid"
                v-tooltip.bottom="item.vid"
              ></div>
            </div>
          </div>
        </div>
      </template>

      <template #view2>
        <material-setting-module></material-setting-module>
      </template>
    </drag-plane>
  </div>
</template>

<script>
import { v4 as getUuid } from "uuid";
import dragPlane from "../../components/dragPlane.vue";
import { VisEngine } from "../../assets/js/VisFrame";
import materialSettingModule from "../functionModuleLibrary/materialSettingModule.vue";
import { CONFIGTYPE, generateConfig, MaterialDisplayer } from "vis-three";

export default {
  components: {
    dragPlane,
    materialSettingModule,
  },
  props: {
    height: {
      type: Number,
    },
  },
  data() {
    return {
      material: [
        {
          icon: "#icondengpao",
          label: "标准网格材质",
          material: CONFIGTYPE.MESHSTANDARDMATERIAL,
        },
      ],
      displayerMap: {}, // 材质展示器的map ： vid --> displayer
      watchMap: {}, // 监听器的map: vid --> $watch
      timer: "",
      throttleTime: 1000 / 45,
      canMove: true,
    };
  },
  computed: {
    materialList() {
      return this.$store.getters["material/get"];
    },
    currentMaterial() {
      return this.$store.getters["material/currentMaterial"];
    },
  },
  methods: {
    dragstart(event, vid) {
      event.preventDefault();
      this.$store.commit("material/setDraggedMaterial", vid);
      // 获取当前节点canvas讲canvas转为img
      const dragTarget = event.target;
      const canvasDomList = dragTarget.getElementsByTagName("canvas");
      if (canvasDomList.length > 0) {
        this.$store.commit("material/dragging", true);
        const canvas = canvasDomList[0];
        const image = new Image();
        image.src = canvas.toDataURL("image/png");
        image.style.position = "fixed";
        image.style.zIndex = 20;
        image.style.opacity = 0.6;
        document.body.appendChild(image);
        const dragMove = ($event) => {
          if (this.canMove) {
            this.canMove = false;
            this.timer = setTimeout(() => {
              image.style.top = `${$event.clientY + 10}px`;
              image.style.left = `${$event.clientX + 10}px`;
              this.canMove = true;
            }, this.throttleTime);
          }
        };
        const dragOver = ($event) => {
          document.body.removeChild(image);
          document.body.removeEventListener("mousemove", dragMove);
          document.body.removeEventListener("mouseup", dragOver);
        };
        document.body.addEventListener("mousemove", dragMove);
        document.body.addEventListener("mouseup", dragOver);
      } else {
        console.error("can not found canvas in this dom");
      }
    },

    addMaterial(item) {
      const config = generateConfig(item.material, {
        vid: getUuid(),
      });
      this.$store.commit("material/add", config);
      this.$store.commit("material/setCurrentMaterial", config.vid);

      this.$nextTick(() => {
        const vid = config.vid;
        // 生成展示器
        if (!this.$refs[vid]) {
          console.error(`can not found this dom: '${vid}'`);
          return false;
        }

        const displayer = new MaterialDisplayer({
          dom: this.$refs[vid][0],
          material: VisEngine.compilerManager.getMaterial(vid),
        });

        displayer.render();

        this.displayerMap[vid] = displayer;

        // 主动监听当前对象的属性改变更新displayer
        this.watchMap[vid] = this.$watch(
          function () {
            return this.materialList[vid];
          },
          (newVal) => {
            this.displayerMap[vid].render();
          },
          {
            deep: true,
          }
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
@boxWidth: 75px;
.material-container {
  .boxSetting();
  .box-header {
    .flexLayout(row, space-between, center);
    margin-bottom: @box-margin;
    padding: @box-padding;
    > .el-input {
      margin-right: @box-margin;
    }
  }
  .box-container {
    .material-main {
      .flexLayout(row, space-around, center);
      flex-wrap: wrap;
      width: 100%;
      .material-elem {
        position: relative;
        .boxSetting(@boxWidth, unset);
        margin-bottom: @box-margin;
        cursor: pointer;
        &:hover .operate-box {
          // display: block;
          opacity: 1;
        }
        > .render-box {
          position: relative;
          .boxSetting(100%, 55px);
          background: @brighterTheme-backgroundColor;
          margin-bottom: @box-margin;
          .flexLayout(row, center, center);
          .transitionSetting({
          background: @themeHover-color;
        });
        }
        .operate-box {
          opacity: 0;
          // display: none;
          padding: @box-padding / 3;
          .absolutePosition(0, 0, unset, unset);
          background: fade(@darkestTheme-backgroundColor, 60);
          .transitionSetting();
          z-index: 11;
        }
        > .element-title {
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .active {
          &::after {
            content: "";
            .boxSetting();
            box-shadow: 0 0 0 2px @theme-color inset;
            .absolutePosition();
            z-index: 10;
          }
        }
      }
    }
  }
}
</style>
