<template>
  <div>
    <h2>Slider:</h2>
    <p>{{ currentIndex }}</p>
    <button @click="previousFunction">Previous</button>
    <button @click="nextFunction">Next</button>
    <button @click="handleTransition">toggle</button>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <ul v-else class="slider-container">
      <li class="slider-crop">
        <div :style="{ transform: `translateX(-${currentIndex * (100)}%)` }" class="slider-content">
          <div v-for="media in data.results" :key="media.id" class="slider-item">
            <img class="slider-item-image" :src="`${api.IMG_URL}${media.backdrop_path}`" alt="" />
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import * as api from "../../api/api"

// const { isLoading, isError, error, data: popularMovies } = useQuery(["popular-movies"], api.getPopular);
const { isLoading, isError, error, data } = useQuery(["trending-movies"], api.getTrending);

const currentIndex = ref(0)

const nextFunction = () => {
  currentIndex.value++
}

const previousFunction = () => {
  currentIndex.value--
}

const handleTransition = () => {
  currentIndex.value = 0
}



</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  li {
    list-style-type: none;
  }

  img {
    width: 140px;
    cursor: pointer;
  }
}


.slider-container {
  display: flex;
  width: 800px;
  height: 600px;
  position: relative;
  background-color: gainsboro;
  margin: 10px;
  padding: 10px;
}

.slider-crop {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.slider-content {
  display: flex;
}

.slider-item {
  width: 100%;
  flex-shrink: 0;
  flex-grow: 1;
  background-color: gainsboro;
  position: relative;
}

.slider-item-image {
  width: 100%;
  margin-bottom: 50px;
}
</style>