import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useTransactionsStore } from '@/stores/useTransactionsStore';


export const useBudgetStore = defineStore('budgets', () => {
  // states
  const transactionsStore = useTransactionsStore();
  const budgets = ref([]);
  let totalBudget = ref(0);

  // getters
  const totalSpent = computed(() => {

    return transactionsStore.transactions.reduce((total, transaction) => {
      if (transaction.type === 'Expense') {
        const amount = parseFloat(transaction.amount) || 0;
        return total + amount;
      }
      return total;
    }, 0);
  });

  const getBudgetSpentPercentage = computed(() => {
    return totalBudget.value > 0 ? ((totalSpent.value / totalBudget.value) * 100).toFixed(0) : 0;
  });

  const getCategorySpending = computed(() => {
    return (category) => {
      return transactionsStore.transactions.reduce((total, transaction) => {
        if (transaction.type === 'Expense' && transaction.category === category) {
          const amount = parseFloat(transaction.amount) || 0;
          return total + amount;
        }
        return total;
      }, 0);
    };
  });

  // actions
  const addBudgetItem = (budget) => {
    const newBudget = {
      id: Date.now(),
      ...budget,
    };

    budgets.value.push(newBudget);
  };

  return {
    budgets,
    totalBudget,
    totalSpent,
    getBudgetSpentPercentage,
    getCategorySpending,
    addBudgetItem,
  };
}, {
  persist: true
});