<template>
  <section class="relative w-full pt-2 box-border flex flex-row">
    <main class="h-[550px] overflow-clip flex w-full">
      <div class="w-[75%]">
        <div v-for="(image, index) in imageArray">
          <div class="h-full w-full relative bg-black overflow-hidden">
            <div
              class="flex items-center absolute h-full top-0 bottom-0 left-0 right-0 justify-center text-white z-10"
            >
              <div class="absolute flex-col bottom-0 pl-9 w-full">
                <div
                  class="relative box-border flex bottom-0 w-1/5 left-5"
                  @click="navigateToDetail(image.id)"
                >
                  <!-- left overlay image -->
                  <img
                    :src="`https://image.tmdb.org/t/p/original${image.poster_path}`"
                    alt="poster"
                    class="object-center   object-contain hover:cursor-pointer mySlides fade"
                    :style="{
                      display: currentIndex === index ? 'block' : 'none',
                    }"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'plus']"
                    class="absolute text-lg top-[5%] text-white left-[4%]"
                  />
                  <font-awesome-icon
                    :icon="['far', 'bookmark']"
                    size="3x"
                    class="top-0 left-0 text-white absolute opacity-50"
                  />
                </div>

                <!-- right movie title and play section -->
                <div
                  class="h-32 flex pl-16 flex-row absolute bottom-0 right-0 w-4/5"
                >
                  <font-awesome-icon
                    class="text-7xl p-2 text-gray-300"
                    :icon="['far', 'circle-play']"
                  />

                  <div class="text-left">
                    <h1 class="tracking-wide text-white font-sans text-5xl">
                      {{ image.title }}
                    </h1>
                    <p class="p-1">{{ image.vote_average }}</p>
                    <div class="flex pl-1">
                      <Icon
                        icon="mdi:thumbs-up-outline"
                        width="24"
                        height="24"
                        class="pr-1"
                      />{{ image.vote_count }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--  poster image section  -->
            <div>
              <img
                :src="`https://image.tmdb.org/t/p/original${image.backdrop_path}`"
                alt="Hero Background"
                @click="navigateToDetail(image.id)"
                class="w-full h-full  object-center hover:cursor-pointer object-cover mySlides fade"
                :style="{ display: currentIndex === index ? 'block' : 'none' }"
              />
              <button
                @click="navigateToPrevious"
                class="text-white px-2 py-6 absolute opacity-40 top-[20%] left-0 rounded"
              >
                <font-awesome-icon :icon="faChevronLeft" />
              </button>
              <button
                @click="navigateToNext"
                class="text-white px-2 py-6 opacity-40 absolute top-[20%] right-0 rounded"
              >
                <font-awesome-icon :icon="faChevronRight" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Up Next Section -->
      <div
        class="flex-1 h-full overflow-clip bg-black box-border pt-2 text-white px-2"
      >
        <div class="w-full">
          <p
            class="text-xl pl-2 pb-2 rounded-lg whitespace-nowrap w-1/2 text-left font-bold text-white"
          >
            Up next
          </p>
        </div>

        <!-- up next inner main div section -->
        <div
          class="container bg-gradient-to-t pt-1 pl-1 mt-3 from-black from-40% to-black-200"
        >
          <div
            v-for="image in upNextImages"
            :key="image.id"
            class="h-max rounded-lg w-full"
          >
            <div
              class="w-full flex p-2 items-center"
              @click="navigateToDetail(image.id)"
            >
              <img
                :src="`https://image.tmdb.org/t/p/original${image.backdrop_path}`"
                alt="Thumbnail"
                :class="[
                  'w-20 h-28 fade  object-center cursor-pointer object-cover ',
                ]"
              />
              <div class="ml-2">
                <h1 class="text-lg">Movie Title</h1>
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
import api from "../Service/api.js";
import { useMoviesStore } from "../store/MovieStore.js";
export default {
  components: { FontAwesomeIcon, Icon },

  data() {
    const store = useMoviesStore();
    return {
      store,
      faChevronLeft,
      faChevronRight,
      imageArray: [],
      currentIndex: 0,
      intervalId: null,
    };
  },

  methods: {
    startRotation() {
      this.intervalId = setInterval(() => {
        // this.preloadImages([
        //   this.imageArray[(this.currentIndex + 1) % this.imageArray.length].poster_path,
        //   this.imageArray[(this.currentIndex + 1) % this.imageArray.length]
        //     .backdrop_path,

        // ]);
        this.currentIndex = (this.currentIndex + 1) % this.imageArray.length;
      }, 5000);
    },

    preloadImages(imageSrcArray) {
      imageSrcArray.forEach((src) => {
        const image = new Image();
        image.src = `https://image.tmdb.org/t/p/original${src}`;
        console.log(`Preloading image: ${src}`);
      });
    },
    navigateToPrevious() {
      this.currentIndex =
        (this.currentIndex - 1 + this.imageArray.length) %
        this.imageArray.length;
      this.currentImage = this.imageArray[this.currentIndex];
    },
    navigateToNext() {
      this.currentIndex = (this.currentIndex + 1) % this.imageArray.length;
      this.currentImage = this.imageArray[this.currentIndex];
    },
    navigateToDetail(id) {
      if (id) {
        this.$router.push({ name: "MovieDetail", params: { id: id } });
      }
    },
    async fetchImages() {
      try {
        const response = await api.get("/movie/now_playing");
        this.imageArray = response.data.results;
        console.log("hihi", response);
      } catch (error) {
        console.log(error);
      }
    },
    upNextImageLoad() {},
  },

  computed: {
    upNextImages() {
      let upNextImages = [];
      const remainingImages = this.imageArray.length - this.currentIndex - 1;
      if (remainingImages < 4) {
        upNextImages = this.imageArray.slice(this.currentIndex + 1);
        const imageToAddFromStart = 4 - remainingImages;
        upNextImages = upNextImages.concat(
          this.imageArray.slice(0, imageToAddFromStart)
        );
      } else {
        upNextImages = this.imageArray.slice(
          this.currentIndex + 1,
          this.currentIndex + 4
        );
      }

      return upNextImages;
    },
  },

  async mounted() {
    await this.fetchImages();
    await this.store.fetchPopularCeleb();
    if (this.imageArray.length) {
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

<style>
.myslide {
opacity: 0;
}
.fade {
  animation-name: fade;
  animation-duration: 2.5s;
  animation-fill-mode: forwards;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
