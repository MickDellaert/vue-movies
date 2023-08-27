<template>
  <div>
    <Router-link :to="`/${movie.media_type}/${movie.id}`">
      <h3>{{ movie.media_type }}</h3>
      <img :src="`${api.IMG_URL}${movie.poster_path}`" alt="" />
    </Router-link>

  </div>
</template>

<script setup>
defineProps(['movie'])
import * as api from "../api/api"
</script>

<style lang="scss" scoped>
img {
  width: 140px;
  cursor: pointer;
}
</style>