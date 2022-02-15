<template>
  <div class="objectSettingModule-container" v-if="config">
    <de-collapse-layout
      :label="attributeName"
      :icon="icon"
      arrowPosition="left"
    >
      <template #container>
        <de-controller-input
          :keyframe="false"
          label="名称"
          v-model="attributeName"
        >
        </de-controller-input>
      </template>
    </de-collapse-layout>

    <components :config="config" :is="component"> </components>

    <geometry-setting-module v-if="geometry"></geometry-setting-module>
  </div>
</template>

<script>
import geometrySettingModule from "./geometrySettingModule.vue";

import Mesh from "../objectSettingModule/Mesh.vue";

export default {
  components: {
    geometrySettingModule,

    Mesh,
  },
  data() {
    return {
      displayAccuracy: 2,
    };
  },
  computed: {
    attributeName: {
      get() {
        return this.$store.getters["attribute/nameMap"][this.config.vid];
      },
      set(value) {
        this.$store.commit("attribute/setName", {
          vid: this.config.vid,
          name: value,
        });
      },
    },
    icon() {
      return this.$store.getters["attribute/iconMap"][this.config.vid];
    },

    component() {
      return this.config?.type;
    },

    config() {
      return this.$store.getters["activeConfig/getObject"];
    },

    geometry() {
      console.log(this.$store.getters["activeConfig/getGeometry"]);
      return this.$store.getters["activeConfig/getGeometry"];
    },
  },
};
</script>

<style lang="less" scoped></style>
