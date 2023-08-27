<template>
  <li v-for="movie in trendingMovies.results" :key="movie.id">
    <MovieItem :movie="movie" />
  </li>
</template>

<script setup>
import MovieItem from "./MovieItem.vue";
defineProps(['trendingMovies'])
</script>

<style lang="scss" scoped>
img {
  width: 140px;
  cursor: pointer;
}

li {
  list-style: none;
}
</style>