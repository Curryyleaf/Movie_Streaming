<template>
  <section
    class="bg-gradient-to-r from-black via-orange-400 to-black text-white -z-10"
  >
    <!-- Header Section -->

    <div class="backdrop-blur-lg bg-black-300 bg-opacity-70 z-10">
      <div ref="" class="w-11/12 mx-auto pt-3 z-20">
        <div class="flex w-full items-center">
          <ul
            class="w-2/5 ml-auto space-x-4 text-base flex items-center justify-between"
          >
            <li
              class="flex space-x-1 divide-solid divide-gray-300 divide-x items-center"
            >
              <a href="" class="m-1 px-2">Biography</a>
              <a href="" class="m-1 px-2">Awards</a>
              <a href="" class="m-1 px-2">Trivia</a>
              <a href="" class="m-1 px-2">FAQ</a>
            </li>
            <li>
              <a href="">IMDBPro</a>
            </li>
            <li class="flex flex-row items-center">
              <Icon
                icon="tabler:apps-filled"
                width="1.2rem"
                height="1.2rem"
                class="text-white"
              />
              <a href="">All topics</a>
            </li>
            <li>
              <Icon
                icon="tabler:apps-filled"
                width="1.2rem"
                height="1.2rem"
                class="text-white"
              />
            </li>
          </ul>
        </div>

        <div></div>
        <header class="flex items-center text-gray-300 w-full">
          <aside class="py-2">
            <h1 class="text-5xl font-semibold tracking-wide text-white">
              {{ profileData.name }}
              <span class="text-base text-center"></span>
            </h1>
            <p class="pl-2">{{ profileData.known_for_department }}</p>
          </aside>
          <aside class="flex items-center ml-auto">
            <div>
              <span class="block leading-none">MOVIEPro</span>
              <span class="block leading-none">startMeter</span>
            </div>

            <div class="flex">
              <Icon
                icon="ph:trend-up-bold"
                class="text-green-500 textce\ m-1"
              />
              <p>2</p>
              <Icon icon="fa6-solid:sort-up" class="m-1 text-center" />
              <p class="mx-1">2019</p>
            </div>
          </aside>
        </header>
        <div
          class="grid grid-cols-2 sm:col-span-2 h-auto gap-[0.3rem] lg:grid-cols-5"
        >
          <!-- div1 -->
          <div class="col-span-1 flex order-1 sm:col-span-1 lg:order-1">
            <img
              :src="`${imageUrl}/t/p/original/${profileData.profile_path}`"
              class="object-cover object-center w-full"
              alt="placehokder"
            />
          </div>
          <!-- div 2 -->
          <div
            class="col-span-2 relative sm:col-span-2 inset-0 h-auto lg:order-2 md:col-span-3"
          >
            <img
              :src="`${imageUrl}/t/p/original${profileData.known_for[0].backdrop_path}`"
              alt=""
              class="w-full"
            />
            <p class="absolute bottom-9 text-3xl left-24">
              {{ profileData.known_for[0].title }} (<span class="text-base">{{
                profileData.known_for[0].release_date
              }}</span
              >)
            </p>
            <p class="absolute bottom-4 left-24">
              {{ profileData.known_for[0].id }}
            </p>
            <Icon
              icon="iconamoon:menu-kebab-vertical"
              class="absolute top-1 right-1 text-3xl text-gray-800 hover:opacity-100 hover:cursor-pointer hover:text-black hover:text-4xl"
            />
            <Icon
              icon="material-symbols-light:play-circle-outline"
              class="text-7xl absolute left-3 bottom-3"
            />
          </div>
          <!-- div 3 -->
          <div
            class="col-span-2 space-y-1 sm:col-span-2 lg:order-3 lg:col-span-1"
          >
            <aside
              class="h-1/2 w-full border-0 bg-black-400 rounded-sm shadow-sm flex items-center justify-center relative"
            >
              <Icon icon="ic:baseline-photo-library" class="text-5xl" />
              <p>{{}}photos</p>
            </aside>
            <aside
              class="h-1/2 w-full flex shadow-sm bg-black-400 rounded-sm items-center justify-center relative"
            >
              <Icon icon="material-symbols:video-library" class="text-5xl" />
              <p>{{}}videos</p>
            </aside>
          </div>
          <!-- div 4 -->
          <div
            class="col-span-1 p-10 order-2 sm:col-span-1 lg:order-4 lg:col-span-5"
          >
            Div 4
          </div>
          <div
            class="col-span-2 p-10 order-3 sm:col-span-2 lg:order-5 lg:col-span-5"
          >
            Div 5
          </div>
        </div>
      </div>
    </div>

    <article class="bg-white grid grid-cols-6 p-10">
      <div class="col-span-5">
        <h3
          class="relative pl-4 text-black before:absolute tracking-wide text-4xl text-left font-semibold before:left-0 before:top-1/2 mb-10 before:transform before:-translate-y-1/2 before:h-full before:w-1 before:bg-yellow-500"
        >
          Photos
        </h3>
        <main class="h-52 w-full">
          <ul class="flex w-full flex-wrap">
            <li class="m-2" v-for="photo in profileImages">
              <img
                :src="`${imageUrl}/t/p/w185${photo.file_path}`"
                class="object-cover object-center"
                alt=""
              />
            </li>
          </ul>
        </main>
      </div>
    </article>
  </section>
</template>

<script>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useAppStore } from "../../store/AppStore";
import { nextTick } from "vue";

export default {
  components: { Icon },
  data() {
    return {
      h: [],
    };
  },
  methods: {},
  computed: {
    imageUrl() {
      const store = useAppStore();
      return store.apiImageUrl;
    },
    profileImages() {
      const store = useAppStore();
      let images = store.popularCelebSoloImage;
      if (images.length > 10) {
        images = store.popularCelebSoloImage.slice(0, 9);
      } else {
        return images;
      }
      return images;
    },

    profileData() {
      const store = useAppStore();
      return store.popularCelebSingleData;
    },
    assignData() {
      const store = useAppStore();
      this.profileData = store.popularCelebSingleData;
    },
  },
async  mounted() {
nextTick()
  },
  watch: {},
async  created() {
    const store = useAppStore();
    await store.fetchPopularCeleb();
   store.assignPopularCelebData();
    console.log("storesngle data", store.popularCelebSingleData);
    store.fetchPopularCelebSoloImage();
  },
};
</script>
