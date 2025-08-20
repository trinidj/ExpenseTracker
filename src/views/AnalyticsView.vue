<script setup>
  import { Calendar } from 'lucide-vue-next';
</script>

<template>
  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <!-- Header -->
    <header class="flex flex-row justify-between items-center p-10">
      <h1 class="text-2xl font-semibold static">Analytics</h1>
    </header>
    
    <!-- Current Week's Spending -->
    <section class="static h-65 flex flex-col bg-white rounded-xl mx-10 shadow-black/15 shadow-2xl gap-5">
      <div class="flex flex-col">
        <!-- Header -->
        <div class="flex flex-row items-center p-5 gap-2">
          <Calendar 
            :size="20"
          />
          <h2 class="font-bold">This Weeks Expenses</h2>
        </div>

        <!-- Chart -->
        <div>

        </div>
      </div>
    </section>

    <!-- Top Categories -->
    <section class="static h-95 flex flex-col bg-white rounded-xl mx-10 shadow-black/15 shadow-2xl gap-5 mt-5">
      <div class="flex flex-col">
        <!-- Header -->
        <div class="flex flex-row items-center p-5 gap-2">
          <Calendar 
            :size="20"
          />
          <h2 class="font-bold">Top Categories</h2>
        </div>

        <!-- Chart -->
        <div>

        </div>
      </div>
    </section>
  </div>
</template>