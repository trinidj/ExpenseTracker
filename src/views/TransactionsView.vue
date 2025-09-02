<script setup>
  import { computed, ref } from 'vue';

  import Header from '@/components/layout/Header.vue';
  
  import { Filter } from 'lucide-vue-next';
  import { ScrollPanel, Button, Drawer, SelectButton, Select } from 'primevue';
  import SearchBar from '@/components/SearchBar.vue';
  import { useTransactionsStore } from '@/stores/useTransactionsStore';

  const transactionStore = useTransactionsStore();

  const visible = ref(false);
  const activeFilters = ref({});

  const filteredTransactions = computed(() => {
    let filtered = transactionStore.transactions;

    if (activeFilters.value.type) {
      filtered = filtered.filter(transaction => 
        transaction.type === activeFilters.value.type
      );
    }

    if (activeFilters.value.category) {
      filtered = filtered.filter(transaction => 
        transaction.category === activeFilters.value.category
      );
    }

    return filtered;
  });

  const groupedTransactions = computed(() => {
    return transactionStore.getTransactionsByDate(filteredTransactions.value);
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
    const date = new Date(transaction.created);
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit', 
      hour12: true
    });
  };

  const currentDateOption = ref('');
  const dateRangeOptions = ref(['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year']);

  const currentTransactionType = ref('');
  const transactionTypeOptions = ref(['Income', 'Expense']);

  const selectedCategory = ref('');

  const availableCategories = computed(() => {
    if (currentTransactionType.value === 'Income') {
      return transactionStore.incomeCategories;
    } else if (currentTransactionType.value === 'Expense') {
      return transactionStore.expenseCategories;
    }
    return [];
  });

  const handleFilterSubmit = () => {
    activeFilters.value = {
      type: currentTransactionType.value || null,
      category: selectedCategory.value || null
    };  

    visible.value = false;
  }

  const clearFilters = () => {
    currentDateOption.value = '';
    currentTransactionType.value = '';
    selectedCategory.value = '';
    activeFilters.value = {
      type: null,
      category: null
    };
  }
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <!-- Header -->
    <Header page-title="Transactions" />

    <Drawer
      header="Filter"
      v-model:visible="visible"
      position="bottom"
      class="h-fit! rounded-tl-lg rounded-tr-lg"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <h2 class=" font-medium">Start Date</h2>
          <SelectButton 
            fluid 
            v-model="currentDateOption"
            :options="dateRangeOptions"
            size="small"
            class="touch-manipulation"
          />
        </div>

        <div class="flex flex-col gap-2">
          <h2 class="font-medium">Transaction Type</h2>
          <SelectButton 
            fluid
            v-model="currentTransactionType"
            :options="transactionTypeOptions"
            size="small"
            class="touch-manipulation"
          />
        </div>

        <div class="flex flex-col gap-2">
          <h2 class="font-medium">Category</h2>
          <Select 
            placeholder="Select a Category"
            fluid                     
            v-model="selectedCategory"
            :options="availableCategories"
            option-label="name"
            option-value="name"
            :disabled="!currentTransactionType"
            size="small"
            class="touch-manipulation"
          />
        </div>

        <div class="flex justify-end gap-4">
          <Button label="Clear" severity="secondary" @click="clearFilters" class="touch-manipulation"/>
          <Button label="Cancel" severity="secondary" @click="visible = false" class="touch-manipulation"/>
          <Button label="Filter" @click="handleFilterSubmit" class="touch-manipulation"/>
        </div>
      </div>
    </Drawer>
    
    <div class="mx-6 flex flex-row items-center gap-3 mb-8 flex-shrink-0">
      <SearchBar />
      
      <Button
        unstyled 
        type="button"
        class="cursor-pointer bg-emerald-300 p-2 rounded-md text-white hover:bg-emerald-400 transition duration-200 ease-in-out touch-manipulation"
        @click="visible = true"
      >
        <Filter />
      </Button>                                         
    </div>

    <!-- Transactions -->
    <ScrollPanel unstyled class="flex flex-col overflow-y-auto flex-1 pb-20">
      <section class="flex flex-col gap-6">
        <div
          v-if="transactionStore.transactions.length > 0"
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
                    :is="transactionStore.getIconComponent(transaction.icon, transaction.type)"
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
                'text-red-400': transaction.type === 'Expense',
                'text-emerald-400': transaction.type === 'Income',
              }]">
                {{ transaction.type === 'Expense' ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
              </p>
            </li>
          </ul>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center min-h-64 text-black/50"
        >
          <p>No transactions yet.</p>
          <p class="text-sm">Create your first transaction!</p>
        </div>
      </section>
    </ScrollPanel>
  </div>
</template>