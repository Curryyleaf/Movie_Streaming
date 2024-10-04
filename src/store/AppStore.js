import { defineStore } from "pinia";
import api from "../Service/api";

export const useAppStore = defineStore("movies", {
  state: () => ({
    movies: [],
    popularCeleb: [],
    selectedMovie: null,
    loading: false,
    sessionId: "",
    popularCelebId: "",
    movieDetails: [],
    popularCelebSingleData: [],
    popularCelebSoloImage: [],
    apiImageUrl: import.meta.env.VITE_API_IMAGE_URL,
  }),
  // getters: {
  //   allMovies: (state) => state.movies,
  //   hasMovies: (state) => state.movies.length > 0,
  // },
  actions: {
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
    async fetchMovies() {
      this.loading = true;
      try {
        const response = await api.get("");

        this.movies = response;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchPopularCeleb() {
      try {
        const response = await api.get("/person/popular");
        console.log("Full Response:", response);
        const blockedCelebs = [
          "Sae Bom",
          "Min Do-yoon",
          "Dyessa Garcia",
          "Yoo Jung",
          "Angelica Hart",
        ];

        this.popularCeleb = response.data.results.filter(
          (person) => !blockedCelebs.includes(person.name)
        );

        console.log("Filtered Celebrities:", this.popularCeleb);
      } catch (error) {
        console.log("Failed to fetch popular celebrities:", error);
      }
    },

    async fetchPopularCelebSoloImage() {
      try {
        const response = await api.get(`/person/${this.popularCelebId}/images`);

        this.popularCelebSoloImage = response.data.profiles;
      } catch (error) {
        console.log(error);
      }
    },
    assignPopularCelebData() {
      const data = this.popularCeleb.find(
        (item) => item.id === this.popularCelebId
      );
      this.popularCelebSingleData = data || {};
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
    },
  },
});
