<template>
  <div class="bg-white text-black box-border  p-10">
    <header class="py-6 mt-10 mb-4">
      <div class="mr-auto">
        <h3
          class="relative text-5xl pl-4 py-3 font-bold  before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:h-[90%] before:w-1 before:bg-yellow-500"
        >
          {{ title }}
        </h3>
      </div>

      <div class="flex text-black font-medium items-center mt-2">
        <input
          type="text"
          placeholder="Filter by title"
          @input="updateFilter"
          class="p-2  border-2 border-gray-700 w-[40%] rounded"
        />
        <div class="ml-auto space-x-4">
          <select
            @change="updateSort"
            class="p-2 shadow-sm rounded"
          >
            <option value="title">Sort by Title</option>
            <option value="year">Sort by Year</option>
          </select>
          <select v-model="viewMode" class="p-2 shadow-sm rounded">
            <option value="grid">Grid View</option>
            <option value="compact">Compact View</option>
            <option value="compact">detail View</option>
          </select>
        </div>
      </div>
    </header>

    <div class="flex space-x-14">
      <div
        :class="
          viewMode === 'grid'
            ? 'grid grid-cols-4 gap-2 w-[75%]'
            : 'flex  flex-col'
        "
        class="flex-1  p-4 shrink-0"
      >
        <div
          class="cursor-pointer"
          v-for="movie in list"
          :key="movie.id"
          @click="selectMovie(movie)"
          :class="
            viewMode === 'grid'
              ? 'w-full h-auto '
              : 'flex items-stretch  p-2  mb-2 rounded' 
          "
        >
          <div v-if="viewMode === 'grid'" class="h-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-4 rounded-sm">
            <img
              :src="`${imageUrl}/t/p/original${movie.poster_path}`"
              alt="Movie Poster"
              class="w-full h-[70%] rounded"
            />
            <h3 class="mt-2 text-lg font-semibold">{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
          </div>
          <div v-if="viewMode === 'compact'" class="flex items-center">
            <img
              :src="`${imageUrl}/t/p/original${movie.poster_path}`"
              alt="Movie Poster"
              class="w-16 rounded"
            />
            <div class="ml-2">
              <h3 class="font-semibold">{{ movie.title }}</h3>
              <p class="text-sm">{{ movie.year }}</p>
             
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center py-6 col-span-4 w-full">
          <button @click="onButtonCLick">Load more</button>
        </div>
      </div>

      <aside class="w-[25%]">
        <div class="ml-auto p-4rounded-sm">
          <div class="py-2">
            <h2
              class="relative pl-4 font-bold text-4xl  before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:h-full before:w-1 before:bg-yellow-500"
            >
              More to Explore
            </h2>
          </div>

          <div
            v-for="item in moreItems"
            :key="item.id"
            class="rounded items-center"
          >
            <a class="flex text-lg  font-bold items-center">
              <h4 class="align-top">{{ item.anchorText }}</h4>
              <Icon class="text-4xl" icon="iconamoon:arrow-right-2-bold" />
            </a>
            <p class="text-gray-400">Further text remains</p>
          </div>
        </div>
      </aside>
    </div>

    <div
      v-if="selectedMovie"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"
    >
      <div class="bg-gray-900 p-6 rounded-lg relative">
        <button
          @click="closeDetail"
          class="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✖
        </button>
        <h2 class="text-2xl font-bold">{{ selectedMovie.title }}</h2>
        <p class="mt-2">{{ selectedMovie.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useAppStore } from "../store/AppStore";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      selectedMovie: null,
      filter: "",
      sortBy: "title",
      viewMode: "grid",
    };
  },
  computed: {
    imageUrl() {
      const store = useAppStore();
      return store.apiImageUrl;
    },
    filteredMovies() {
      return this.list
        .filter((movie) =>
          movie.title.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => (a[this.sortBy] > b[this.sortBy] ? 1 : -1));
    },
  },
  methods: {
    onButtonCLick() {
      this.$emit("btnClicked");
    },
    updateFilter(event) {
      this.filter = event.target.value;
    },
    updateSort(event) {
      this.sortBy = event.target.value;
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
    },
    closeDetail() {
      this.selectedMovie = null;
    },
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "Your title",
    },
    moreItems: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style></style>
