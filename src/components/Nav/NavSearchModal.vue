<template>
  <div v-if="isOpen" class="fixed  inset-0 z-50 flex items-center justify-center bg-black w-[70%] bg-opacity-50 ">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Search</h2>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search for movies or shows..."
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring"
        @input="handleSearch"
      />
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Results</h3>
        <ul>
          <li v-for="item in results" :key="item.id" class="flex items-center mt-2 border-b py-2">
            <img :src="item.poster" alt="" class="w-16 h-24 rounded mr-2" />
            <div>
              <h4 class="font-medium">{{ item.title }}</h4>
              <p class="text-sm text-gray-600">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>
      <button @click="isOpen = false" class="mt-4 p-2 bg-red-600 text-white rounded hover:bg-red-700">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',

      movies: [
        { id: 1, title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.', poster: 'https://via.placeholder.com/100x150' },
        { id: 2, title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', poster: 'https://via.placeholder.com/100x150' },
       
      ]
    };
  },
  methods: {
    handleSearch() {
      if (this.searchTerm) {
        this.results = this.movies.filter(movie => 
          movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.results = [];
      }
    }
  } ,
  props:{
    results:{
     type:Array , 
     default:[]
    } , 
    isOpen:{
        type:Boolean ,
        default:false
    }
  }
};
</script>

<style scoped>
@keyframes wave {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.pulse {
  position: relative;
  display: inline-block;
}

.pulse::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px; /* adjust the size */
  height: 100px; /* adjust the size */
  border-radius: 50%;
  background: rgba(0, 123, 255, 0.5); /* adjust color */
  animation: wave 2s infinite; /* duration and repeat */
  transform: translate(-50%, -50%);
}

</style>
