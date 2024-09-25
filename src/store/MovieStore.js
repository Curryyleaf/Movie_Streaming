// /src/stores/moviesStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: [],
    popularCeleb: [],
    selectedMovie: null,
    loading: false,
    sessionId: "",
    popularCelebId: "",
    popularCelebSingleData: [],
    popularCelebSoloImage: [],
  }),
  // getters: {
  //   allMovies: (state) => state.movies,
  //   hasMovies: (state) => state.movies.length > 0,
  // },
  actions: {
    async fetchMovies() {
      this.loading = true;
      try {
        const response = await fetch("https://api.themoviedb.org/3");

        this.movies = response;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchPopularCeleb() {
      const response = await axios.get(
        "https://api.themoviedb.org/3/person/popular",
        {
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_API_ACCESS_TOKEN,
          },
        }
      );
      this.popularCeleb = response.data.results;
    },
    // selectCelebSingleProfile(id) {
    //   console.log("Selecting ID:", id); // Log the incoming ID
    //   this.popularCelebId = id;
    //   console.log("selectId", this.popularCelebId); // Check after assignment
    //   this.assignPopularCelebData();
    // },

    async fetchpopularCelebDetail() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${this.popularCelebId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_API_ACCESS_TOKEN,
          },
        }
      );
      this.popularCelebSingleData = response.data;
    },
    async fetchPopularCelebSoloImage() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${this.popularCelebId}/images`,
        {
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_API_ACCESS_TOKEN,
          },
        }
      );
      console.log("images you looking for", response.data.profiles);

      this.popularCelebSoloImage = response.data.profiles;
    },
    assignPopularCelebData() {
      const data = this.popularCeleb.find(
        (item) => item.id === this.popularCelebId
      );
      this.popularCelebSingleData = data || {};
    },
    async fetchTrailerByImdbId(imdbId) {
      const apiKey = "YOUR_YOUTUBE_API_KEY"; // Replace with your YouTube API key
      const query = `${"tt2564144"} trailer`; // Constructing the query with IMDb ID

      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              q: query,
              type: "video",
              key: apiKey,
            },
          }
        );

        const videos = response.data.items;

        if (videos.length > 0) {
          const trailer = videos[0]; // Get the first trailer found
          const trailerUrl = `https://www.youtube.com/watch?v=${trailer.id.videoId}`;
          console.log("Trailer URL:", trailerUrl);
        } else {
          console.log("No trailers found.");
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
    },
  },
});
