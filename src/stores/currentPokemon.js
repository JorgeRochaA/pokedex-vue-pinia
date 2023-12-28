import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useCurrentPokemonStore = defineStore("currentPokemon", () => {
  const currentPokemonRef = ref(null);

  const getCurrentPokemon = async (id) => {
    try {
      const [pokemonResponse, speciesResponse] = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`),
      ]);

      currentPokemonRef.value = pokemonResponse.data;
      currentPokemonRef.value.species = speciesResponse.data;
    } catch (error) {
      console.error(error);
    }
  };

  const currentPokemon = computed(() => currentPokemonRef.value);

  return { getCurrentPokemon, currentPokemon };
});
