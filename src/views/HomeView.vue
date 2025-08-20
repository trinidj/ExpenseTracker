<script setup>
  import { DollarSign, ArrowDown, ArrowUp, Clapperboard } from 'lucide-vue-next';

  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <!-- Header -->
    <header class="flex flex-row justify-between items-center p-10">
      <h1 class="text-2xl font-semibold static">Home</h1>
    </header>
    
    <!-- Balance Card -->
    <section class="static w-[422px] h-[216px] flex flex-col bg-gradient-to-b from-teal-300 to-emerald-300 rounded-xl mx-10 shadow-black/20 shadow-2xl gap-5 justify-between">
      <div class="flex flex-col p-5 gap-1">
        <div class="flex flex-row items-center gap-1">
          <DollarSign 
            :size="16"
          />
          <p>Total Balance</p>
        </div>

        <p class="font-bold text-3xl">$3,000.00</p>
      </div>

      <div class="flex flex-row items-center justify-between p-5 pt-0">
        <div class="flex flex-col gap-1">
          <div class="flex flex-row items-center gap-1">
            <ArrowDown 
              :size="16"
            />
            <p>Income</p>
          </div>

          <p class="font-semibold text-2xl">$500.00</p>
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex flex-row items-center gap-1">
            <ArrowUp 
              :size="16"
            />
            <p>Expenses</p>
          </div>

          <p class="font-bold text-2xl">$500.00</p>
        </div>
      </div>
    </section>

    <!-- Recent Transactions -->
    <section>
      <header class="flex flex-row items-center justify-between m-10 mb-5">
        <h2 class="text-lg">Recent Transactions</h2>
        <RouterLink to="/transactions">
          <p class="text-[#000000]/50 font-balance text-sm hover:underline">View All</p>
        </RouterLink>
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
  </div>
</template>