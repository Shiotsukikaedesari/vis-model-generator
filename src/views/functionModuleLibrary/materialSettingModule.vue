<template>
  <div class="materialSettingModule-container">
    <collapse-layout
      v-if="config"
      label="材质"
      icon="#iconcaizhishezhi"
      arrowPosition="left"
    >
      <template #container>
        <vis-controller-input
          :keyframe="false"
          label="类型"
          v-model="config.label"
          disabled
        ></vis-controller-input>
      </template>
    </collapse-layout>
    <components :config="config" :is="type"></components>
  </div>
</template>

<script>
import collapseLayout from "../../components/collapseLayout.vue";

const MeshStandardMaterial = () =>
  import("../materialSettingModule/MeshStandardMaterial");
const VisMeshPhysicalMaterial = () =>
  import("../materialSettingModule/VisMeshPhysicalMaterial");

export default {
  components: {
    collapseLayout,
    MeshStandardMaterial,
    VisMeshPhysicalMaterial,
  },
  computed: {
    config() {
      return this.$store.getters["material/currentMaterial"];
    },
    type() {
      return this.config?.type;
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.materialSettingModule-container {
}
</style>
