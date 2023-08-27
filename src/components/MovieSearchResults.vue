<template>
  <div>
    <Router-link :to="`/movie/${movie.id}`">
      <img :src="`${api.IMG_URL}${movie.poster_path}`" alt="" />
    </Router-link>
  </div>
</template>

<script setup>
import * as api from "../api/api"
defineProps(['movie'])
</script>

<style lang="scss" scoped>

img {
  width: 140px;
  cursor: pointer;
}
</style>