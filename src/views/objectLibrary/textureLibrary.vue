<template>
  <div class="texture-container">
    <div class="box-header">
      <el-input size="mini" prefix-icon="el-icon-search" placeholder="贴图筛选">
      </el-input>
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
          >
          </el-dropdown-item>
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
                $store.commit('activeConfig/setTexture', item.vid);
              }
            "
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
import { VisEngine } from "../../assets/js/VisFrame";

import {
  CONFIGTYPE,
  generateConfig,
  TextureDisplayer,
  MODULETYPE,
} from "vis-three";
import { v4 as getUuid } from "uuid";
export default {
  data() {
    const getImageUrl = () => new Promise((resolve, reject) => {});

    return {
      texture: [
        {
          icon: "#icontexture",
          label: "图片贴图",
          getUrl: getImageUrl,
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
      return this.$store.getters["activeConfig/getTexture"];
    },
  },
  methods: {
    // 添加贴图方法
    addtexture(item) {
      item.getUrl().then((res) => {
        // 收集没有资源的url
        const urlList = [];

        res.forEach((url) => {
          if (VisEngine.loaderManager.hasLoaded(url)) {
            item.url = url;
            this.loadTexture(item);
          } else {
            urlList.push(url);
          }
        });

        const loadTexture = (event) => {
          urlList.forEach((url) => {
            item.url = url;
            this.loadTexture({ ...item });
          });
          VisEngine.resourceManager.removeEventListener("mapped", loadTexture);
        };

        VisEngine.resourceManager.addEventListener("mapped", loadTexture);
        VisEngine.loaderManager.load(urlList);
      });
    },
    // 加载贴图方法
    loadTexture(item) {
      const config = generateConfig(item.texture, {
        vid: getUuid(),
        image: item.url,
      });

      config.label = item.label;
      config.name = `${item.label}-${config.vid.slice(-2)}`;
      this.$store.commit("texture/add", config);
      this.$nextTick(() => {
        this.syncDisplayer(config.vid);
      });
    },
    // 同步展示器
    syncDisplayer(vid) {
      this.generateDisplayer(vid);

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
    },
    // 生成展示器
    generateDisplayer(vid) {
      if (!this.$refs[vid]) {
        console.error(`can not found this dom: '${vid}'`);
        return false;
      }

      const displayer = new TextureDisplayer({
        dom: this.$refs[vid][0],
        texture: this.getTexture(vid),
      });

      displayer.render();

      this.displayerMap[vid] = displayer;
    },
    // 获取贴图
    getTexture(vid) {
      const engineConnector = VisEngine.engineConnector;
      const engine = engineConnector.getEngineSupport(VisEngine.rootRenderDom);
      const textureCompiler = engine.getCompiler(MODULETYPE.TEXTURE);
      const map = textureCompiler.getMap();
      if (!map.has(vid)) {
        console.error(
          `engine can not found this vid mapping material: '${vid}'`
        );
        return false;
      }

      return map.get(vid);
    },
  },
};
</script>

<style lang="less" scoped>
@boxWidth: 75px;
.texture-container {
  padding: @box-padding;
  .box-header {
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
