<script setup>
  import { computed } from 'vue';

  import Header from '@/components/layout/Header.vue';

  import { Filter } from 'lucide-vue-next';
  import { ScrollPanel, Button } from 'primevue';
  import SearchBar from '@/components/SearchBar.vue';
  import { useTransactionsStore } from '@/stores/useTransactionsStore';
  import { storeToRefs } from 'pinia';

  const transactionStore = useTransactionsStore();
  const { transactions } = storeToRefs(transactionStore);

  const groupedTransactions = computed(() => {
    return transactionStore.getTransactionsByDate(transactions.value);
  });

  const formatDate = (dateString) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const transactionDate = new Date(dateString).toDateString();

    if (transactionDate === today) {
      return 'Today';
    }
    if (transactionDate === yesterday) {
      return 'Yesterday';
    }
    
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (transaction) => {
    const date = new Date(transaction.createdAt);
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit', 
      hour12: true
    });
  };
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <!-- Header -->
    <Header page-title="Transactions" />
    
    <div class="mx-6 flex flex-row items-center gap-3 mb-8 flex-shrink-0">
      <SearchBar />
      
      <Button
        unstyled 
        class="cursor-pointer bg-emerald-300 p-2 rounded-md text-white hover:bg-emerald-400 transition duration-200 ease-in-out"
      >
        <Filter />
      </Button>
    </div>

    <!-- Transactions -->
    <ScrollPanel unstyled class="flex flex-col overflow-y-auto flex-1 pb-20">
      <section class="flex flex-col gap-6">
        <div
          v-for="(transactionsInDate, date) in groupedTransactions"
          :key="date"
          class="flex flex-col"
        > 
          <header>
            <h2 class="flex m-3 mt-0 items-center justify-center text-black/50 text-sm">{{ formatDate(date) }}</h2>
          </header>
          <ul class="flex flex-col mx-6 gap-4">
            <li
              v-for="transaction in transactionsInDate"
              :key="transaction.id" 
              class="flex flex-row items-center justify-between"
            >
              <div class="flex items-center gap-4">
                <div :class="[`flex items-center justify-center p-2 rounded-lg`, transactionStore.getBackgroundClass(transaction.colour)]">
                  <component 
                    :is="transactionStore.getIconComponent(transaction.icon)"
                    :size="20"
                    :class="transactionStore.getTextClass(transaction.colour)"
                  />
                </div>

                <div class="flex flex-col">
                  <h3 class="text-base">{{ transaction.name }}</h3>
                  <p class="text-black/45 text-xs">{{ formatTime(transaction) }}</p>
                </div>
              </div>
              <p :class="['text-base font-medium', {
                'text-red-400': transaction.amount <= 0,
                'text-emerald-400': transaction.amount > 0,
              }]">
                {{ transaction.type === 'Expense' ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </ScrollPanel>
  </div>
</template>