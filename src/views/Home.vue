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

    <div class="pagination-container">
      <button
        @click="pokemonsStore.goPreviousPage()"
        v-if="pokemonsStore.currentPage > 1"
      >
        prev
      </button>
      <button
        @click="pokemonsStore.goNextPage()"
        v-if="pokemonsStore.currentPage <= 20"
      >
        next
      </button>
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
});
</script>

<style lang="scss" scoped>
.home-view {
  @font-face {
    font-family: "SF Pro Display";
    src: url("../assets/fonts/SFProDisplay/SFProDisplay.ttf");
  }
  background: white;
  .cards-container {
    display: grid;
    place-items: center;
    justify-content: center;
    grid-template-columns: auto auto auto auto auto;
    gap: 2rem;
    margin: 3rem 0;
  }
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    gap: 1rem;
    button {
      display: grid;
      place-items: center;
      width: 150px;
      height: 42px;
      align-items: center;
      background: #333333;
      //font
      color: #fff;
      font-family: "SF Pro Display";
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      border-radius: 5px;
      border: none;
      transition: 0.5s;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
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

@media screen and (max-width: 350px) {
  .home-view {
    .pagination-container {
      flex-direction: column;
      button {
        width: 50%;
      }
    }
  }
}
</style>
