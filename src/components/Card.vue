<template>
  <div
    class="card"
    :class="`${colorName} ${isHome ? 'is-home' : ''}`"
    @click="moreInfo(id)"
  >
    <div class="card-info-container">
      <img
        class="pattern"
        :src="getImageUrl('pattern/pattern.png')"
        alt="pattern"
      />
      <div class="pokemon-number" v-if="id < 10">#00{{ id }}</div>
      <div class="pokemon-number" v-if="id > 9 && id < 100">#0{{ id }}</div>
      <div class="pokemon-number" v-if="id >= 100">#{{ id }}</div>
      <div class="pokemon-name">{{ name }}</div>
      <div class="pokemon-type">
        <div v-for="(type, index) in types" :key="index">
          <img
            :src="getImageUrl(`badges/${type.type.name}.svg`)"
            :alt="type.type.name"
          />
        </div>
      </div>
    </div>
    <div class="card-image-container">
      <img
        class="pokeball"
        :src="getImageUrl('shadow/pokeball-shadow.svg')"
        alt="pokeball"
      />
      <img class="pokemon-image" :src="img" :alt="name" />
    </div>
  </div>
</template>

<script setup>
import { getImageUrl } from "../utils/utils";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  colorName: String,
  id: Number,
  img: String,
  name: String,
  types: Array,
  isHome: Boolean,
});

const moreInfo = (id) => {
  if (props.isHome) {
    router.push({ name: "pokemon", params: { id } });
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 334px;
  max-width: 90vw;
  height: 115px;
  border-radius: 10px;
  display: flex;
  font-family: "SF Pro Display";
  font-style: normal;
  transition: 0.5s;
  overflow: hidden;
  .card-info-container {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    .pattern {
      position: absolute;
      width: 74px;
      height: 32px;
      top: 10px;
      right: 0;
    }
    .pokemon-number {
      font-weight: 700;
      font-size: 20px;
      line-height: 14px;
      color: rgba(23, 23, 27, 0.6);
      margin-left: 20px;
      margin-top: 20px;
      margin-bottom: 5px;
    }
    .pokemon-name {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 700;
      font-size: 26px;
      line-height: 31px;
      color: #ffffff;
      margin-left: 20px;
      width: 334px;
      text-align: left;
      position: relative;
      z-index: 2;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    .pokemon-type {
      display: flex;
      margin-top: 5px;
      margin-left: 20px;
      img {
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
          rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        border-radius: 3px;
        &:first-child {
          margin-right: 5px;
        }
      }
    }
  }
  .card-image-container {
    height: 100%;
    width: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .pokeball {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      height: 210%;
      transform: rotate(330deg);
    }
    .pokemon-image {
      height: 90%;
      margin-left: 35%;
    }
  }
  &.is-home:hover {
    cursor: pointer;
    transform: scale(1.1);
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

@media screen and (max-width: 350px) {
  .card {
    .card-image-container {
      .pokemon-image {
        height: 65%;
        margin-left: 35%;
      }
    }
  }
}
</style>
