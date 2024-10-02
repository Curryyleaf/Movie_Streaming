<template>
  <section>
    <AppList
      @btnClicked="handleButtonCLick"
      :list="listStore.topRatedMovies"
      :title="title"
      :moreItems="moreItem"
    ></AppList>
  </section>
</template>
<script>
import { movie } from "../../data/MenuData";
import AppList from "../../components/MenuList.vue";
import { useListStore } from "../../store/liststore";
import { mapStores } from "pinia";
export default {
  components: { AppList },
  data() {
    return {
      title: "Top Rated Movies",
      moreItem:movie
    };
  },
  computed: {
    ...mapStores(useListStore),
  },
  methods: {
    handleButtonCLick() {
      this.listStore.loadMoreTopRated();
    },
  },
  created() {
    this.listStore.fetchTopRatedMovies();
  },
};
</script>
