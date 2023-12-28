<template>
  <div class="info-navbar">
    <div class="arrow-container" @click="goBack()">
      <img :src="getImageUrl('arrows/arrow-left.svg')" alt="go-back" />
    </div>
    <div class="name-container">
      <h2>{{ currentPokemonStore.currentPokemon?.name }}</h2>
    </div>
    <div class="number-container">
      <h3>#{{ currentPokemonStore.currentPokemon?.id }}</h3>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCurrentPokemonStore } from "../stores/currentPokemon";
const router = useRouter();
const currentPokemonStore = useCurrentPokemonStore();
import { getImageUrl } from "../utils/utils";

const goBack = () => {
  router.push({ name: "home" });
};
</script>

<style scoped lang="scss">
@mixin display-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-navbar {
  height: 75px;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: "SF Pro Display";
  color: white;
  h2,
  h3 {
    font-size: 23px;
    font-weight: 1000;
  }

  .arrow-container {
    height: 100%;
    width: 30%;
    transition: 0.5s;
    @include display-flex;

    img {
      height: 60%;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .name-container {
    height: 100%;
    width: 40%;
    @include display-flex;

    :first-letter {
      text-transform: uppercase;
    }
  }

  .number-container {
    height: 100%;
    width: 30%;
    @include display-flex;
  }
}
</style>
