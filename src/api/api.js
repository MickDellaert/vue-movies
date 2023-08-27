import axios from 'axios'

// const API_KEY = process.env.REACT_APP_API_KEY
const API_KEY = 'd4208ada7ca0b82909b61d7d3afd76fa'

const BASE_URL = axios.create({baseURL: 'https://api.themoviedb.org/3/'})

export const IMG_URL = 'https://image.tmdb.org/t/p/w1280/'
export const IMG_ORIGINAL_URL = 'https://image.tmdb.org/t/p/orignal/'

export const getPopular = () => getMovies(`movie/popular?api_key=${API_KEY}`)
export const getPopularTv = () => getMovies(`tv/popular?api_key=${API_KEY}`)
export const getTrending = () => getMovies(`trending/all/week?api_key=${API_KEY}&append_to_response=videos`)

export const getDetails = (id, type) => {
  return getMovies(
    `${type}/${id}?api_key=${API_KEY}&append_to_response=videos,images&include_image_language=en`
  )
}

export const queryMovies = ({ queryKey }) => {
  const movieQuery = queryKey[1];
  return getMovies(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`
  );
};

export const queryTv = ({ queryKey }) => {
  const movieQuery = queryKey[1];
  return getMovies(
    `search/tv?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`
  );
};

const getMovies = async (url) => {
  const response = await BASE_URL.get(url)
  return response.data
}
