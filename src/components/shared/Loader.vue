<template>
  <div class="view loader">
    <div class="pokeball-container">
      <div class="pokeball">
        <div class="pokeball-button"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const pokeball = document.querySelector(".pokeball");
  const pokeballButton = document.querySelector(".pokeball-button");
  setTimeout(() => {
    pokeballButton.classList.add("blink");
    pokeball.classList.add("shake");
  }, 1260);
});
</script>

<style lang="scss" scoped>
.loader {
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .pokeball-container {
    position: absolute;
    top: 50%;
    left: -100%;
    transform: translate(-50%, -50%);
    animation: roll 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;

    .pokeball {
      position: relative;
      width: 150px;
      height: 150px;
      background: #fff;
      border: 5px solid #000;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: inset -10px 10px 0 10px #ccc;

      &.shake {
        animation: shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
      }

      &:hover {
        animation-play-state: running;
      }

      &:hover .pokeball-button {
        animation-play-state: running;
      }

      &::before,
      &::after {
        content: "";
        position: absolute;
      }

      &::before {
        background: red;
        width: 100%;
        height: 50%;
        top: 0;
        left: 0;
      }

      &::after {
        top: calc(50% - 5px);
        left: 0;
        width: 100%;
        height: 10px;
        background: #000;
      }

      .pokeball-button {
        position: absolute;
        width: 30px;
        height: 30px;
        border: 4px solid #7f8c8d;
        border-radius: 50%;
        top: calc(50% - 15px);
        left: calc(50% - 15px);
        box-shadow: 0 0 0 7px black;
        background: #fff;
        z-index: 10;
        &.blink {
          animation: blink 0.5s alternate infinite;
        }
      }
    }
  }
}
@keyframes shake {
  0% {
    transform: translate(0, 0) rotate(0);
  }
  20% {
    transform: translate(-10px, 0) rotate(-20deg);
  }
  30% {
    transform: translate(10px, 0) rotate(20deg);
  }
  50% {
    transform: translate(-10px, 0) rotate(-10deg);
  }
  60% {
    transform: translate(10px, 0) rotate(10deg);
  }
  100% {
    transform: translate(0, 0) rotate(0);
  }
}

@keyframes blink {
  from {
    background: #eee;
  }
  to {
    background: #e74c3c;
  }
}

@keyframes roll {
  0% {
    transform: rotate(0);
    transform: translate(-100%, -50%) rotate(0);
  }
  100% {
    transform: rotate(360deg);
    left: 50%;
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
