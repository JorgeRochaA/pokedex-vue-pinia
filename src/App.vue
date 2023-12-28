<script setup>
import { watch } from "vue";
import { RouterView } from "vue-router";
import Loader from "./components/shared/Loader.vue";
import { useLoaderStore } from "./stores/loader";

const loaderStore = useLoaderStore();

watch(
  () => loaderStore.showingValue,
  () => {
    if (loaderStore.showingValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);
</script>

<template>
  <Loader v-if="loaderStore.showingValue" />
  <RouterView />
</template>

<style lang="scss">
@font-face {
  font-family: "SF Pro Display";
  src: url("./assets/fonts/SFProDisplay/SFProDisplay.ttf");
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.view {
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
