import { defineStore } from "pinia";
import { Clapperboard, Plane, ShoppingCart, Home } from "lucide-vue-next";
import { ref } from "vue";

export const useTransactionsStore = defineStore('transactions', () => {
  // state
  const categories = ref([
    { name: 'Entertainment', icon: Clapperboard },
    { name: 'Travel', icon: Plane },
    { name: 'Shopping', icon: ShoppingCart },
    { name: 'Home', icon: Home },
  ]);

  const transactions = ref([]);

  // action
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      createdAt: new Date()
    };

    transactions.value.unshift(newTransaction);
  };

  const updateTransaction = (id, updatedData) => {
    const index = transactions.value.findIndex(t => t.id === id);
    if (index > -1) {
      transactions.value[index] = { ...transactions.value[index], ...updatedData };
    }
  };

  return { 
    categories, 
    transactions,
    getCategoryByName,
    addTransaction,
    updateTransaction, 
  };
});