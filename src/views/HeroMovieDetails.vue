<template>
  <div
    :class="[
      'inset-0 max-w-full overflow-x-clip bg-cover -z-10  box-border bg-center ',
    ]"
    :style="backgroundImageStyle"
  >
    <div
      class="flex flex-col h-auto w-full items-center backdrop-blur-md backdrop-brightness-75 justify-center relative text-white p-4 md:p-8"
    >
      <div class="max-w-4xl w-full">
        <div class="flex flex-col md:flex-row mb-8" v-if="movieDetails">
          <img
            :src="`${imageUrl}/t/p/w500${movieDetails.poster_path}`"
            alt="Movie Poster"
            class="w-full md:w-1/3 rounded-lg mb-4 md:mb-0"
          />
          <div class="md:ml-6">
            <h1 class="text-3xl font-bold mb-2">{{ movieDetails.title }}</h1>
            <p class="text-gray-400 mb-4">{{ formattedReleaseDate }}</p>
            <div class="flex items-center mb-4">
              <span class="text-yellow-400">{{
                movieDetails.vote_average
              }}</span>
              <span class="ml-2 text-gray-400">/ 10</span>
            </div>
            <h2 class="text-xl font-semibold mb-2">Overview</h2>
            <p class="text-gray-300 mb-4">{{ movieDetails.overview }}</p>
            <h2 class="text-xl font-semibold mb-2">Genres</h2>
            <ul class="flex flex-wrap">
              <li
                v-for="genre in movieDetails.genres"
                :key="genre.id"
                class="bg-gray-700 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {{ genre.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Additional Information</h2>
          <div class="flex flex-col md:flex-row md:space-x-4">
            <div class="bg-gray-800 p-4 rounded-lg w-full md:w-1/2">
              <h3 class="font-semibold">Release Date</h3>
              <p class="text-gray-300">{{ formattedReleaseDate }}</p>
            </div>
            <div class="bg-gray-800 p-4 rounded-lg w-full md:w-1/2">
              <h3 class="font-semibold">Runtime</h3>
              <p class="text-gray-300">{{ movieDetails.runtime }} minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../Service/api";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      movieDetails: {},
    };
  },
  computed: {
    
    formattedReleaseDate() {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(this.movieDetails.release_date).toLocaleDateString(
        "en-US",
        options
      );
    },
    backgroundImageStyle() {
      const imageUrl = `Image/t/p/original${this.movieDetails.backdrop_path}`;
      return {
        backgroundImage: `url(${imageUrl})`,
      };
    },
  },

  methods: {
    async fetchMovieDetails() {
      const movieId = this.$route.params.id;
      try {
        const response = await api.get(`/movie/${movieId}`, {});
        this.movieDetails = response.data;
        console.log("movie details ", response);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
  },
  mounted() {
    this.fetchMovieDetails();
  },
};
</script>

<style scoped></style>
