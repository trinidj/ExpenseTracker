import { defineStore } from "pinia";
import { ref } from "vue";
import { useBalanceStore } from "@/stores/useBalanceStore";
import { Clapperboard, Apple, Plane, ShoppingCart } from "lucide-vue-next";

export const useTransactionsStore = defineStore('transactions', () => {
  // state
  const transactions = ref([]);
  const categories = ref([
    { name: 'Entertainment', icon: 'Clapperboard', colour: 'emerald' },
    { name: 'Travel', icon: 'Plane', colour: 'blue' },
    { name: 'Food', icon: 'Apple', colour: 'amber' },
    { name: 'Shopping', icon: 'ShoppingCart', colour: 'pink' },
  ]);

  const iconMap = {
    'Clapperboard': Clapperboard,
    'Plane': Plane,
    'Apple': Apple,
    'ShoppingCart': ShoppingCart
  };

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

  const getIconComponent = (iconName) => {
    return iconMap[iconName] || Clapperboard;
  }
    
  // actions
  const addTransaction = (transaction) => {
    const categoryIcon = categories.value.find(cat => cat.name === transaction.category);
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      createdAt: new Date(),
      icon: categoryIcon ? categoryIcon.icon : categories.value[0].icon,
      colour: categoryIcon ? categoryIcon.colour : categories.value[0].colour
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
    getIconComponent,
    addTransaction,
  };
}, {
  persist: true
});