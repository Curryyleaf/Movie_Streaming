<template>
  <div class="w-full  overflow-x-auto">
<h3
  class="relative pl-4 text-4xl before:absolute text-left   before:left-0  before:w-1 before:h-full before:bg-yellow-500 before:rounded-lg"
>
  Popular movie celebrities
</h3>

    <div class="flex overflow-clip space-x-4">
      <div v-for="celeb in popularCeleb" :key="celeb.id" class="flex-shrink-0">
        <img
          :src="`https://image.tmdb.org/t/p/w185${celeb.profile_path}`"
          alt=""
          class="w-48 h-48 rounded-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useMoviesStore } from "../store/MovieStore";

export default {
  name: "CelebGrid",

  computed: {
    popularCeleb() {
      const store = useMoviesStore();
      return store.popularCeleb;
    },
    loading() {
      const store = useMoviesStore();
      return store.loading;
    },
  },
  created() {
    const store = useMoviesStore();
    store.fetchPopularCeleb();
  },
};
</script>

<!-- <template>
  <div class="w-full overflow-x-auto">
    <div class="flex space-x-4"> 
      <div v-for="celeb in popularCeleb"  class="flex-shrink-0"> 
        <img
          :src="`https://image.tmdb.org/t/p/w185${celeb.profile_path}`"
          alt=""
          class="w-48 h-72 object-cover" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useMoviesStore } from '../store/MovieStore';

export default {
  name: "CelebGrid",
  computed:{
    popularCeleb(){
        const store= useMoviesStore()
        return store.popularCeleb
    }
  }
};
</script> -->
