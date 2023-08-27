<template>
  <div>
    <div>
      <div class="nav">
        <RouterLink to="/">Home</RouterLink>
        <input v-model="query" placeholder="Search" />
      </div>
      <div>
        <span v-if="isFetching">Loading... </span>
        <span v-else-if="isError">Error: {{ data.message }}</span>
        <ul class="movie-list" v-else>
          <li v-for="movie in data.results" :key="movie.id" @click="handleClick">
            <MovieSearchResults :movie="movie" />
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup>
import MovieSearchResults from './MovieSearchResults.vue';

import { ref } from 'vue';
import { useQuery } from "@tanstack/vue-query";
import * as api from "../api/api"

const query = ref('')

const { data, isError, isFetching } = useQuery(
  ["query-movies", query],
  api.queryMovies
);

const handleClick = () => {
  query.value = ""
}

</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 40px;
}

li {
  list-style: none;
}
</style>