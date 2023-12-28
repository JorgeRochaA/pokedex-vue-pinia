<template>
  <div class="pokemon-evolution-container">
    <img :src="getImageUrl(`generations/${pokemonGeneration}.svg`)" alt="" />
    <div class="evolutions-container">
      <h2>Evolutions</h2>
      <Card
        class="evolution-card"
        v-for="(evolution, index) in pokemonEvolution"
        :key="index"
        :name="evolution?.data?.name"
        :id="evolution?.data?.id"
        :img="evolution?.data?.sprites?.other.home.front_default"
        :types="evolution?.data?.types"
        :colorName="evolution?.data?.types?.[0].type.name"
        :isHome="false"
      />
    </div>
  </div>
</template>

<script setup>
import { useCurrentPokemonStore } from "../stores/currentPokemon";
import { computed } from "vue";
import { getImageUrl } from "../utils/utils";
import Card from "./Card.vue";
const currentPokemonStore = useCurrentPokemonStore();

const pokemonGeneration = computed(() => {
  return currentPokemonStore.currentPokemon?.species.generation.name;
});

const pokemonEvolution = computed(() => {
  return currentPokemonStore.currentPokemon?.evolutions;
});
</script>

<style lang="scss" scoped>
.pokemon-evolution-container {
  display: flex;
  flex-direction: column;
  .evolutions-container {
    h2 {
      color: black;
      font-family: Poppins;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-top: 15px;
    }

    .evolution-card {
      margin-top: 15px;
    }
  }
}

@media only screen and (max-width: 410px) {
  .pokemon-evolution-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 334px;
      max-width: 80vw;
    }
    .evolutions-container {
      max-width: 80vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h2 {
        color: black;
        font-family: Poppins;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 15px;
      }

      .evolution-card {
        margin-top: 15px;
        max-width: 100%;
      }
    }
  }
}
</style>
