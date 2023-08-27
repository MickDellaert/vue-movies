<template>
  <div>
    <!-- <p>you searched for {{ query }}</p> -->
    <input v-model="query" placeholder="Search" />

    <div>
      <span v-if="isFetching">Loading... </span>
      <span v-else-if="isError">Error: {{ data.message }}</span>
      <ul class="movie-list" v-else>
        <li v-for="movie in data.results" :key="movie.id" @click="handleClick">

          <h3>{{ movie.title }}</h3>
          <Router-link :to="`/movie/${movie.id}`">
            <img :src="`${api.IMG_URL}${movie.poster_path}`" alt="" />
          </Router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

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
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>