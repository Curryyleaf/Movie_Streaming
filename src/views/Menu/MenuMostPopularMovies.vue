<template>
  <section>
    <AppList
      @btnClicked="handleButtonCLick"
      :list="listStore.mostPopularMovies"
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
      title: "Most Popular Movies",
      moreItem:movie
    };
  },
  computed: {
    ...mapStores(useListStore),
  },
  methods: {
    handleButtonCLick() {
      this.listStore.loadMorePopularMovies();
    },
  },
  created() {
    this.listStore.fetchMostPopularMovies();
  },
};
</script>
