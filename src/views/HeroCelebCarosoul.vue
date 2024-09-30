<template>
  <div class="w-full relative mt-10 px-4">
    <h2
      class="relative pl-4 mb-7 text-4xl text-white before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:h-full before:w-1 before:bg-yellow-500"
    >
      Most popular celebrities
    </h2>

    <article class="w-full overflow-y-clip overflow-x-scroll no-scrollbar">
      <!-- Main slider control -->
      <div
        @click="profileSlider"
        class="py-2 absolute right-0 top-1/2 -translate-y-12 hover:cursor-pointer rounded-md border bg-opacity-35 border-solid hover:bg-gray-300 hover:bg-opacity-60 z-10 border-gray-300"
      >
        <Icon
          icon="iconamoon:arrow-right-2-bold"
          width="48"
          height="48"
          class="text-white z-10 hover:text-green-500"
        />
      </div>

      <!-- Carousel container -->
      <div
        class="whitespace-nowrap mt-2 w-full transition-transform duration-200 ease-in-out inline-flex space-x-4"
        ref="innerWrapper"
        :style="carouselStyles"
      >
        <div
          v-for="celeb in cards"
          :key="celeb.id"
          class="flex-shrink-0 flex flex-col items-center  hover:cursor-pointer"
        >
          <img
            @click="navigateToProfile(celeb.id)"
            :src="`${imageUrl}/t/p/w185${celeb.profile_path}`"
            alt=""
            class="w-44 h-44 rounded-full object-center object-cover"
          />
          <h4 class="text-white text-lg text-center p-2">{{ celeb.name }}</h4>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useMoviesStore } from "../store/MovieStore";
import { nextTick } from "vue";
import { mapState, mapActions } from "pinia";

export default {
  name: "CelebGrid",
  data() {
    return {
      carouselStyles: {},
      slide: null,
      cards: [],
    };
  },
  components: {
    Icon,
  },
  computed: {
    ...mapState(useMoviesStore, {
      popularCeleb: (store) => store.popularCeleb,
      loading: (store) => store.loading,
    }),

    imageUrl() {
      return import.meta.env.VITE_API_IMAGE_URL;
    },
  },
  methods: {
    ...mapActions(useMoviesStore, ["fetchPopularCeleb"]),

    async profileSlider() {
      this.moveLeft();
      this.afterTransition(() => {
        const card = this.cards.shift();
        this.cards.push(card);
        this.resetTranslate();
      });
    },

    async assignData() {
      await this.fetchPopularCeleb();
      this.cards = this.popularCeleb;
    },

    async setStep() {
      await nextTick();
      const innerWidth = this.$refs.innerWrapper.scrollWidth;
      const totalCards = this.cards.length;
      this.slide = `${innerWidth / totalCards}px`;
    },

    moveLeft() {
      this.carouselStyles = {
        transform: `translateX(-${this.slide})`,
        transition: "transform 0.5s ease-in-out",
      };
    },

    afterTransition(callback) {
      const listener = () => {
        callback();
        this.$refs.innerWrapper.removeEventListener("transitionend", listener);
      };
      this.$refs.innerWrapper.addEventListener("transitionend", listener);
    },

    async navigateToProfile(id) {
      const store = useMoviesStore();
      store.popularCelebId = id;
      await this.$router.push({ name: "CelebSingleProfile" });
    },

    resetTranslate() {
      this.carouselStyles = {
        transform: "translateX(0)",
        transition: "none",
      };
      this.$refs.innerWrapper.offsetHeight;
    },
  },

  async created() {
    await this.assignData();
    await this.setStep();
  },
};
</script>
