import { defineStore } from "pinia";
import { ref } from "vue";

export const useBudgetStore = defineStore('budgets', () => {
  // states
  const budgets = ref([]);
  let totalBudget = ref(0);

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
    addBudgetItem,
  };
}, {
  persist: true
});