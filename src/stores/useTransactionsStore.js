import { defineStore } from "pinia";
import { ref } from "vue";
import { useBalanceStore } from "@/stores/useBalanceStore";
import { Clapperboard, Apple, Plane, ShoppingCart, BriefcaseBusiness, TrendingUp, Gift, CreditCard, Briefcase } from "lucide-vue-next";

export const useTransactionsStore = defineStore('transactions', () => {
  // state
  const transactions = ref([]);
  
  const incomeIconMap = {
    'BriefcaseBusiness': BriefcaseBusiness,
    'TrendingUp': TrendingUp,
    'Gifts / Allowance': Gift,
    'Refunds / Reimbursments': CreditCard,
  };

  const expenseIconMap = {
    'Clapperboard': Clapperboard,
    'Plane': Plane,
    'Apple': Apple,
    'ShoppingCart': ShoppingCart,
  };

  const incomeCategories = ref([
    { name: 'Salary', icon: 'BriefcaseBusiness' },
    { name: 'Investments', icon: 'TrendingUp' },
    { name: 'Gifts / Allowance', icon: 'Gift' },
    { name: 'Refunds / Reimbursments', icon: 'CreditCard' },
  ]);

  const expenseCategories = ref([
    { name: 'Entertainment', icon: 'Clapperboard', colour: 'emerald' },
    { name: 'Travel', icon: 'Plane', colour: 'blue' },
    { name: 'Food', icon: 'Apple', colour: 'amber' },
    { name: 'Shopping', icon: 'ShoppingCart', colour: 'pink' },
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
  };

  const getBackgroundClass = (colour) => {
    const colourMap = {
      emerald: 'bg-emerald-300',
      blue: 'bg-blue-300',
      amber: 'bg-amber-300',
      pink: 'bg-pink-300',
    };

    return colourMap[colour];
  };

  const getTextClass = (colour) => {
    const colourMap = {
      emerald: 'text-emerald-700',
      blue: 'text-blue-700',
      amber: 'text-amber-700',
      pink: 'text-pink-700',
    };
    
    return colourMap[colour];
  };

  const getIconComponent = (iconName, transactionType) => {
    if (transactionType === 'Expense') {
      return expenseIconMap[iconName];
    } 
    
    return incomeIconMap[iconName];
  };
    
  // actions
  const addTransaction = (transaction) => {
    const incomeCategoryIcon = incomeCategories.value.find(cat => cat.name === transaction.category);
    const expenseCategoryIcon = expenseCategories.value.find(cat => cat.name === transaction.category);

    const balanceStore = useBalanceStore();

    const parsedAmount = parseFloat(transaction.amount);
    const absoluteAmount = Math.abs(parsedAmount);

    if (transaction.type === 'Expense') {
      const newExpenseTransaction = {
        id: Date.now(),
        ...transaction,
        created: new Date(),
        icon: expenseCategoryIcon ? expenseCategoryIcon.icon : expenseCategoryIcon.value[0].icon,
        colour: categoryIcon ? categoryIcon.colour : categories.value[0].colour,
      };

      transactions.value.unshift(newExpenseTransaction);

      balanceStore.totalBalance -= absoluteAmount;
      balanceStore.totalExpenses += absoluteAmount;
      
    } else if (transaction.type === 'Income') {
      const newIncomeTransaction = {
        id: Date.now(),
        ...transaction,
        created: new Date(),
        icon: incomeCategoryIcon ? incomeCategoryIcon.icon : expenseCategoryIcon.value[0].icon,
      };

      transactions.value.unshift(newIncomeTransaction);

      balanceStore.totalBalance += absoluteAmount;
    }
  };

  return { 
    transactions,
    incomeCategories,
    expenseCategories,
    getTransactionsByDate,
    getBackgroundClass,
    getTextClass,
    getIconComponent,
    addTransaction,
  };
}, {
  persist: true
});