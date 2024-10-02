<template>
  <div class="min-h-screen bg-black text-white p-6">
    <h1 class="text-4xl font-bold mb-6 text-center">My Watch List</h1>
    <input
      v-model="query"
      @keyup.enter="searchMovies"
      type="text"
      placeholder="Search for movies..."
      class="p-2 w-full mb-4 border border-gray-600 rounded bg-gray-800 text-white"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="movie in moviesList"
        :key="movie.id"
        class="bg-gray-900 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
      >
        <img
          :src="`${imageUrl}/t/p/w500/${movie.poster_path}`"
          alt="Movie Poster"
          class="w-full h-64 object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ movie.title }}</h2>
          <p class="text-gray-400">{{ movie.release_date }}</p>
          <button
            @click="addToWatchlist(movie)"
            class="mt-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Add to Watch List
          </button>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold mt-8 mb-4">My Watchlist</h2>
    <div v-if="watchlist.length === 0" class="text-gray-400">Your watchlist is empty.</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="movie in watchlist"
        :key="movie.id"
        class="bg-gray-900 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
      >
        <img
          :src="`${imageUrl}/t/p/${movie.poster_path}}`"
          alt="Movie Poster"
          class="w-full h-64 object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ movie.title }}</h2>
          <p class="text-gray-400">{{ movie.release_date }}</p>
          <button
            @click="removeFromWatchlist(movie.id)"
            class="mt-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
          >
            Remove from Watchlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../Service/api';

export default {
  data() {
    return {
      query: '',
      moviesList: [],
      watchlist: [],
    };
  },
  computed:{
  imageUrl(){
   const store=useAppStore()
   return store.apiImageUrl
 }
  } ,
  methods: {
    async searchMovies() {
      if (!this.query) return;
      const response = await axios.get(
        `/search/movie?api_key=${apiKey}&query=${this.query}`
      );
      this.moviesList = response.data.results;
    },
    addToWatchlist(movie) {
      if (!this.watchlist.find((m) => m.id === movie.id)) {
        this.watchlist.push(movie);
      }
    },
    removeFromWatchlist(movieId) {
      this.watchlist = this.watchlist.filter((m) => m.id !== movieId);
    },
  },
};
</script>

<style scoped>
</style>
