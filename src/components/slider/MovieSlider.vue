<template>
  <div>
    <h2>Slider:</h2>
    <p>{{ currentIndex }}</p>
    <button @click="previousFunction">Previous</button>
    <button @click="nextFunction">Next</button>
    <button @click="toggleTransition">{{ isSliding ? 'Pause' : 'Play' }}</button>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <ul v-else class="slider-container">
      <li class="slider-crop">
        <div :style="{ transform: `translateX(-${currentIndex * (100 / numberShown)}%)` }"
          :class="['slider-content', sliderTransition ? 'slider-transition' : 'slider-no-transition']"
          @transitionend="handleTransition">
          <div @click="handleClick(media.key)" v-for="media in dataCombined" :key="media.id" class="slider-item" :style="{
            width: `calc((100%  / ${numberShown})`,
          }">
            <p>{{ media.key }}</p>
            <img class="slider-item-image" :src="`${api.IMG_URL}${media.poster_path}`" alt="" />
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import * as api from "../../api/api"

const sliderTransition = ref(true)
const isSliding = ref(false)
const intervalId = ref(null)

const totalNumber = 12
const numberShown = 8
const skipFirst = 0
const currentIndex = ref(numberShown)


const { isLoading, isError, error, data } = useQuery(["trending-movies"], api.getTrending, {
  select: (data) => {
    const slicedData = data.results.slice(0, totalNumber);
    return slicedData;
  }
});

const dataCombined = computed(() => {
  const dataNext = data.value.slice(0, numberShown + skipFirst)
  const dataPrev = data.value.slice(totalNumber - numberShown, totalNumber);
  const dataCombined = [...dataPrev, ...data.value, ...dataNext];
  const dataIndexed = dataCombined.map((item, key) => ({
    key,
    ...item,
  }));
  return dataIndexed
})

const nextFunction = () => {
  if (currentIndex.value <= totalNumber) {
    sliderTransition.value = true
    currentIndex.value++
  }
}

const previousFunction = () => {
  if (currentIndex.value > 0) {
    sliderTransition.value = true
    currentIndex.value--
  }
}

const toggleTransition = () => {
  isSliding.value = !isSliding.value
  if (isSliding.value) {
    intervalId.value = setInterval(() => {
      sliderTransition.value = true;
      currentIndex.value++
    }, 1500)
  } else {
    clearInterval(intervalId.value)
  }
}

const handleTransition = () => {
  if (currentIndex.value === 0) {
    sliderTransition.value = false;
    currentIndex.value = (dataCombined.value.length - numberShown * 2)
    currentIndex.value = data.value.length
  }
  if (
    currentIndex.value > dataCombined.value.length - numberShown * 2
  ) {
    sliderTransition.value = false;
    currentIndex.value = (currentIndex.value -
      (dataCombined.value.length - numberShown * 2))
  }
};

const handleClick = (item) => {
  sliderTransition.value = true
  currentIndex.value = item
};

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

p {
  color: black
}

.slider-container {
  display: flex;
  width: 800px;
  // height: 600px;
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
  // transition: all 300ms ease-out
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
  // margin-bottom: 50px;
}

.slider-transition {
  transition: all 300ms ease-out
}

.slider-no-transition {
  transition: none
}
</style>