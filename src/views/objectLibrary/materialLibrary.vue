<template>
  <div class="material-container">
    <div class="box-header">
      <el-input size="mini" prefix-icon="el-icon-search" placeholder="材质筛选">
      </el-input>
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
          >
          </el-dropdown-item>
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
              $store.commit('activeConfig/setMaterial', item.vid);
            }
          "
        >
          <div
            draggable="true"
            class="render-box"
            :class="{ active: activeMaterial.vid === item.vid }"
            :id="item.vid"
            :ref="item.vid"
            @dragstart="dragstart($event, item.vid)"
          ></div>
          <div class="operate-box" v-tooltip.top="'删除'">
            <vis-icon code="#iconshanchu"></vis-icon>
          </div>
          <div
            class="element-title"
            v-text="$store.getters['attribute/getName'](item.vid)"
            v-tooltip.bottom="$store.getters['attribute/getName'](item.vid)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as getUuid } from "uuid";
import {
  CONFIGTYPE,
  generateConfig,
  MaterialDisplayer,
  MODULETYPE,
} from "vis-three";

export default {
  components: {},
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
    activeMaterial() {
      return this.$store.getters["activeConfig/getMaterial"];
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
      let vid = "";
      if (item.fun) {
        item.fun((file) => {
          // 检查加载器缓存有无加载
          this.$store.commit("loadingManager/load", {
            url: file.url,
            loader: file.loader,
            callBackFun: () => {
              const loaderConfigList =
                this.$store.getters["loadingManager/get"][file.url];
              loaderConfigList.forEach((elem) => {
                let config = item.getConfig();
                config.vid = getUuid();
                config.label = item.label;
                config.name = `${file.name}-${config.vid.slice(-2)}`;
                config = Object.assign(config, elem);
                vid = config.vid;
                this.$store.commit("material/add", config);
              });
            },
          });
        });
      } else {
        const config = generateConfig(item.material, {
          vid: getUuid(),
        });
        config.label = item.label;
        config.name = `${item.label}${config.vid.slice(-2)}`;
        vid = config.vid;
        this.$store.commit("material/add", config);
      }

      this.$nextTick(() => {
        this.generateDisplayer(vid);

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
  padding: @box-padding;
  .box-header {
    .flexLayout(row, space-between, center);
    margin-bottom: @box-margin;
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
