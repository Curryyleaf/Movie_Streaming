<template>
  <div  @click="handleClick" class="flex items-center hover:bg-gray-500   rounded-md px-6 py-1 cursor-pointer ">
      <div class="icon-wrapper w-1/3">
        <slot name="icon"></slot>
      </div>
    <span class="text-lg text-left w-2/3">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods:{
    handleClick(){
        this.$emit('dropDownClicked' , )
    }
  }
};
</script>

<style scoped>
.icon-wrapper {
  display: flex;
  align-items: center;
}
</style>
