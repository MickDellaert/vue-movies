import { ref } from 'vue'

const useSlider = (numberShown, totalNumber, dataCombined) => {
  const sliderTransition = ref(true)
  const isSliding = ref(false)
  const intervalId = ref(null)
  const currentIndex = ref(numberShown)

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
        sliderTransition.value = true
        currentIndex.value++
      }, 1500)
    } else {
      clearInterval(intervalId.value)
    }
  }

  const handleTransition = () => {
    if (currentIndex.value === 0) {
      sliderTransition.value = false
      currentIndex.value = dataCombined.value.length - numberShown * 2
    }
    if (currentIndex.value > dataCombined.value.length - numberShown * 2) {
      sliderTransition.value = false
      currentIndex.value = currentIndex.value - (dataCombined.value.length - numberShown * 2)
    }
  }

  const handleClick = (item) => {
    sliderTransition.value = true
    currentIndex.value = item
  }

  return {currentIndex, sliderTransition, isSliding, nextFunction, previousFunction, toggleTransition, handleTransition, handleClick }
}

export default useSlider
