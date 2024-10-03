import { defineStore } from "pinia";
import api from "../Service/api";

export const useListStore = defineStore("list", {
  state: () => ({
    movies: [],
    currentPage: 1,
    totalPages: 0,
    title:'' ,
    showMenu:false ,
    currentApiEnd:''
  }),
  getters: {},
  actions: {
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
      console.log('another check check' , this.movies);
      
        
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
    toggleMenu(){
        this.showMenu=!this.showMenu
    }
  },
});
