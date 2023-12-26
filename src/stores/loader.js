import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loader", () => {
  const showing = ref(true);

  function show() {
    showing.value = true;
  }

  function hide() {
    showing.value = false;
  }

  const showingValue = computed(() => showing.value);

  return { showingValue, show, hide };
});
