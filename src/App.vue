<template>
  <div id="app">
    <editor-frame></editor-frame>
    <loading-manager v-show="showLoading"></loading-manager>
  </div>
</template>

<script>
import editorFrame from "./views/editorFrame";

const loadingManager = () => import("./views/loadingManager");
export default {
  components: {
    editorFrame,
    loadingManager,
  },
  data() {
    return {};
  },
  computed: {
    showLoading() {
      return this.$store.getters["loadingManager/showLoading"];
    },
  },
  methods: {},
  mounted() {
    NProgress.done();
  },
};
</script>

<style lang="less" scoped>
#app {
  .boxSetting();
}
</style>
