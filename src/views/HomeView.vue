<script setup>
  import { Search, DollarSign, ArrowDown, ArrowUp, Clapperboard, Plus, Home, ArrowLeftRight, ChartArea, Banknote } from 'lucide-vue-next';

  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <!-- Header -->
    <header class="flex flex-row justify-between items-center p-10">
      <h1 class="text-2xl font-semibold static">Home</h1>
      <Search 
        class="static"
        :size="20"
      />
    </header>
    
    <!-- Balance Card -->
    <section class="static flex flex-col bg-gradient-to-b from-teal-300 to-emerald-300 rounded-xl mx-10 shadow-black/20 shadow-2xl">
      <div class="flex flex-col p-6 gap-1">
        <div class="flex flex-row items-center gap-1">
          <DollarSign 
            :size="16"
          />
          <p class="text-sm">Total Balance</p>
        </div>

        <p class="font-bold text-3xl">$3,000.00</p>
      </div>

      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-col p-6 pt-0 gap-1">
          <div class="flex flex-row items-center gap-1">
            <ArrowDown 
              :size="16"
            />
            <p class="text-sm">Income</p>
          </div>

          <p class="font-bold text-lg">$500.00</p>
        </div>

        <div class="flex flex-col p-6 pt-0 gap-1">
          <div class="flex flex-row items-center gap-1">
            <ArrowUp 
              :size="16"
            />
            <p class="text-sm">Expenses</p>
          </div>

          <p class="font-bold text-lg">$500.00</p>
        </div>
      </div>
    </section>

    <!-- Recent Transactions -->
    <section>
      <header class="flex flex-row items-center justify-between m-10 mb-5">
        <h2 class="text-lg">Recent Transactions</h2>
        <p class="text-sm">View All</p>
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

    <nav class="fixed bottom-0 h-auto left-0 right-0 bg-white border-t-2 border-t-teal-400 rounded-tr-3xl rounded-tl-3xl px-10 py-4 ">
      <div class="flex flex-row items-center justify-between relative">
        <RouterLink to="/">
          <Home 
            :size="30"
          />
        </RouterLink>

        <RouterLink to="/transactions">
          <ArrowLeftRight 
            :size="30"
          />
        </RouterLink>

        <button class="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 bg-teal-400 p-4 rounded-full shadow-lg">
          <Plus :size="24" class="text-white" />
        </button>
        
        <button>
          <ChartArea 
            :size="30"
          />
        </button>

        <button>
          <Banknote
            :size="30"
          />
        </button>
      </div>
    </nav>
  </div>
</template>