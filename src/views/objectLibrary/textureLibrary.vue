<template>
  <div class="texture-container">
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
            placeholder="贴图筛选"
          ></el-input>
          <el-dropdown trigger="click" @command="addtexture">
            <el-button
              size="mini"
              icon="el-icon-circle-plus-outline"
              type="primary"
            >
              添加贴图
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in texture"
                :key="index"
                v-text="item.label"
                :command="item"
              ></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="box-container">
          <div class="texture-main">
            <div
              class="texture-elem"
              v-for="(item, index) in textureList"
              :key="index"
            >
              <div
                class="render-box"
                :class="{ active: active.vid === item.vid }"
                :id="item.vid"
                :ref="item.vid"
                @click="
                  () => {
                    $store.commit('texture/setCurrentTexture', item.vid);
                  }
                "
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
        <texture-setting-module></texture-setting-module>
      </template>
    </drag-plane>
  </div>
</template>

<script>
import dragPlane from "../../components/dragPlane.vue";
import { VisEngine } from "../../assets/js/VisFrame";
import textureSettingModule from "../functionModuleLibrary/textureSettingModule.vue";
import {
  CONFIGTYPE,
  generateConfig,
  TextureDisplayer,
  MODULETYPE,
} from "vis-three";
import { v4 as getUuid } from "uuid";
export default {
  components: {
    dragPlane,
    textureSettingModule,
  },
  props: {
    height: {
      type: Number,
    },
  },
  data() {
    return {
      texture: [
        {
          icon: "#icontexture",
          label: "图片贴图",
          texture: CONFIGTYPE.IMAGETEXTURE,
        },
      ],
      displayerMap: {}, // 材质展示器的map ： vid --> displayer
      watchMap: {}, // 监听器的map: vid --> $watch
    };
  },
  computed: {
    textureList() {
      return this.$store.getters["texture/get"];
    },
    active() {
      return this.$store.getters["texture/currentTexture"];
    },
  },
  methods: {
    // 添加贴图方法
    addtexture(item) {
      this.$prompt("输入贴图http资源地址：", `${item.label}`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        VisEngine.load(
          {
            assets: [value],
          },
          (event) => {
            const config = generateConfig(item.texture, {
              vid: getUuid(),
              url: value,
            });
            this.$store.commit("texture/add", config);

            this.$nextTick(() => {
              const vid = config.vid;

              // 生成展示器
              if (!this.$refs[vid]) {
                console.error(`can not found this dom: '${vid}'`);
                return false;
              }

              const displayer = new TextureDisplayer({
                dom: this.$refs[vid][0],
                texture: VisEngine.compilerManager.getTexture(vid),
              });

              displayer.render();

              this.displayerMap[vid] = displayer;

              // 主动监听当前对象的属性改变更新displayer
              this.watchMap[vid] = this.$watch(
                function () {
                  return this.textureList[vid];
                },
                (newVal) => {
                  this.displayerMap[vid].render();
                },
                {
                  deep: true,
                }
              );
            });
          }
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
@boxWidth: 75px;
.texture-container {
  .boxSetting();
  .box-header {
    padding: @box-padding;
    .flexLayout(row, space-between, center);
    margin-bottom: @box-margin;
    > .el-input {
      margin-right: @box-margin;
    }
  }
  .box-container {
    .texture-main {
      .flexLayout(row, space-around, center);
      flex-wrap: wrap;
      width: 100%;
      .texture-elem {
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
