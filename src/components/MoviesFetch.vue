<template>
  <div>
    <h2>Popular right now:</h2>
    <span v-if="trendingLoading">Loading... </span>
    <span v-else-if="trendingIsError">Error: {{ trendingError.message }}</span>
    <ul class="movie-list" v-else>
      <MoviesList :trendingMovies="trendingMovies" />
    </ul>
  </div>
</template>



<script setup>

import { useQuery } from "@tanstack/vue-query";
import * as api from "../api/api"
import MoviesList from "./MoviesList.vue";

// const { isLoading, isError, error, data: popularMovies } = useQuery(["popular-movies"], api.getPopular);
const { isLoading: trendingLoading, isError: trendingIsError, error: trendingError, data: trendingMovies } = useQuery(["trending-movies"], api.getTrending);
// console.log(trendingMovies)

</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin-bottom: 2rem;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

</style>