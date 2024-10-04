<template>
  <div class="bg-white text-black box-border p-10">
    <header class="py-6 mt-10 mb-4">
      <div class="mr-auto">
        <h3
          class="relative text-5xl pl-4 py-3 font-bold before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:h-[90%] before:w-1 before:bg-yellow-500"
        >
          {{ title }}
        </h3>
      </div>

      <div class="flex text-black font-medium items-center mt-2">
        <input
          type="text"
          placeholder="Filter by title"
          @input="updateFilter"
          class="p-2 border-2 border-gray-700 w-[40%] rounded"
        />
        <div class="ml-auto space-x-4">
          <select @change="updateSort" class="p-2 shadow-sm rounded">
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
        class="flex-1 p-4 shrink-0"
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
          <div
            v-if="viewMode === 'grid'"
            class="h-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-4 rounded-sm"
          >
            <img
              :src="`${imageUrl}/t/p/original${movie.poster_path}`"
              alt="Movie Poster"
              class="w-full object-center object-cover h-[70%] rounded"
            />
            <h3 class="mt-2 text-lg font-semibold">{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
          </div>
          <div v-if="viewMode === 'compact'" class="flex items-center">
            <img
              :src="`${imageUrl}/t/p/original${movie.poster_path}`"
              alt="Movie Poster"
              class="w-16  object-center object-cover rounded"
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
              class="relative pl-4 font-bold text-4xl before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:h-full before:w-1 before:bg-yellow-500"
            >
              More to Explore
            </h2>
          </div>

          <div
            v-for="item in moreItems"
            :key="item.id"
            class="rounded items-center"
          >
            <a class="flex text-lg font-bold items-center">
              <h4 class="align-top">{{ item.anchorText }}</h4>
              <Icon class="text-4xl" icon="iconamoon:arrow-right-2-bold" />
            </a>
            <p class="text-gray-400">Further text remains</p>
          </div>
        </div>
      </aside>
    </div>

    <div
      v-if="showDetailModal"
      :style="backgroundImageStyle"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md backdrop-brightness-75 transition-opacity duration-300 ease-in-out"
    >
      <div
        class="bg-gray-900/80 p-8 rounded-lg shadow-lg relative max-w-lg w-full transform transition-transform duration-500 ease-in-out"
      >
        <!-- scale-95 hover:scale-100 -->
        <button
          @click="closeDetail"
          class="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2"
        >
          ✖
        </button>

        <h2 class="text-3xl font-bold text-white leading-tight">
          {{ selectedMovie.title }}
        </h2>
        <p class="mt-4 text-gray-300 text-sm leading-relaxed">
          {{ selectedMovie.overview }}
        </p>

        <div class="mt-6 text-gray-400 text-sm space-y-2">
          <p>
            <strong class="text-gray-200">Release Date:</strong>
            {{ selectedMovie.release_date }}
          </p>
          <p>
            <strong class="text-gray-200">Adult Content:</strong>
            {{ selectedMovie.adult ? "Yes" : "No" }}
          </p>
          <p>
            <strong class="text-gray-200">Rating:</strong> ⭐
            {{ selectedMovie.vote_average }}
          </p>
          <p>
            <strong class="text-gray-200">Language:</strong>
            {{ selectedMovie.original_language }}
          </p>
        </div>
        <button
          @click="closeDetail"
          class="text-gray-50 text-center text-lg mt-3 bg-blue-500 hover:bg-blue-600 rounded-full px-2 transition-colors duration-200 py-1"
        >
          close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useAppStore } from "../../store/AppStore";
import { nextTick } from "vue";

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
      selectedPhoto:'' ,
      showDetailModal:false ,
    };
  },
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage: `url(${this.selectedPhoto})`,
      };
    },
    imageClick(id) {
      this.$emit("imageClicked", id);
    },
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
  selectMovie(movie) {
    this.selectedMovie = movie;
    const imageUrl = `${this.imageUrl}/t/p/original${movie.backdrop_path}`;
    this.selectedPhoto = imageUrl;
    this.preloadImages(imageUrl);
  },
    handleImageLoad(movieId) {
    this.$set(this.isImageLoaded, movieId, true);  
  },
 preloadImages(src) {
      const image = new Image();
      image.src = src;
     
      image.onload=()=>{
        this.showDetailModal=true
      }
      console.log(`Preloading image: ${src}`);
    },
    onButtonCLick() {
      this.$emit("btnClicked");
    },
    updateFilter(event) {
      this.filter = event.target.value;
    },
    updateSort(event) {
      this.sortBy = event.target.value;
    },

    closeDetail() {
      this.showDetailModal=false
    },
  },
  async created() {
    await console.log("we neeed this log right now", this.list);
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
