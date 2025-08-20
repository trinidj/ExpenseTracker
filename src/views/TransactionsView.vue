<script setup>
  import { Clapperboard, Filter } from 'lucide-vue-next';
  import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <!-- Header -->
    <header class="flex flex-row justify-between items-center p-6">
      <h1 class="text-2xl font-semibold static">Transactions</h1>
    </header>
    
    <section class="mx-6 flex flex-row items-center gap-3 mb-8 flex-shrink-0">
      <SearchBar />
      <button class="cursor-pointer bg-emerald-300 p-2 rounded-md text-white hover:bg-emerald-400 transition duration-200 ease-in-out">
        <Filter />
      </button>
    </section>

    <!-- Transactions -->
    <section class="flex flex-col gap-8 overflow-y-auto flex-1 pb-20">
      <section class="flex flex-col gap-5"> 
        <header>
          <h2 class="flex items-center justify-center text-black/50">Today</h2>
        </header>
        <ul class="flex flex-col mx-6 gap-8">
          <li class="flex flex-row items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-emerald-300 p-2 rounded-md">
                <Clapperboard 
                  class="text-emerald-600"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg">Netflix</h3>
                <p class="text-black/45 text-sm">Entertainment</p>
              </div>
            </div>
            <p class="text-lg font-semibold">
              -$20.00
            </p>
          </li>

          <li class="flex flex-row items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-emerald-300 p-2 rounded-md">
                <Clapperboard 
                  class="text-emerald-600"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg">Netflix</h3>
                <p class="text-black/45 text-sm">Entertainment</p>
              </div>
            </div>
            <p class="text-lg font-semibold">
              -$20.00
            </p>
          </li>

          <li class="flex flex-row items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-emerald-300 p-2 rounded-md">
                <Clapperboard 
                  class="text-emerald-600"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg">Netflix</h3>
                <p class="text-black/45 text-sm">Entertainment</p>
              </div>
            </div>
            <p class="text-lg font-semibold">
              -$20.00
            </p>
          </li>
        </ul>
      </section>

      <section class="flex flex-col gap-5"> 
        <header>
          <h2 class="flex items-center justify-center text-black/50">Yesterday</h2>
        </header>
        <ul class="flex flex-col mx-6 gap-8">
          <li class="flex flex-row items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-emerald-300 p-2 rounded-md">
                <Clapperboard 
                  class="text-emerald-600"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg">Netflix</h3>
                <p class="text-black/45 text-sm">Entertainment</p>
              </div>
            </div>
            <p class="text-lg font-semibold">
              -$20.00
            </p>
          </li>

          <li class="flex flex-row items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-emerald-300 p-2 rounded-md">
                <Clapperboard 
                  class="text-emerald-600"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg">Netflix</h3>
                <p class="text-black/45 text-sm">Entertainment</p>
              </div>
            </div>
            <p class="text-lg font-semibold">
              -$20.00
            </p>
          </li>

          <li class="flex flex-row items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-emerald-300 p-2 rounded-md">
                <Clapperboard 
                  class="text-emerald-600"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg">Netflix</h3>
                <p class="text-black/45 text-sm">Entertainment</p>
              </div>
            </div>
            <p class="text-lg font-semibold">
              -$20.00
            </p>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>