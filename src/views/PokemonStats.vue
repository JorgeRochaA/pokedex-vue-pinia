<template>
  <div class="view pokemon-stats-view">
    <div
      class="pokemon-stats-container"
      :class="currentPokemonStore.currentPokemon?.types[0].type.name"
    >
      <PokemonStatsNavbar />
      <div class="pokeball-container">
        <img :src="getImageUrl('shadow/pokeball-shadow.svg')" alt="poke" />
      </div>
      <div class="pokemonStats">
        <div class="pokemon-img">
          <div class="img-container" id="img-container">
            <img
              class="animated-img"
              :src="
                currentPokemonStore.currentPokemon?.sprites?.other.home
                  .front_default
              "
              :alt="currentPokemonStore.currentPokemon?.name"
            />
          </div>
        </div>
        <div class="stats-container">
          <NextPrevious />
          <div class="data-container">
            <PokemonData />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PokemonStatsNavbar from "../components/PokemonStatsNavbar.vue";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useCurrentPokemonStore } from "../stores/currentPokemon";
import { getImageUrl } from "../utils/utils";
import NextPrevious from "../components/NextPrevious.vue";
import PokemonData from "../components/PokemonData.vue";

const currentPokemonStore = useCurrentPokemonStore();
const router = useRouter();

onMounted(() => {
  const pokemonId = router.currentRoute._value.params.id;
  if (pokemonId < 1 || pokemonId > 1025 || isNaN(pokemonId)) {
    // 1025 change if pokemon API changes its number of pokemons
    router.push({ name: "home" });
  } else {
    currentPokemonStore.getCurrentPokemon(pokemonId);
  }
});

const addAnimation = () => {
  let img = document.querySelector(".animated-img");
  img.style.display = "none";
  img.classList.remove("animated");
  setTimeout(() => {
    img.style.display = "initial";
    img.classList.add("animated");
  }, 100);
};

watch(
  () => currentPokemonStore.currentPokemon,
  () => {
    addAnimation();
  }
);
</script>

<style scoped lang="scss">
.pokemon-stats-container {
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  transition: 0.5s;

  .pokeball-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    pointer-events: none;
    display: flex;
    justify-content: flex-end;
    img {
      height: 300px;
      transform: rotate(320deg);
    }
  }

  @mixin mb_50px {
    margin-bottom: 50px;
  }
  @mixin define_height($p_height) {
    min-height: $p_height !important;
  }

  .pokemonStats {
    width: 90vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include mb_50px;

    .pokemon-img {
      margin-top: 30px;
      height: 150px;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;

      .img-container {
        height: 250px;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;

        img {
          margin-top: 30px;
          height: 100%;
          position: absolute;
          pointer-events: none;
          z-index: 4;
          &.animated {
            animation: slide 1s ease 0s 1 normal forwards;
          }
        }
      }
    }

    .stats-container {
      height: 600px;
      width: 100%;
      border-radius: 10px;
      background-color: white;
      position: relative;
      z-index: 2;
      .data-container {
        height: calc(100% - 80px);
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
    }
  }
  @media screen and (min-width: 700px) {
    .img-container {
      justify-content: center;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
    .img-container {
      justify-content: center;
    }
    .stats-container {
      @include mb_50px;
      @include define_height(400px);
    }
  }

  @media only screen and (min-width: 576px) and (max-width: 767px) {
    .img-container {
      justify-content: center;
    }
    .stats-container {
      @include mb_50px;
      @include define_height(500px);
    }
  }

  @media only screen and (max-width: 575px) {
    .img-container {
      justify-content: center;
    }
    .stats-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      @include mb_50px;
      @include define_height(500px);
    }
  }

  @media only screen and (max-width: 410px) {
    .stats-container,
    .pokemonStats {
      height: 1050px;
      background: white;
    }
  }
  // Animation
  @keyframes slide {
    0% {
      transform: translateX(-150%);
    }

    100% {
      transform: translateX(0px);
    }
  }

  &.normal {
    background-color: #a8a77a;
  }
  &.fire {
    background-color: #fd7d24;
  }
  &.water {
    background-color: #4a90da;
  }
  &.electric {
    background-color: #f7d02c;
  }
  &.grass {
    background-color: #62b957;
  }
  &.ice {
    background-color: #96d9d6;
  }
  &.fighting {
    background-color: #c22e28;
  }
  &.poison {
    background-color: #a33ea1;
  }
  &.ground {
    background-color: #e2bf65;
  }
  &.flying {
    background-color: #748fc9;
  }
  &.psychic {
    background-color: #f95587;
  }
  &.bug {
    background-color: #a6b91a;
  }
  &.rock {
    background-color: #b6a136;
  }
  &.ghost {
    background-color: #735797;
  }
  &.dragon {
    background-color: #0f6ac0;
  }
  &.dark {
    background-color: #58575f;
  }
  &.steel {
    background-color: #417d9a;
  }
  &.fairy {
    background-color: #ed6ec7;
  }
}
</style>
