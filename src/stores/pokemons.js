import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useLoaderStore } from "./loader";

export const usePokemonsStore = defineStore("pokemons", () => {
  const pokemonsRef = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(50);
  const loadingStore = useLoaderStore();

  async function getPokemons() {
    try {
      loadingStore.show();
      pokemonsRef.value = [];
      const startIndex = (currentPage.value - 1) * pageSize.value;
      let endIndex = startIndex + pageSize.value;

      if (endIndex >= 1025) {
        endIndex = 1025;
      }

      const pokemons = [];

      for (let i = startIndex; i < endIndex; i++) {
        try {
          const pokemonResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i + 1}`
          );
          pokemons.push(pokemonResponse.data);
        } catch (error) {
          console.error(error);
        }
      }

      pokemonsRef.value = pokemons.sort((a, b) => a.id - b.id);
      loadingStore.hide();
    } catch (error) {
      console.error(error);
    }
  }

  const goPreviousPage = () => {
    currentPage.value--;
    getPokemons();
  };

  const goNextPage = () => {
    currentPage.value++;
    getPokemons();
  };

  const pokemons = computed(() => pokemonsRef.value);

  return {
    getPokemons,
    pokemons,
    currentPage,
    goNextPage,
    goPreviousPage,
  };
});
