<script setup>
  import { Clapperboard, Filter } from 'lucide-vue-next';
  import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
  <!-- Header -->
  <header class="flex flex-row justify-between items-center p-10">
    <h1 class="text-2xl font-semibold static">Transactions</h1>
  </header>
  
  <div class="mx-10 flex flex-row items-center gap-3 mb-8">
    <SearchBar />
    <button class="cursor-pointer bg-emerald-300 p-2 rounded-md text-white hover:bg-emerald-400 transition duration-200 ease-in-out">
      <Filter />
    </button>
  </div>

  <!-- Transactions -->
  <section class="flex flex-col gap-8">
    <section class="flex flex-col gap-5"> 
      <header>
        <h2 class="flex items-center justify-center text-black/50">Today</h2>
      </header>
      <ul class="flex flex-col mx-10 gap-8">
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
      <ul class="flex flex-col mx-10 gap-8">
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
</template>