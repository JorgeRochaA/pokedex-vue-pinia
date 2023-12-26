<template>
  <div class="view home-view">
    <h1>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
      dignissimos ipsum voluptatibus quae. Vel, consectetur vero perferendis eum
      blanditiis natus pariatur doloremque sunt placeat qui laborum. Explicabo
      dignissimos et unde?
    </h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Loader from "@/components/shared/Loader.vue";
import { useLoaderStore } from "../stores/loader";

const loader = useLoaderStore();

const showLoader = () => {
  loader.show();
  setTimeout(() => {
    loader.hide();
  }, 2000);
};

// onMounted(() => {
//   showLoader();
// });
</script>

<style lang="scss" scoped>
.home-view {
  background: red;
}
</style>
