<template>
  <div class="type-container">
    <img
      v-for="type in currentPokemonStore.currentPokemon?.types"
      :key="type.slot"
      :src="getImageUrl(`badges/${type.type.name}.svg`)"
      :alt="type.type.name"
    />
  </div>
</template>

<script setup>
import { getImageUrl } from "../utils/utils";
import { useCurrentPokemonStore } from "../stores/currentPokemon";

const currentPokemonStore = useCurrentPokemonStore();
</script>

<style lang="scss" scoped>
.type-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  width: fit-content;
  gap: 8px;
  margin-bottom: 24px;
  width: 100%;
  img {
    height: 35px;
  }
}

@media (max-width: 410px) {
  .type-container {
    justify-content: center;
  }
}
</style>
