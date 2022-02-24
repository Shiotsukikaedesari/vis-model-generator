<template>
  <div class="topNavigation-container">
    <div class="left-part">
      <div class="logo">
        <img src="/image/logo.png" alt="" srcset="" />
      </div>
      <div class="title">VIS-MODEL-GENERATOR</div>
    </div>
    <div class="middle-part"></div>
    <div class="right-part">
      <el-button
        size="mini"
        circle
        type="primary"
        v-tooltip.top="'本地导入'"
        icon="el-icon-folder-opened"
      ></el-button>
      <el-button
        size="mini"
        circle
        type="primary"
        v-tooltip.top="'在线导入'"
        icon="el-icon-sold-out"
      ></el-button>
      <el-button
        size="mini"
        type="primary"
        round
        icon="el-icon-folder-checked"
        v-tooltip.top="'本地导出'"
        @click="
          () => {
            exportDialogVisiable = true;
          }
        "
      ></el-button>
    </div>

    <el-dialog
      title="导出设置"
      :visible.sync="exportDialogVisiable"
      width="420px"
    >
      <el-form label-width="110px" label-position="left">
        <el-form-item label="文件名称:">
          <el-input size="mini" v-model="exportName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="exportDialogVisiable = false" size="mini">
          取 消
        </el-button>
        <el-button type="primary" @click="exportConfig" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MODULETYPE } from "vis-three";
import { VisEngine } from "../assets/js/VisFrame";
import { validate } from "uuid";
export default {
  components: {},
  data() {
    return {
      exportDialogVisiable: false,
      exportName: "vis-model-config",
    };
  },
  methods: {
    exportConfig() {
      const all = JSON.parse(VisEngine.toJSON());
      console.log(all);

      const mesh = all[MODULETYPE.MESH];
      const config = {
        assets: all.assets,
        [MODULETYPE.MESH]: mesh,
        [MODULETYPE.MATERIAL]: {},
        [MODULETYPE.GEOMETRY]: {},
        [MODULETYPE.TEXTURE]: {},
      };

      const texture = all[MODULETYPE.TEXTURE];
      const material = all[MODULETYPE.MATERIAL];
      const geometry = all[MODULETYPE.GEOMETRY];

      // 根据mesh去选入material与geometry
      Object.keys(mesh).forEach((vid) => {
        const meshConfig = mesh[vid];
        meshConfig.geometry &&
          (config[MODULETYPE.GEOMETRY][meshConfig.geometry] =
            geometry[meshConfig.geometry]);
        meshConfig.material &&
          (config[MODULETYPE.MATERIAL][meshConfig.material] =
            material[meshConfig.material]);
      });

      // 根据选入的material获取texture
      const configMaterial = config[MODULETYPE.MATERIAL];
      Object.keys(configMaterial).forEach((vid) => {
        const material = configMaterial[vid];
        Object.keys(material).forEach((key) => {
          if (
            material[key] &&
            validate(material[key]) &&
            texture[material[key]]
          ) {
            config[MODULETYPE.TEXTURE][material[key]] = texture[material[key]];
          }
        });
      });

      // 清理assets
      config.assets = config.assets.filter(
        (url) =>
          ![
            `${window.location}/resource/skyBox/snowScene/nx.jpg`,
            `${window.location}/resource/skyBox/snowScene/ny.jpg`,
            `${window.location}/resource/skyBox/snowScene/nz.jpg`,
            `${window.location}/resource/skyBox/snowScene/px.jpg`,
            `${window.location}/resource/skyBox/snowScene/py.jpg`,
            `${window.location}/resource/skyBox/snowScene/pz.jpg`,
          ].includes(url)
      );

      console.log(config);

      const blob = new Blob([JSON.stringify(config)], { type: "text/json" });

      const a = document.createElement("a");
      a.download = `${this.exportName}.json`;
      a.href = window.URL.createObjectURL(blob);
      a.click();
      this.exportDialogVisiable = false;
    },
  },
};
</script>

<style lang="less" scoped>
.topNavigation-container {
  .boxSetting();
  .flexLayout(row, space-between, center);
  > .left-part,
  .right-part {
    width: 30%;
  }
  > div:nth-child(2) {
    flex: 1;
  }
}

.left-part {
  padding-left: @box-padding;
  .flexLayout(row, flex-start, center);
  .logo {
    width: 40px;
    height: 40px;
    margin-right: @box-margin;
    img {
      .boxSetting();
      object-fit: contain;
    }
  }

  .title {
    font-weight: bold;
    white-space: nowrap;
  }
}

.right-part {
  padding-right: @box-padding;
  .flexLayout(row, flex-end, center);
}
</style>
