<script setup>
  import { Search, DollarSign, ArrowDown, ArrowUp } from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-screen bg-orange-50">
    <header class="flex flex-row justify-between items-center p-10">
      <h1 class="text-2xl font-semibold">Home</h1>
      <Search 
        :size="20"
      />
    </header>
    
    <section class="flex flex-col bg-gradient-to-b from-teal-300 to-emerald-300 rounded-xl mx-10">
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

          <p class="font-bold text-lg">$3000.00</p>
        </div>

        <div class="flex flex-col p-6 pt-0 gap-1">
          <div class="flex flex-row items-center gap-1">
            <ArrowDown 
              :size="16"
            />
            <p class="text-sm">Income</p>
          </div>

          <p class="font-bold text-lg">$3000.00</p>
        </div>
      </div>
    </section>

    
  </div>
</template>