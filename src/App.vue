<template>
  <div id="app">
    <editor-frame></editor-frame>
    <loading-manager></loading-manager>
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
  computed: {},
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
