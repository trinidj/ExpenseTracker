<script setup>
  import { Search, DollarSign, ArrowDown, ArrowUp } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="bg-[#FFE3C6] h-62 rounded-bl-2xl rounded-br-2xl">
    <header class="flex flex-row justify-between items-center p-10">
      <h1 class="text-2xl font-semibold static">Home</h1>
      <Search 
        class="static"
        :size="20"
      />
    </header>
    
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

    <section>
      <header class="flex flex-row justify-between m-10">
        <h2>Recent Transactions</h2>
        <RouterLink />
      </header>
    </section>
  </div>
</template>