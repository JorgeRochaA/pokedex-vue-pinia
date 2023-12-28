<template>
  <div class="pokemon-stats-container">
    <div class="stats-container">
      <div class="strengths">
        <h2 class="strengths-title">Strengths</h2>
        <div class="strengths-list">
          <img
            v-for="type in strengths"
            :key="type.name"
            :src="getImageUrl(`badges/${type.name}.svg`)"
            :alt="type.name"
          />
        </div>
      </div>
      <div class="weaknesses">
        <h2 class="weaknesses-title">Weaknesses</h2>
        <div class="weaknesses-list">
          <img
            v-for="type in weaknesses"
            :key="type.name"
            :src="getImageUrl(`badges/${type.name}.svg`)"
            :alt="type.name"
          />
        </div>
      </div>
      <div class="stats">
        <h2 class="stats-title">Stats</h2>
        <div class="stats-list">
          <div class="stat" v-for="(stat, index) in stats" :key="index">
            <div class="stat-data">
              <p class="stat-name">{{ stat.stat.name }}</p>
              <p class="stat-value">{{ stat.base_stat }}%</p>
            </div>
            <div class="stat-bar">
              <div
                class="bar"
                :class="stat.stat.name"
                :style="{ width: `${stat.base_stat}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Types from "../components/Types.vue";
import { useCurrentPokemonStore } from "../stores/currentPokemon";
import { computed } from "vue";
import { getImageUrl } from "../utils/utils";

const currentPokemonStore = useCurrentPokemonStore();
const stats = computed(() => {
  return currentPokemonStore.currentPokemon?.stats;
});

const strengths = computed(() => {
  return currentPokemonStore.currentPokemon?.strengths;
});

const weaknesses = computed(() => {
  return currentPokemonStore.currentPokemon?.weaknesses;
});
</script>

<style lang="scss" scoped>
.pokemon-stats-container {
  .stats-container {
    color: #000;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    .strengths,
    .weaknesses {
      h2 {
        height: 45px;
      }
    }

    .strengths-list,
    .weaknesses-list {
      margin: 12px 0;
      max-width: 328px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      img {
        height: 30px;
      }
    }

    .stats {
      .stats-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .stat {
          .stat-data {
            display: flex;
            justify-content: space-between;
            color: #000;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: uppercase;
          }
          .stat-bar {
            border-radius: 49px;
            width: 328px;
            height: 8px;
            flex-shrink: 0;
            margin-bottom: 6px;
            overflow: hidden;
            display: flex;
            background-color: #d3d3d3;
            .bar {
              height: 100%;
              transition: 0.7s;
              &.hp {
                background-color: #53cd5b;
              }
              &.attack {
                background-color: #f6de52;
              }
              &.defense {
                background-color: #ed7f0f;
              }
              &.special-attack {
                background-color: #56b0f1;
              }
              &.special-defense {
                background-color: #ad62f6;
              }
              &.speed {
                background-color: #f06ace;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 410px) {
  .pokemon-stats-container {
    .stats-container {
      max-width: 80vw;
      text-align: center;
      .strengths-list,
      .weaknesses-list {
        justify-content: center;
      }
      .stats {
        .stats-list {
          .stat {
            .stat-bar {
              max-width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
