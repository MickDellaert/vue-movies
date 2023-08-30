<script setup>
import { RouterView } from 'vue-router'
import MovieNavigation from './components/MovieNavigation.vue';
</script>

<template>
  <header>
    <MovieNavigation />
  </header>

  <RouterView :key="$route.path" />
</template>

<style scoped></style>
