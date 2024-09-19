<template>
  <section class="relative w-full box-border flex flex-row">
    <main class="h-[530px] overflow-clip flex w-full">
      <!-- Hero Image Section -->

      <div class="ml-8 h-full w-[70%] relative bg-black overflow-hidden">
        <!-- poster image -->
        <div
          class="flex items-center absolute h-full top-0 bottom-0 left-0 right-0 justify-center text-white z-10 bg-gradient-to-t from-black via-20% to-transparent"
        >
          <div class="absolute box-border flex bottom-0 w-1/4 left-5">
            <img
              :src="`https://image.tmdb.org/t/p/original${currentImage.poster_path}`"
              alt="poster"
              class="w-44 h-2/4 object-contain"
            />
            <font-awesome-icon
              :icon="['fas', 'plus']"
              class="absolute text-lg top-[5%] text-gray-400 left-[4%]"
            />
            <font-awesome-icon
              :icon="['far', 'bookmark']"
              size="3x"
              class="top-0 left-0 text-black-600 absolute opacity-50"
            />
          </div>
          <div class="h-32 flex flex-row absolute bottom-0 right-0 w-3/4">
            <font-awesome-icon
              class="text-7xl p-2 pr-4 text-gray-300"
              :icon="['far', 'circle-play']"
            />
            <div>
              <article class="text-left">
                <h3
                  class="tracking-wide text-white font-sans text-2xl overflow-ellipsis"
                >
                  {{ currentImage.title }}
                </h3>
                <p>{{ currentImage.vote_average }}</p>
                <div class="flex">
                  <Icon
                    icon="mdi:thumbs-up-outline"
                    width="24"
                    height="24"
                    class="pr-1"
                  />{{ currentImage.vote_count }}
                </div>
              </article>
            </div>
          </div>
        </div>

        <!-- main image section  -->
        <div>
          <img
            :src="`https://image.tmdb.org/t/p/original${currentImage.backdrop_path}`"
            alt="Hero Background"
            class="w-full h-full object-cover"
          />
          <button
            @click="navigateToPrevious"
            class="text-white px-2 py-6 absolute opacity-40 top-[30%] left-0 rounded"
          >
            <font-awesome-icon :icon="faChevronLeft" />
          </button>
          <button
            @click="navigateToNext"
            class="text-white px-2 py-6 opacity-40 absolute top-[30%] right-0 rounded"
          >
            <font-awesome-icon :icon="faChevronRight" />
          </button>
        </div>
      </div>

      <!-- Up Next Section -->
      <div
        class="flex-1 h-fulloverflow-clip bg-black box-border pt-2 text-white px-2"
      >
        <div class="w-full">
          <h2
            class="text-xl p-2 rounded-lg whitespace-nowrap w-1/2 text-left font-bold text-blue-600"
          >
            Up next
          </h2>
        </div>
        <div
          class="container bg-gradient-to-t from-black from-40% to-black-200"
        >
          <div
            v-for="image in upNextImages"
            :key="image.id"
            class="h-max mt-2 rounded-lg w-full"
          >
            <div class="w-full flex p-3 items-center">
              <img
                :src="`https://image.tmdb.org/t/p/original${image.backdrop_path}`"
                alt="Thumbnail"
                class="w-20 h-28 object-cover"
              />
              <div class="ml-2">
                <h3 class="text-lg font-semibold">Movie Title</h3>
                <p class="text-sm">Short description of the movie.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Icon } from "@iconify/vue/dist/iconify.js";
import {
  faChevronRight,
  faChevronLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useMoviesStore } from "../store/MovieStore";
export default {
  components: { FontAwesomeIcon, Icon },
  data() {
    return {
      faChevronLeft,
      faChevronRight,
      images: [],
      currentIndex: 10,
      intervalId: null,
      currentImage: {},
    };
  },

  methods: {
    startRotation() {
      this.intervalId = setInterval(() => {
        this.preloadNextImage();
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.currentImage = this.images[this.currentIndex];
      }, 5000);
    },
    preloadNextImage() {
      const nextIndex = (this.currentIndex + 1) % this.images.length;
      const nextImage = new Image();
      nextImage.src = this.images[nextIndex].backdrop_path;
    },
    navigateToPrevious() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    },
    navigateToNext() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    },
    navigateToDetail() {
      if (this.currentImage && this.currentImage.id) {
        const movieId = this.currentImage.id;
        this.$router.push({ name: "MovieDetail", params: { id: movieId } }); // Navigate to the movie's detailed page
        // Alternatively, if you’re using Vuex or some other state management:
        // this.$store.dispatch('fetchMovieDetails', movieId);
      }
    },
    async fetchImages() {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzBhNjY0NWVlZTQ2ZGQ4MjFhNjE5YjExZTkxNjBlMyIsIm5iZiI6MTcyNjU1MjY0Ny42NjAwODgsInN1YiI6IjY2ZTdjOTQxMzc2OGE3M2Y4ZDkxYjJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M8KaPaJ-9kj1418x-3NxT5ovPfw8prGY_jKyXaBNwQM",
          },
        }
      );

      this.images = response.data.results;
      console.log("response results", response.data.results);
      console.log("thisimages", this.images);
    },
  },

  computed: {
    upNextImages() {
      let upNextImages = [];
      const remainingImages = this.images.length - this.currentIndex - 1;
      if (remainingImages < 4) {
        upNextImages = this.images.slice(this.currentIndex + 1);
        const imagesToAddFromStart = 4 - remainingImages;
        upNextImages = upNextImages.concat(
          this.images.slice(0, imagesToAddFromStart)
        );
      } else {
        upNextImages = this.images.slice(
          this.currentIndex + 1,
          this.currentIndex + 4
        );
      }

      return upNextImages;
    },
  },

  async mounted() {
    // Simulate fetching images from API
    const store = useMoviesStore();
    await this.fetchImages();
    await store.fetchPopularCeleb();

    if (this.images.length) {
      this.currentImage = this.images[this.currentIndex];
      this.startRotation();
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  watch: {
    currentIndex() {},
  },
};
</script>

<style scoped>
.hero-section {
  width: 100%;
  height: 500px; /* Adjust to fit your hero section size */
  cursor: pointer;
  position: relative;
}
.description {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}
</style>
