<template>
  <div class="fixed top-16  left-[15%] inset-0 z-50  rounded-lg shadow-lg max-h-[50vh] mr-auto  items-center justify-center bg-black-300 w-[60%]  ">
    <div class=" p-6 w-full">
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Results</h3>
        <ul>
          <li v-for="item in results" :key="item.id" class="flex items-center mt-2 border-b py-2">
            <img :src="item.poster" alt="" class=" rounded mr-2" />
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
async  created(){
await this.results
  } ,
  props:{
    results:{
     type:Array , 
     default:[]
    } , 
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



</style>
