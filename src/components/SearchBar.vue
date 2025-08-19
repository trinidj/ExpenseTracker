<script setup>
  import { Search } from 'lucide-vue-next';
</script>

<template>
  <div class="w-full bg-[#888888]/27 flex flex-row items-center gap-2 p-2 rounded-md">
    <Search 
      class="text-[#888888]"
      :size="20"
    />
    <input 
      type="text" 
      placeholder="Search"
      class="w-full focus:outline-0"  
    />
  </div>
</template>