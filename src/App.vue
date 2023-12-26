<script setup>
import { RouterView } from "vue-router";
import Loader from "@/components/shared/Loader.vue";
import { useLoaderStore } from "./stores/loader";

const loader = useLoaderStore();
</script>

<template>
  <Loader v-if="loader.showingValue" />
  <RouterView />
</template>

<style lang="scss">
/* @font-face {
  font-family: "SF Pro Display";
  src: url("./fonts/SFProDisplay/SFProDisplay.ttf");
} */
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
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
