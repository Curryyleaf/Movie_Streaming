<div class="grid grid-rows-5 h-screen">

  <div class="row-span-2 bg-blue-500 overflow-hidden">
    <div class="grid grid-cols-3 gap-4 p-4">
      <!-- Loop through child items for first section -->
      <div v-for="item in firstSectionItems" :key="item.id" class="bg-white p-2">
     
      </div>
    </div>
  </div>

  <!-- Second Section (2 rows) -->
  <div class="row-span-2 bg-green-500 overflow-hidden">
    <div class="grid grid-cols-4 gap-4 p-4">

      <div v-for="item in secondSectionItems" :key="item.id" class="bg-white p-2">
   
      </div>
    </div>
  </div>

  <!-- Last Section (1 row) -->
  <div class="row-span-1 bg-red-500 overflow-hidden">
    <div class="grid grid-cols-2 gap-4 p-4">
      <!-- Loop through child items for last section -->
      <div v-for="item in lastSectionItems" :key="item.id" class="bg-white p-2">
        <!-- Content for each child in the last section -->
      </div>
    </div>
  </div>
</div>
