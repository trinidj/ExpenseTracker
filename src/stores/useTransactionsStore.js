import { defineStore } from "pinia";
import { ref } from "vue";

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref([]);

  const getTransactions = () => {
    const stored = localStorage.getItem('transactions');
    
    if (stored) {
      transactions.value = JSON.parse(stored);
    }
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      createdAt: new Date()
    };

    transactions.value.unshift(newTransaction);

    localStorage.setItem('transactions', JSON.stringify(transactions.value));
  };

  return { 
    transactions,
    getTransactions,
    addTransaction,
  };
});