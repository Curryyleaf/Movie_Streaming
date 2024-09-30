<template>
  <div class=" text-white   ">
    <div class="flex flex-col mx-auto px-4">
      <!-- Slot for Dynamic Icon Section -->
      <div class=" pb-2">
        <slot name="icon"></slot> 
        <h1 class="py-2 text-2xl font-bold">{{ title }}</h1>
      </div>
       
      <ul class="py-2 ">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="hover:bg-gray-700 rounded"
        >
          <a @click="navigate(item.routeName)" class="block py-2 text-left text-wrap whitespace-pre-wrap max-w-48 cursor-pointer">
            {{ item.anchorText }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
    title:{
        type:String ,
        default:'Your Title'
    }
  },
  methods: {
    navigate(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
