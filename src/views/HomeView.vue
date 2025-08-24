<script setup>
  import { DollarSign, ArrowDown, ArrowUp } from 'lucide-vue-next';

  import { RouterLink } from 'vue-router';

  import { useTransactionsStore } from '@/stores/useTransactionsStore';

  import { storeToRefs } from 'pinia';

  const transactionStore = useTransactionsStore();
  const { transactions } = storeToRefs(transactionStore);

  
</script>

<template>
  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <!-- Header -->                                           
    <header class="flex flex-row justify-start items-center px-6 py-8">
      <h1 class="text-zinc-800 text-2xl font-semibold">Home</h1>
    </header>
    
    <!-- Balance Card -->
    <section class="static flex flex-col bg-gradient-to-b from-emerald-300 to-[#6EE7DB] rounded-xl mx-6 shadow-black/20 shadow-2xl gap-5 justify-between">
      <div class="flex flex-col p-5 gap-1 text-gray-50">
        <div class="flex flex-row items-center gap-1">
          <DollarSign 
            :size="16"
          />
          <p class="">Total Balance</p>
        </div>

        <p class="font-medium text-3xl">$3,000.00</p>
      </div>

      <div class="flex flex-row items-center justify-between p-5 pt-0">
        <div class="flex flex-col gap-1 text-gray-50">
          <div class="flex flex-row items-center gap-1">
            <ArrowDown 
              :size="16"
            />
            <p>Income</p>
          </div>

          <p class="font-medium text-2xl">$500.00</p>
        </div>

        <div class="flex flex-col gap-1 text-gray-50">
          <div class="flex flex-row items-center gap-1">
            <ArrowUp 
              :size="16"
            />
            <p>Expenses</p>
          </div>

          <p class="font-medium text-2xl">$500.00</p>
        </div>
      </div>
    </section>

    <!-- Recent Transactions -->
    <section>
      <header class="flex flex-row items-center justify-between m-6 mb-5">
        <h2 class="text-lg text-zinc-900">Recent Transactions</h2>
        <RouterLink to="/transactions">
          <p class="text-[#000000]/50 font-balance text-sm hover:underline">View All</p>
        </RouterLink>
      </header>

      <ul class="mx-6 flex flex-col gap-4">
        <li
          v-for="transaction in transactions"
        >
          <div class="flex flex-row items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex flex-col">
                <h3 class="text-base">{{ transaction.name }}</h3>
                <p class="text-black/45 text-xs">{{  }}</p>
              </div>
            </div>
            <p :class="['text-base font-medium', {
              'text-red-400': transaction.amount <= 0,
              'text-emerald-400': transaction.amount > 0,
            }]">
              {{ transaction.amount }}
            </p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>