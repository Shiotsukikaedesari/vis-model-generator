<template>
  <div class="materialSettingModule-container">
    <de-collapse-layout
      v-if="config"
      label="材质"
      icon="#iconcaizhishezhi"
      arrowPosition="left"
    >
      <template #container>
        <de-controller-input
          :keyframe="false"
          label="名称"
          v-model="materialName"
        >
        </de-controller-input>
        <de-controller-input
          :keyframe="false"
          label="类型"
          v-model="config.label"
          disabled
        >
        </de-controller-input>
      </template>
    </de-collapse-layout>
    <components :config="config" :is="type"> </components>
  </div>
</template>

<script>
import MeshStandardMaterial from "../materialSettingModule/MeshStandardMaterial";
import VisMeshPhysicalMaterial from "../materialSettingModule/VisMeshPhysicalMaterial";

export default {
  components: {
    MeshStandardMaterial,
    VisMeshPhysicalMaterial,
  },
  computed: {
    config() {
      return this.$store.getters["activeConfig/getMaterial"];
    },
    type() {
      return this.config?.type;
    },
    materialName: {
      get() {
        return this.$store.getters["attribute/getName"](this.config.vid);
      },
      set(value) {
        this.$store.commit("attribute/setName", {
          vid: this.config.vid,
          name: value,
        });
      },
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.materialSettingModule-container {
}
</style>
