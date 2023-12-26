import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonsStore = defineStore("pokemons", () => {
  const pokemonsRef = ref([]);

  async function getPokemons() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=50"
      );
      const pokemonData = response.data.results;
      const pokemons = [];
      await Promise.all(
        pokemonData.map(async (pokemon) => {
          try {
            const pokemonResponse = await axios.get(pokemon.url);
            pokemons.push(pokemonResponse.data);
          } catch (error) {
            console.error(error);
          }
        })
      );

      pokemonsRef.value = pokemons.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error(error);
    }
  }

  const pokemons = computed(() => {
    return pokemonsRef.value;
  });

  return { getPokemons, pokemons };
});
