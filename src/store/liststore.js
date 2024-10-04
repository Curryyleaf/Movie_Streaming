import { defineStore } from "pinia";
import api from "../Service/api";

export const useListStore = defineStore("list", {
  state: () => ({
    movies: [],
    currentPage: 1,
    totalPages: 0,
    title: "",
    showMenu: false,
    currentApiEnd: "",
    query: "",
    searchedResults: "",
    searchCategory:'' ,
  }),
  getters: {},
  actions: {
    async fetchSearch() {
      api.get("/search/multi", {
          params: {
            query: this.query,
          },
        })
        .then((response) => {
          console.log("Full search response:", response);
          this.searchedResults = response.data.results;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    async fetchMovieList(apiEnd) {
      try {
        const page = this.currentPage;
        const response = await api.get(`/movie/${apiEnd}`, {
          params: { page },
        });
        if (this.currentPage === 1) {
          this.movies = response.data.results;
        } else {
          this.movies.push(...response.data.results);
        }
        this.totalPages = response.data.total_pages;
      } catch (error) {
        console.error("Error fetching top-rated movies", error);
      }
    },

    loadMore() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
        this.fetchTopRatedMovies();
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
});
