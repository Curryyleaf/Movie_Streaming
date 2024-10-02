import { defineStore } from "pinia";
import api from "../Service/api";

export const useListStore = defineStore("list", {
  state: () => ({
    topRatedMovies: [],
    topRatedCurrentPage: 1,
    topRatedTotalPage: 0,
    mostPopularMovies: [],
    mostPopularCurrentPage: 1,
    mostPopularTotalPage: 0,

    moviesList: [],
    title: "",
    currentPage: 1,
    totalPage: 0,
    currentApiEnd: "",
  }),
  getters: {},
  actions: {
    async fetchMovieList() {
      try {
        const response = await api.get(`/movie/${this.currentApiEnd}`, {
          params: {
            page: page,
          },
        });

        if (page === 1) {
          this.topRatedMovieData = response.data.results;
        } else {
          this.topRatedMovieData.push(...response.data.results);
        }

        this.totalPages = response.data.total_pages;
        this.currentPage = page;
        console.log("topratedmocies", response.data);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    },

    async fetchTopRatedMovies() {
      try {
        const page = this.topRatedCurrentPage;
        const response = await api.get(`/movie/top_rated`, {
          params: { page },
        });
        if (this.topRatedCurrentPage === 1) {
          this.topRatedMovies = response.data.results;
        } else {
          this.topRatedMovies.push(...response.data.results);
        }

        this.topRatedTotalPage = response.data.total_pages;
      } catch (error) {
        console.error("Error fetching top-rated movies", error);
      }
    },
    async fetchMostPopularMovies() {
      try {
        const page = this.mostPopularCurrentPage;
        const response = await api.get("/movie/popular", {
          params: { page },
        });
        if (this.mostPopularCurrentPage === 1) {
          this.mostPopularMovies = response.data.results;
        } else {
          this.mostPopularMovies.push(...response.data.results);
        }

        this.mostPopularTotalPage = response.data.total_pages;
      } catch (error) {
        console.error("Error fetching top-rated movies", error);
      }
    },

    loadMoreTopRated() {
      if (this.topRatedCurrentPage < this.topRatedTotalPage) {
        this.topRatedCurrentPage += 1;
        this.fetchTopRatedMovies();
      }
    },
    loadMorePopularMovies() {
      if (this.mostPopularCurrentPage < this.mostPopularTotalPage) {
        this.mostPopularCurrentPage += 1;
        this.fetchTopRatedMovies();
      }
    },
    loadMore() {
      if (this.currentPage < this.totalPages) {
        this.fetchTopRatedMovies(this.currentPage + 1);
        console.log("check rn with fetch more", this.topRatedMovieData);
      }
    },
    setCurrentApiEnd(apiEnd) {
      this.currentApiEnd = apiEnd;
    },
  },
});
