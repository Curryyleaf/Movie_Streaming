<template>
  <section
    class="w-full bg-black flex h-full text-white gap-5 box-border z-50 p-12"
  >
    <!-- Dynamically render Sidebar components -->

    <Sidebar
      v-for="category in categories"
      :key="category.title"
      :menuItems="category.items"
      :title="category.title"
      @anchor-clicked="handleAnchorClick"
    >
      <template v-slot:icon>
        <Icon :icon="category.icon" width="48" height="48" />
      </template>
    </Sidebar>
    <Icon
      icon="ant-design:close-circle-filled"
      width="48"
      height="48"
      class="text-white flex-grow hover:cursor-pointer"
      @click="closeSidebars"
    />
  </section>
</template>

<script>
import { Icon } from "@iconify/vue/dist/iconify.js";
import Sidebar from "../components/App/AppMenuModalComponent.vue";
import { awards, celeb, community, movie, review, tv } from "../data/MenuData";
import { useListStore } from "../store/liststore";
import { useAppStore } from "../store/AppStore";

export default {
  components: { Sidebar, Icon },
  data() {
    return {
      movieItems: movie,
      tvItems: tv,
      celebItems: celeb,
      communityItems: community,
      awardsItems: awards,
      reviewItems: review,
    };
  },
  computed: {
    categories() {
      const category = [
        {
          title: "Movie",
          items: this.movieItems,
          icon: "arcticons:google-movies",
        },
        {
          title: "TV Shows",
          items: this.tvItems,
          icon: "mdi-light:television",
        },
        {
          title: "Celebrities",
          items: this.celebItems,
          icon: "healthicons:people",
        },
        {
          title: "Community",
          items: this.communityItems,
          icon: "material-symbols-light:globe",
        },
        {
          title: "Awards",
          items: this.awardsItems,
          icon: "f7:star-circle-fill",
        },
        {
          title: "Review",
          items: this.reviewItems,
          icon: "f7:star-circle-fill",
        },
      ];
      return category;
    },
  },
  methods: {
    handleAnchorClick(payload) {
      const store = useListStore();
      store.title = payload.title;
      const apiEnd = payload.apiEnd;
      this.$router.push({
        name: "MenuMovieList",
        params: {
          apiEnd: apiEnd,
        },
      });
      store.showMenu = false;
    },
    closeSidebars() {
      this.$emit("closeModal");
    },
  },
  mounted() {
    console.log("data from movie", this.movieItems);
    console.log("data from movie2", movie);
  },
};
</script>

<style scoped></style>
