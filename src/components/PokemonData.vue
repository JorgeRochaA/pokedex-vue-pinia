<template>
  <div class="pokemon-data-container">
    <div class="pokemon-data">
      <h2>{{ currentPokemonStore.currentPokemon?.name }}</h2>
      <h3 v-if="currentPokemonStore.currentPokemon?.id < 10">
        Nº#00{{ currentPokemonStore.currentPokemon?.id }}
      </h3>
      <h3
        v-if="
          currentPokemonStore.currentPokemon?.id > 9 &&
          currentPokemonStore.currentPokemon?.id < 100
        "
      >
        Nº#0{{ currentPokemonStore.currentPokemon?.id }}
      </h3>
      <h3 v-if="currentPokemonStore.currentPokemon?.id >= 100">
        Nº#{{ currentPokemonStore.currentPokemon?.id }}
      </h3>
    </div>
    <Types />
    <p class="description">
      {{ cleanedDescription }}
    </p>
    <div class="bar"></div>
    <div class="pokemon-info">
      <DataCard
        :icon="'data/weight.svg'"
        :title="'Weight'"
        :value="
          (currentPokemonStore.currentPokemon?.weight * 0.1).toFixed(1) + 'Kg'
        "
      />
      <DataCard
        :icon="'data/height.svg'"
        :title="'Height'"
        :value="
          (currentPokemonStore.currentPokemon?.height * 0.1).toFixed(1) + 'M'
        "
      />
      <DataCard
        :icon="'data/category.svg'"
        :title="'Category'"
        :value="cleanedCategory"
      />
      <DataCard
        :icon="'data/ability.svg'"
        :title="'Ability'"
        :value="currentPokemonStore.currentPokemon?.abilities[0].ability.name"
      />
    </div>
    <div class="pokemon-genre">
      <h2>Genre</h2>
      <div class="graphic-bar">
        <div class="male" :style="{ width: genderRate.male + '%' }"></div>
        <div class="female" :style="{ width: genderRate.female + '%' }"></div>
      </div>
      <div class="genres">
        <div class="values">
          <img src="genres/male.svg" alt="male" />
          <p>{{ genderRate.male }}%</p>
        </div>
        <div class="values">
          <img src="genres/female.svg" alt="" />
          <p>{{ genderRate.female }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Types from "./Types.vue";
import { useCurrentPokemonStore } from "../stores/currentPokemon";
import DataCard from "./DataCard.vue";
import { computed } from "vue";

const currentPokemonStore = useCurrentPokemonStore();

const cleanedDescription = computed(() => {
  const descriptionsEN =
    currentPokemonStore.currentPokemon?.species?.flavor_text_entries.filter(
      (description) => {
        return description.language.name === "en";
      }
    );

  if (descriptionsEN) {
    return descriptionsEN[0].flavor_text.replace(/[\n\f]/g, " ");
  }
});

const cleanedCategory = computed(() => {
  const generaEN = currentPokemonStore.currentPokemon?.species?.genera.filter(
    (genus) => {
      return genus.language.name === "en";
    }
  );

  if (generaEN) {
    return generaEN[0].genus.replace(/Pokémon/g, "").trim();
  }
});

const genderRate = computed(() => {
  switch (currentPokemonStore.currentPokemon?.species?.gender_rate) {
    case -1:
      return { male: 0, female: 0 };
    case 0:
      return { male: 100, female: 0 };
    case 1:
      return { male: 87.5, female: 12.5 };
    case 2:
      return { male: 75, female: 25 };
    case 4:
      return { male: 50, female: 50 };
    case 6:
      return { male: 25, female: 75 };
    case 8:
      return { male: 25, female: 75 };
    case 16:
      return { male: 12.5, female: 87.5 };
    case -2:
      return { male: 0, female: 100 };
    default:
      return { male: 0, female: 0 };
  }
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

.pokemon-data-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 328px;
  background: white; //remove later

  .pokemon-data {
    h2 {
      color: #000;
      font-family: "Popins", sans-serif;
      font-size: 32px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: capitalize;
    }
    h3 {
      color: rgba(0, 0, 0, 0.7);
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-top: 5px;
      margin-bottom: 24px;
    }
  }

  .description {
    color: rgba(0, 0, 0, 0.7);
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 145%; /* 20.3px */
  }

  .bar {
    margin-top: 20px;
    margin-bottom: 16px;
    background: rgba(0, 0, 0, 0.05);
    width: 328px;
    height: 1px;
  }

  .pokemon-info {
    display: grid;
    grid-template-columns: auto auto;
    place-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .pokemon-genre {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      color: #000;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .graphic-bar {
      border-radius: 49px;
      width: 328px;
      height: 8px;
      flex-shrink: 0;
      margin-bottom: 6px;
      overflow: hidden;
      display: flex;
      .male {
        transition: 0.5s;
        height: 8px;
        background: linear-gradient(0deg, #2551c3 0%, #2551c3 100%), #2551c3;
      }
      .female {
        transition: 0.5s;
        height: 8px;
        background: linear-gradient(0deg, #ff5959 0%, #ff5959 100%), #ff5959;
      }
    }
    .genres {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .values {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          color: rgba(0, 0, 0, 0.7);
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        }
      }
    }
  }
}

@media (max-width: 410px) {
  .pokemon-data-container {
    width: 90vw;
    align-items: center;
    .pokemon-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        text-align: center;
      }
    }

    .description {
      max-width: 80%;
      text-align: center;
    }

    .bar {
      max-width: 80%;
    }

    .pokemon-info {
      grid-template-columns: auto;
    }

    .pokemon-genre {
      width: 100%;
      .graphic-bar {
        width: 85%;
      }
      .genres {
        width: 85%;
      }
    }
  }
}
</style>
