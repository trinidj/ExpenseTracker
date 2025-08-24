import { defineStore } from "pinia";
import { Clapperboard } from "lucide-vue-next";
import { ref } from "vue";

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref([
    { name: 'Netflix', amount: parseFloat('-20.00'), icon: Clapperboard, size: 35 },
    { name: 'Netflix', amount: parseFloat('-20.00'), icon: Clapperboard, size: 35 },
  ]);
  
  return { transactions };
});