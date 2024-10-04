<template>
  <nav
    class="w-full box-border sticky top-0 z-40 text-white bg-black-300 flex gap-4 px-4 py-3 items-center"
  >
    <a href="" class="px-6 hover:cursor-pointer" @click="navigateToHome">
      <Icon
        icon="ri:movie-line"
        width="48"
        height="48"
        style="color: #0000ff"
      />
    </a>
    <label for=" " class="pr-4 hover:cursor-pointer">
      <font-awesome-icon
        :icon="['fas', 'bars']"
        class="text-lg text-center pr-2"
        @click="openMenu"
      />
      <span class="text-lg">Menu</span>
    </label>

    <!-- input search section -->
    <div
      class="flex rounded-lg h-8 w-1/2 mr-auto box-border bg-white items-center"
    >
      <div
        @click="openInputDropDown"
        ref="dropDownParent"
        class="px-2 text-black"
      >
        <div
          class="flex justify-center hover:cursor-pointer h-full items-center"
        >
          <p class="text-base font-medium pr-1">All</p>
          <Icon icon="flowbite:caret-down-solid" class="" />
        </div>
        <div
          v-if="canInputDropDown"
          ref="dropDown"
          class="bg-black-300 border-t-0 text-white py-2 border-b h-[42vh] rounded-md absolute top-[9vh] left-[15vw]"
        >
          <NavCategoryDrop
            v-for="(item, index) in categories"
            :key="index"
            :text="item.name"
            @click="handleDropDownClick(item.name)"
          >
            <template #icon>
              <Icon :icon="item.icon" width="24" height="24" />
            </template>
          </NavCategoryDrop>
        </div>
      </div>
      <input
        v-model="query"
        @input="onSearchInput"
        type="text"
        placeholder="search movies"
        class="w-auto flex flex-grow text-black bg-white py-1 pl-2 flex-1 h-full border-l border-double border-black"
      />
      <button
        @click="onSearchInput"
        class="box-border bg-white flex mr-2 rounded-lg h-full items-center justify-center w-6"
      >
        <Icon
          icon="prime:search"
          width="48"
          height="48"
          class="text-gray-400"
        />
      </button>
      <div v-if="query" class="absolute top-[15vh] w-full ">
        <NavSearchModal
        :results="searchedResults"
        ></NavSearchModal>
      </div>
    </div>

    <!-- sign in section -->
    <div class="flex gap-6">
      <h1 class="font-semibold pr-4 border-r-2 border-gray-500 border-solid">
        MoviePro
      </h1>
      <div
        class="flex hover:cursor-pointer hover:text-gray-400 items-center"
        @click="navigateToWatchList"
      >
        <font-awesome-icon :icon="['far', 'bookmark']" class="pr-2" />
        <p>Watch List</p>
      </div>
      <button @click="logout">Log out</button>
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
import Sidebar from "../components/App/AppMenuModalComponent.vue";
import NavSearchModal from "../components/Nav/NavSearchModal.vue";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { mapState } from "pinia";
import { useListStore } from "../store/liststore";
import NavCategoryDrop from "../components/Nav/NavCategoryDrop.vue";
export default {
  components: {
    Sidebar,
    Icon,
    NavCategoryDrop,
    NavSearchModal,
  },
  data() {
    return {
      query: "",
      canInputDropDown: false,
      categories: [
        { name: "Tv ", icon: "lucide:tv" },
        { name: "Movies", icon: "mage:video-player" },
        { name: "Celebrities", icon: "ic:baseline-people" },
        {
          name: "Collection",
          icon: "fluent:collections-20-regular",
        },
        { name: "Company" },
        { name: "Keyword", icon: "solar:reel-outline" },
        {
          name: "All",
          icon: "material-symbols-light:border-all-outline",
        },
      ],
    };
  },
  computed: {
    ...mapState(useListStore, ["showMenu" , "searchedResults"]),
    showMenu() {
      return this.showMenu;
    },
    logout() {
      this.$cookies.remove("authenticated");
      this.$router.push({ name: "Login" });
    },
    canLogOut() {
      this.$cookies.get("requestToken");
    },
  },
  methods: {
    handleClickOutside(event) {
      const dropdown = this.$refs.dropDown;
      const container = this.$refs.dropDownParent;
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        !container.contains(event.target)
      ) {
        this.canInputDropDown = false;
      }
    },
    handleDropDownClick(selectedCategory) {
      this.canInputDropDown = false;
      const store = useListStore();
      store.searchCategory = selectedCategory;
    },
    openInputDropDown() {
      this.canInputDropDown = !this.canInputDropDown;
    },
    onSearchInput() {
      const store = useListStore();
      store.query = this.query;
      store.fetchSearch();
    },
    navigateToWatchList() {
      this.$router.push({ name: "WatchList" });
    },
    navigateToHome() {
      this.$router.push({ name: "Home" });
    },
    openMenu() {
      console.log("open modela is called");

      this.$emit("openModal");
    },
  },
  created() {
    const store = useListStore();
    store.fetchSearch();
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
 
};
</script>



<!-- load more on scroll
scroll after each 5 but load 10 
debounce the api calls number

Client-Side Caching
v-once
Use of Web Workers
Background Processing: Offload intensive computations to web workers. This prevents blocking the main thread and keeps the UI responsive.
Use Placeholders: Display low-resolution placeholders while loading high-resolution images to improve perceived performance.
Image Formats: Use modern formats like WebP for better compression and faster loading.

. Utilizing APIs Effectively
Rate Limiting: Be mindful of API rate limits. Implement mechanisms to handle errors gracefully when limits are reached.
Prefetching and Preloading: Use techniques to prefetch data that the user is likely to need next based on their behavior (e.g., preloading suggestions). -->