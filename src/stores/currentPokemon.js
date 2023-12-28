import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useLoaderStore } from "./loader";

export const useCurrentPokemonStore = defineStore("currentPokemon", () => {
  const currentPokemonRef = ref(null);
  const loaderStore = useLoaderStore();

  const getCurrentPokemon = async (id) => {
    loaderStore.show();
    try {
      const [pokemonResponse, speciesResponse] = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`),
      ]);

      currentPokemonRef.value = pokemonResponse.data;
      currentPokemonRef.value.species = speciesResponse.data;
      currentPokemonRef.value.evolutions = [];

      const evolutionChainResponse = await axios.get(
        currentPokemonRef.value.species.evolution_chain.url
      );

      getEvolution(evolutionChainResponse.data.chain);

      for (const evolution of currentPokemonRef.value.evolutions) {
        const evolutionResponse = await axios.get(evolution.url);
        evolution.data = evolutionResponse.data;
        const pokemonData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${evolution.data.id}/`
        );
        evolution.data.sprites = pokemonData.data.sprites;
        evolution.data.types = pokemonData.data.types;
      }

      getStrengths();

      getWeaknesses();

      loaderStore.hide();
    } catch (error) {
      loaderStore.hide();
      console.error(error);
    }
  };

  const getEvolution = (evolution_chain) => {
    const currentSpecies = evolution_chain.species;
    if (
      !currentPokemonRef.value.evolutions.some(
        (species) => species.name === currentSpecies.name
      )
    ) {
      currentPokemonRef.value.evolutions.push(currentSpecies);
    }

    if (evolution_chain.evolves_to.length > 0) {
      getEvolution(evolution_chain.evolves_to[0]);
    }
  };

  const getStrengths = async () => {
    currentPokemonRef.value.strengths = [];
    const strengths = [];

    for (const type of currentPokemonRef.value.types) {
      const typeResponse = await axios.get(type.type.url);
      const doubleDamageTo =
        typeResponse.data.damage_relations.double_damage_to;

      doubleDamageTo.forEach((strength) => {
        if (
          !strengths.some(
            (existingStrength) => existingStrength.name === strength.name
          )
        ) {
          strengths.push(strength);
        }
      });
    }

    currentPokemonRef.value.strengths = strengths;
  };

  const getWeaknesses = async () => {
    currentPokemonRef.value.weaknesses = [];
    const weaknesses = [];

    for (const type of currentPokemonRef.value.types) {
      const typeResponse = await axios.get(type.type.url);
      const doubleDamageFrom =
        typeResponse.data.damage_relations.double_damage_from;

      doubleDamageFrom.forEach((weakness) => {
        if (
          !weaknesses.some(
            (existingWeakness) => existingWeakness.name === weakness.name
          )
        ) {
          weaknesses.push(weakness);
        }
      });
    }

    currentPokemonRef.value.weaknesses = weaknesses;
  };

  const currentPokemon = computed(() => currentPokemonRef.value);

  return { getCurrentPokemon, currentPokemon };
});
