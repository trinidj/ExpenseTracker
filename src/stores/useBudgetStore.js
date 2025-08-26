import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useTransactionsStore } from '@/stores/useTransactionsStore';


export const useBudgetStore = defineStore('budgets', () => {
  // states
  const budgets = ref([]);
  let totalBudget = ref(0);

  // getters
  const totalSpent = computed(() => {
    const transactionsStore = useTransactionsStore();

    return transactionsStore.transactions.reduce((total, transaction) => {
      const amount = transaction.amount || 0;
      return amount < 0 ? total + Math.abs(amount) : total;
    }, 0);
  });

  const budgetSpentPercentage = computed(() => {
    return totalBudget.value > 0 ? ((totalSpent.value / totalBudget.value) * 100).toFixed(0) : 0;
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
    budgetSpentPercentage,
    totalSpent,
    addBudgetItem,
  };
}, {
  persist: true
});