import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCurrentPokemonStore = defineStore("currentPokemon", () => {
  const currentPokemonRef = ref(null);

  const getCurrentPokemon = (id) => {
    currentPokemon.value = null;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        currentPokemonRef.value = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const currentPokemon = computed(() => currentPokemonRef.value);

  return { getCurrentPokemon, currentPokemon };
});
