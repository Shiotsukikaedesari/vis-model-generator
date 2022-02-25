<template>
  <div class="right-part">
    <el-button
      size="mini"
      circle
      type="primary"
      v-tooltip.top="'本地导入'"
      icon="el-icon-folder-opened"
      @click="importData"
    ></el-button>
    <el-button
      size="mini"
      circle
      type="primary"
      v-tooltip.top="'在线导入'"
      icon="el-icon-sold-out"
      @click="importDataOnline"
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

    <input
      ref="importInput"
      type="file"
      style="display: none"
      @change="fileHandler"
    />

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
import { VisEngine } from "../../assets/js/VisFrame";
import { validate } from "uuid";
import Vue from "vue";
export default {
  data() {
    return {
      exportDialogVisiable: false,
      exportName: "vis-model-config",
    };
  },
  methods: {
    importData() {
      this.$refs.importInput.click();
    },
    importDataOnline() {
      this.$prompt("请输入在线配置地址：", "在线导入", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        this.axios.get(value).then((res) => {
          const data = res;
          console.log(data);
          VisEngine.loadConfigAsync(Vue.observable(data))
            .then(() => {
              this.$message.success("导入成功！");
              this.$store.commit("material/notify");
              this.$store.commit("texture/notify");
            })
            .catch((err) => {
              console.error(err);
              this.$message.error("导入失败！");
            });
        });
      });
    },
    fileHandler() {
      const file = this.$refs.importInput.files[0];

      if (!file) {
        return false;
      }

      // 文件格式
      if (file.name.split(".").pop() !== "json") {
        this.$message.warning("文件格式有误！");
        return false;
      }
      const message = this.$message({
        showClose: true,
        message: "正在读取文件...",
        iconClass: "el-icon-loading",
        duration: 0,
      });

      // 读取文件
      const fileReader = new FileReader();
      fileReader.readAsText(file, "utf-8");
      fileReader.onload = () => {
        message.close();
        try {
          const data = JSON.parse(fileReader.result);
          console.log(data);
          VisEngine.loadConfigAsync(Vue.observable(data))
            .then(() => {
              this.$message.success("导入成功！");
              this.$store.commit("material/notify");
              this.$store.commit("texture/notify");
            })
            .catch((err) => {
              console.error(err);
              this.$message.error("导入失败！");
            });
        } catch (error) {
          this.$message.error("文件格式有误！");
        }

        this.$refs.importInput.value = "";
      };

      fileReader.onerror = () => {
        this.$message.error("读取失败！");
      };
    },
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
.right-part {
  width: 30%;
  padding-right: @box-padding;
  .flexLayout(row, flex-end, center);
}
</style>
