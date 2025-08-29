import { defineStore } from "pinia";
import { ref } from "vue";
import { useBalanceStore } from "@/stores/useBalanceStore";
import { Clapperboard, Apple, Plane, House } from "lucide-vue-next";

export const useTransactionsStore = defineStore('transactions', () => {
  // state
  const transactions = ref([]);
  const categories = ref([
    { name: 'Entertainment', icon: Clapperboard },
    { name: 'Travel', icon: Plane },
    { name: 'Food', icon: Apple },
    { name: 'Housing', icon: House },
  ]);

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
    const categoryIcon = categories.value.find(cat => cat.name === transaction.category);
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      createdAt: new Date(),
      icon: categoryIcon ? categoryIcon.icon : categories.value[0].icon
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
    categories,
    getTransactionsByDate,
    addTransaction,
  };
}, {
  persist: true
});