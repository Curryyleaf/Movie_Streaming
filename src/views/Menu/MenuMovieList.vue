<template>
  <section>
    <AppList
      @btnClicked="handleButtonCLick"
      @imageClicked="handleImageClick"
      :list="listStore.movies"
      :title="listStore.title"
      :moreItems="moreItem"
    ></AppList>
  </section>
</template>
<script>
import { movie } from "../../data/MenuData";
import AppList from "../../components/Menu/MenuListComponent.vue";
import { useListStore } from "../../store/liststore";
import { mapStores } from "pinia";
export default {
  components: { AppList },
  data() {
    return {
      moreItem:movie
    };
  },
  computed: {
    ...mapStores(useListStore),
  },
  methods: {
    handleImageClick(id){
     if (id) {
        this.$router.push({ name: "MovieDetail", params: { id: id } });
      }
    } ,
    handleButtonCLick() {
      this.listStore.loadMore();
    },
  },
  created() {
    const apiEnd=this.$route.params.apiEnd
    this.listStore.currentApiEnd=apiEnd
    this.listStore.fetchMovieList();
    console.log('helllo check chck' , this.$route.params.apiEnd);
    
  },
};
</script>
