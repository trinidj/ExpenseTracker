import { defineStore } from "pinia";
import { ref } from "vue";
import { useBalanceStore } from "@/stores/useBalanceStore";

export const useTransactionsStore = defineStore('transactions', () => {
  // state
  const transactions = ref([]);

  // getters
  const getTransactionsByDate = (transactions) => {
    const groupedTransactions = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.createdAt);
      const dateKey = date.toDateString();

      if (!groupedTransactions[dateKey]) {
        groupedTransactions[dateKey] = [];
      }

      groupedTransactions[dateKey].push(transaction);
    });

    return groupedTransactions;
  }
    
  // actions
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      createdAt: new Date()
    };
    transactions.value.unshift(newTransaction);
    
    const balanceStore = useBalanceStore();
    const absoluteAmount = Math.abs(transaction.amount);
    
    if (transaction.amount < 0) {
      balanceStore.totalBalance -= absoluteAmount;
      balanceStore.totalExpenses += absoluteAmount;
    } else {
      balanceStore.totalBalance += absoluteAmount;
    }
  };

  return { 
    transactions,
    getTransactionsByDate,
    addTransaction,
  };
}, {
  persist: true
});