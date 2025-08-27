import { defineStore } from "pinia";
import { ref } from "vue";

export const useBalanceStore = defineStore('balance', () => {
  // states
  let totalBalance = ref(0);
  let totalIncome = ref(0);
  // getters

  // actions
  const setBalance = (amount) => {
    totalBalance.value = amount;
  }

  const setIncome = (amount) => {
    totalIncome.value = amount;
  }

  return {
    totalBalance,
    totalIncome,
    setBalance,
    setIncome,
  }
}, {
  persist: true
});