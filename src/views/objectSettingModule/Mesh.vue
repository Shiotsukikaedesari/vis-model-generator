<template>
  <div class="Mesh-container">
    <de-collapse-layout label="设置" icon="#iconshezhi" arrowPosition="left">
      <template #container>
        <de-controller-select
          label="看向目标"
          :options="objectList"
          :prop="{
            label: 'name',
            value: 'vid',
          }"
          :animation="{
            target: config.vid,
            attribute: 'lookAt',
          }"
          v-model="config.lookAt"
        >
        </de-controller-select>
      </template>
    </de-collapse-layout>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  computed: {
    objectList() {
      const list = [
        {
          name: "无",
          vid: "",
        },
      ];
      const nameMap = this.$store.getters["attribute/nameMap"];
      const meshMap = this.$store.getters["model/get"];
      Object.keys(meshMap).forEach((vid) => {
        if (vid !== this.config.vid) {
          list.push({
            name: nameMap[vid],
            vid,
          });
        }
      });
      const cameraMap = this.$store.getters["camera/get"];
      Object.keys(cameraMap).forEach((vid) => {
        list.push({
          name: nameMap[vid],
          vid,
        });
      });
      const light = this.$store.getters["light/get"];
      Object.keys(light).forEach((vid) => {
        list.push({
          name: nameMap[vid],
          vid,
        });
      });
      return list;
    },
  },
};
</script>

<style lang="less" scoped></style>
