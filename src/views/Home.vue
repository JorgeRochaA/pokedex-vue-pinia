<template>
  <div class="view home-view">
    <div class="cards-container">
      <Card
        v-for="(pokemon, index) in pokemonsStore.pokemons"
        :key="index"
        :img="pokemon.sprites.other.home.front_default"
        :colorName="pokemon.types[0].type.name"
        :name="pokemon.name"
        :id="pokemon.id"
        :types="pokemon.types"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import Loader from "@/components/shared/Loader.vue";
import { useLoaderStore } from "../stores/loader";
import { usePokemonsStore } from "../stores/pokemons";
import Card from "../components/Card.vue";

const loaderStore = useLoaderStore();
const pokemonsStore = usePokemonsStore();

onMounted(() => {
  pokemonsStore.getPokemons();
  setTimeout(() => {
    console.log(pokemonsStore.pokemons);
  }, 1000);
});
</script>

<style lang="scss" scoped>
.home-view {
  background: white;
  color: black;
  .cards-container {
    display: grid;
    place-items: center;
    justify-content: center;
    grid-template-columns: auto auto auto auto auto;
    gap: 2rem;
    margin: 3rem 0;
  }
}

@media screen and (max-width: 1830px) {
  .home-view {
    .cards-container {
      grid-template-columns: auto auto auto auto;
    }
  }
}
@media screen and (max-width: 1460px) {
  .home-view {
    .cards-container {
      grid-template-columns: auto auto auto;
    }
  }
}

@media screen and (max-width: 1100px) {
  .home-view {
    .cards-container {
      grid-template-columns: auto auto;
    }
  }
}

@media screen and (max-width: 730px) {
  .home-view {
    .cards-container {
      grid-template-columns: auto;
    }
  }
}
</style>
