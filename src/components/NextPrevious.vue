<template>
  <div class="spacer">
    <img
      v-if="currentPokemonStore.currentPokemon?.id > 1"
      class="left"
      :src="getImageUrl('arrows/arrow-right.svg')"
      alt="arrow-left"
      @click="navigatePokemon('previous')"
    />

    <img
      v-if="currentPokemonStore.currentPokemon?.id < 1025"
      class="right"
      :src="getImageUrl('arrows/arrow-right.svg')"
      alt="arrow-right"
      @click="navigatePokemon('next')"
    />
  </div>
</template>

<script setup>
import { getImageUrl } from "../utils/utils";
import { useCurrentPokemonStore } from "../stores/currentPokemon";
import { useRouter } from "vue-router";

const currentPokemonStore = useCurrentPokemonStore();
const router = useRouter();

const navigatePokemon = (direction) => {
  const currentPokemonId = currentPokemonStore.currentPokemon?.id;
  const newPokemonId =
    direction === "next" ? currentPokemonId + 1 : currentPokemonId - 1;

  router.push({ name: "pokemon", params: { id: newPokemonId } });

  currentPokemonStore.getCurrentPokemon(newPokemonId);
};
</script>

<style lang="scss" scoped>
.spacer {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    margin-left: 20px;
    height: 35px;
    transform: rotate(-180deg);
    &:hover {
      cursor: pointer;
    }
  }

  .right {
    margin-left: auto;
    margin-right: 20px;
    height: 35px;
    position: relative;
    z-index: 2;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
