import { defineStore } from "pinia";
import { ref } from "vue";

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref([]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      createdAt: new Date()
    };

    transactions.value.unshift(newTransaction);
  };

  return { 
    transactions,
    addTransaction,
  };
});