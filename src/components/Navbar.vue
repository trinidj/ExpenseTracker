<script setup>
  import { ref } from 'vue';

  import { Plus, Home, ArrowLeftRight, ChartArea, Banknote, } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';

  const isActive = ref(false);
</script>

<template>
  <nav class="fixed bottom-0 h-auto left-0 right-0 bg-white border-t-2 border-t-teal-400 rounded-tr-3xl rounded-tl-3xl px-10 py-4 ">
    <div class="flex flex-row items-center justify-between relative">
      <RouterLink to="/" v-slot="{ isActive }">
        <Home 
          :size="25"
          :class="isActive ? 'text-emerald-500' : 'text-[#888888]'"
        />
      </RouterLink>

      <RouterLink to="/transactions" v-slot="{ isActive }">
        <ArrowLeftRight 
          :size="25"
          :class="isActive ? 'text-emerald-500' : 'text-[#888888]'"
        />
      </RouterLink>

      <button class="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-teal-400 p-4 rounded-full shadow-lg">
        <Plus :size="24" class="text-white" />
      </button>
      
      <button>
        <ChartArea 
          :size="25"
          class="text-[#888888]"
        />
      </button>

      <button>
        <Banknote
          :size="25"
          class="text-[#888888]"
        />
      </button>
    </div>
  </nav>
</template>