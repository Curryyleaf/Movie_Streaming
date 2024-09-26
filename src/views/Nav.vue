<template>
  <nav
    class="w-full box-border text-white bg-black-200 overflow-x-hidden flex gap-4 px-4 py-3 items-center"
  >
    <a href="" class="px-6" @click="navigateToHome">
      <Icon
        icon="ri:movie-line"
        width="48"
        height="48"
        style="color: #0000ff"
      />
    </a>
    <label for=" " class="pr-4">
      <font-awesome-icon
        :icon="['fas', 'bars']"
        class="text-lg text-center pr-2"
      />
      <span class=" text-lg">Menu</span>
    </label>

    <!-- input search section -->
    <div
      class="flex rounded-lg h-8 w-1/2 mr-auto box-border bg-white items-center"
    >
      <div class="flex justify-center h-full items-center px-2">
        <p class="text-base font-medium text-black pr-1">All</p>
        <Icon icon="flowbite:caret-down-solid" class="text-black" />
      </div>
      <input
        type="text"
        placeholder="search movies"
        class="w-auto flex flex-grow  bg-white py-1 pl-2 flex-1 h-full border-l border-double border-black"
      />
      <button
        class="box-border bg-white flex mr-2 rounded-lg h-full items-center justify-center w-6"
      >
        <Icon
          icon="prime:search"
          width="48"
          height="48"
          class="text-gray-400"
        />
      </button>
    </div>

    <!-- sign in section -->
    <div class="flex gap-6">
      <h1 class="font-semibold pr-4 border-r-2 border-gray-500 border-solid">MoviePro</h1>
      <div class="flex  items-center">
        <font-awesome-icon :icon="['far', 'bookmark']" class="pr-2" />
        <p>Watch List</p>
      </div>
      <a href="">Sign In</a>
      <label for="" class="flex justify-center items-center">
        <span>EN</span
        ><font-awesome-icon
          class="place-self-start px-1"
          :icon="['fas', 'sort-down']"
        />
      </label>
    </div>
  </nav>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
export default {
  components: {
    Sidebar,
    Icon,
  },
  data() {
    return {};
  },
  methods:{
    navigateToHome(){
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
