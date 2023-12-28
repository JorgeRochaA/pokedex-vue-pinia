<template>
  <div class="info-card">
    <div class="info-card-title">
      <img :src="getImageUrl(icon)" :alt="title" />
      <p>{{ title }}</p>
    </div>
    <div class="info-card-content">
      <p>{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
import { getImageUrl } from "../utils/utils";
const props = defineProps({
  icon: String,
  title: String,
  value: String,
});
</script>

<style lang="scss" scoped>
.info-card {
  height: 63px;
  width: 154px;
  font-family: "Poppins", sans-serif;
  .info-card-title {
    display: flex;
    gap: 6px;
    p {
      color: rgba(0, 0, 0, 0.6);
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
  }

  .info-card-content {
    margin-top: 4.5px;
    display: flex;
    height: 43px;
    width: 154px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    p {
      color: rgba(0, 0, 0, 0.9);
      font-size: 17px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: capitalize;
      //wrap text
      white-space: nowrap;
    }
  }
}
</style>
