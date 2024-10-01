import { defineStore } from "pinia";
import api from "../Service/api.js";

export const useImagesStore = defineStore("movies", {
  state: () => ({ 
    imageArray: [],
  }),
  actions: {
    async fetchImages() {
      try {
        const response = await api.get("/movie/now_playing");
        this.imageArray = response.data.results;
        console.log("Fetched images:", response);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
