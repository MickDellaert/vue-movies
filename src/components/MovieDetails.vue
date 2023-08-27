<template>
  <div>
    <p>This is the {{ mediaType }} details page</p>
    <div>My id is: {{ $route.params.id }}</div>

    <div>
      <span v-if="detailsLoading">Loading... </span>
      <span v-else-if="isError">Error: {{ error.message }}</span>
      <div class="details-content" v-else>
        <img :src="`${api.IMG_URL}${details.poster_path}`" alt="" />
        <div>
          <h3>{{ mediaType }} </h3>
          <h3 >{{ details.genres[0].name }}</h3>
          <h1 v-if="details.title">{{ details.title }}</h1>
          <h1 v-else>{{ details.name }}</h1>
          <h3 >{{ details.tagline }}</h3>
          <p >{{ details.overview }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import * as api from "../api/api"
import { ref } from "vue"

const route = useRoute()
const id = route.params.id
const type = route.params.type
const mediaType = ref(type)


const { data: details, isLoading: detailsLoading, isError, error } = useQuery(
  ["getDetails", id, type],
  () => api.getDetails(id, type),
  // {
  //   enabled: id,
  // }
);


console.log(route.params)
console.log(details)

</script>

<style lang="scss" scoped>
div {
  margin-bottom: 20px;
}

.details-content {
  display: flex;
  gap: 2rem
}

img {
  width: 300px
}
</style>