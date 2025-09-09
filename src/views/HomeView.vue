<script setup>
  import { ref, reactive } from 'vue';

  import { DollarSign, TrendingDown, TrendingUp, CreditCard, Wallet, ArrowLeftRight } from 'lucide-vue-next';

  import { Button, Dialog, InputText, Message, Toast, ProgressBar } from 'primevue';
  import { Form } from '@primevue/forms';

  import { RouterLink } from 'vue-router';

  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import z from 'zod';

  import { useBalanceStore } from '@/stores/useBalanceStore';
  import { useTransactionsStore } from '@/stores/useTransactionsStore';
  import { useBudgetStore } from '@/stores/useBudgetStore';

  import AddTransactionButton from '@/components/ui/AddTransactionButton.vue';

  import Header from '@/components/layout/Header.vue';

  const balanceStore = useBalanceStore();
  const transactionStore = useTransactionsStore();
  const budgetStore = useBudgetStore();

  const visible = ref(false);

  const formatTime = (transaction) => {
    const date = new Date(transaction.created);
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric', 
      hour: 'numeric',
      minute: '2-digit', 
      hour12: true
    });
  };

  const initialValues = reactive({
    balance: '',
    income: '',
  });

  const resolver = ref(zodResolver(
    z.object({
      balance: z.string().min(1, { message: 'Balance is required.'}),
      income: z.string().min(1, { message: 'Income is required.' }),
    })
  ));

  const balanceData = ref({
    balance: '',
    income: '',
  });

  const handleSubmit = () => {
    balanceStore.setBalance(balanceData.value.balance);
    balanceStore.setIncome(balanceData.value.income);

    balanceData.value.balance = '';
    balanceData.value.income = '';

    visible.value = false;
  };
</script>

<template>
  <Toast    
    class="w-fit!"
  />

  <Dialog
    modal
    header="Edit Balance Card"
    v-model:visible="visible"
    position="center"
    :draggable="false"
  >
      <Form v-slot="$form" :resolver="resolver" :initial-values="initialValues">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <InputText
              name="balance" 
              v-model="balanceData.balance"
              fluid
              v-keyfilter.money
              placeholder="Total Balance"
              size="small"
            />

            <Message
              v-if="$form.balance?.invalid"
              severity="error"
              variant="simple"
              size="small"
            >
              {{ $form.balance.error?.message }}
            </Message>
          </div>

          <div class="flex flex-col gap-1">
            <InputText 
              name="income"
              v-model="balanceData.income"
              fluid
              v-keyfilter.money
              placeholder="Income"
              size="small"
            />

            <Message
              v-if="$form.income?.invalid"
              severity="error"
              variant="simple"
              size="small"
            >
              {{ $form.income.error?.message }}
            </Message>
          </div>

          <div class="flex items-center justify-end gap-4">
            <Button type="button" severity="secondary" label="Cancel" @click="visible = false" />
            <Button type="submit" label="Save" @click="handleSubmit"/>
          </div>
        </div>
      </Form>
  </Dialog>
   
  <Header page-title="Home" />

  <section class="flex flex-col p-5 pt-0 gap-6 bg-white dark:bg-[#121212]">
    <AddTransactionButton />
    <div class="flex flex-col gap-6 h-fit">
      <div class="grid grid-cols-2 grid-rows-2 gap-2.5 lg:flex">
        <!-- Balance Card -->
        <section class="flex bg-gradient-to-tr p-5 rounded-xl gap-5 h-fit justify-between items-start from-[#FFFFFF] to-[#BEBEBE]/10 shadow-lg dark:shadow-none dark:from-[#3A3A3A] dark:to-[#BEBEBE]/10">
          <header class="flex flex-col gap-6 dark:text-white">
            <h2 class="font-semibold text-xs text-zinc-400">Total Balance</h2>
            <p class="font-medium text-2xl">${{ balanceStore.totalBalance }}</p>
          </header>
          
          <div class="flex items-center justify-centerp-2 rounded-lg p-2 bg-emerald-300 dark:bg-emerald-300/40">
            <DollarSign 
              class="text-white"
              :size=16
            />
          </div>
        </section>

        <!-- Income Card -->
        <section class="flex bg-gradient-to-tr h-fit items-start justify-between p-5 rounded-xl gap-5 from-[#FFFFFF] to-[#BEBEBE]/10 shadow-lg dark:shadow-none dark:from-[#3A3A3A] dark:to-[#BEBEBE]/10">
          <header class="flex flex-col gap-6 dark:text-white">
            <h2 class="font-semibold text-xs text-zinc-400">Income</h2>
            <p class="font-medium text-2xl">${{ balanceStore.totalIncome }}</p>
          </header>

          <div class="flex items-center justify-center p-2 rounded-lg bg-emerald-300 dark:bg-emerald-300/40">
            <TrendingUp 
              class="text-white"
              :size="16"
            />
          </div>
        </section>

        <!-- Expense Card -->
        <section class="flex bg-gradient-to-tr items-start justify-between p-5 rounded-xl gap-5 row-start-2 from-[#FFFFFF] to-[#BEBEBE]/10 shadow-lg dark:shadow-none dark:from-[#3A3A3A] dark:to-[#BEBEBE]/10">
          <header class="flex flex-col gap-6 dark:text-white">
            <h2 class="font-semibold text-xs text-zinc-400">Expenses</h2>
            <p class="font-medium text-2xl">${{ balanceStore.totalExpenses }}</p>
          </header>

          <div class="flex items-center justify-center p-2 rounded-lg bg-emerald-300 dark:bg-emerald-300/40">
            <TrendingDown 
              class="text-white"
              :size="16"
            />
          </div>
        </section>

        <!-- Active Budget Card -->
        <section class="flex bg-gradient-to-tr items-start justify-between p-5 rounded-xl gap-5 row-start-2 from-[#FFFFFF] to-[#BEBEBE]/10 shadow-lg dark:shadow-none dark:from-[#3A3A3A] dark:to-[#BEBEBE]/10">
          <header class="flex flex-col gap-6 dark:text-white">
            <h2 class="font-semibold text-xs text-zinc-400">Active Budget</h2>
            <p class="font-medium text-2xl">${{ budgetStore.totalBudget }}</p>
          </header>

          <div class="flex items-center justify-center p-2 rounded-lg bg-emerald-300 dark:bg-emerald-300/40">
            <CreditCard 
              class="text-white"
              :size="16"
            />
          </div>
        </section> 
      </div>      
      
      <!-- Budget Overview -->
      <section class="bg-gradient-to-tr from-[#FFFFFF] to-[#BEBEBE]/10 shadow-lg rounded-xl dark:shadow-none dark:from-[#3A3A3A] dark:to-[#BEBEBE]/10">
        <header class="p-5 text-zinc-800 dark:text-white">
          <h2 class="text-lg">Budget Overview</h2>
        </header>

        <div v-if="budgetStore.budgets.length > 0">
          <ul class="flex flex-col gap-5 p-5 pt-0">
            <li
              v-for="budget in budgetStore.budgets"
              :key="budget.category"
            >
              <div class="flex flex-col gap-2">
                <header class="flex justify-between text-zinc-800 dark:text-white">
                  <h3 class="font-medium">{{ budget.category }}</h3>
                  <p>${{ budget.amount }}</p>
                </header>

                <ProgressBar
                  :value="budget.amount > 0 ? ((budgetStore.getCategorySpending(budget.category) / budget.amount) * 100) : 0"
                  :show-value="false"
                />

                <div class="flex items-center justify-between">
                  <p class="text-zinc-400 text-sm">{{ budget.amount > 0 ? ((budgetStore.getCategorySpending(budget.category) / budget.amount) * 100).toFixed(0) : 0 }}% used</p>
                  
                  <p class="text-zinc-400 text-sm">
                    <span class="font-medium text-lg text-white">${{ budgetStore.getCategorySpending(budget.category) }}</span> spent
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center gap-6 min-h-64 text-zinc-400"
        >
          <div class="flex items-center justify-center p-2 rounded-lg dark:bg-gray-300/40">
            <Wallet :size="36" class="text-gray-500 dark:text-white"/>
          </div>

          <div class="flex flex-col items-center gap-1">
            <p>No budgets yet.</p>
            <p class="text-sm">Create your first budget to start tracking!</p>
          </div>
        </div>
      </section>

      <!-- Recent Transactions -->
      <section class="flex flex-col bg-gradient-to-tr from-[#FFFFFF] to-[#BEBEBE]/10 rounded-xl dark:shadow-none dark:from-[#3A3A3A] dark:to-[#BEBEBE]/10">
        <header class="flex flex-row items-center justify-between p-5 text-zinc-800 dark:text-white">
          <h2 class="text-lg ">Recent Transactions</h2>
          <RouterLink to="/transactions">
            <p class="text-zinc-400 font-balance text-sm hover:underline">View All</p>
          </RouterLink>                                                               
        </header>

        <div v-if="transactionStore.transactions.length > 0">
          <ul class="flex flex-col gap-5 h-fit p-5 pt-0">
            <li
              v-for="transaction in transactionStore.transactions"
              :key="transaction.id"
            >
              <div class="flex flex-row items-center justify-between">
                <div class="flex items-center gap-4">
                  <div :class="[`flex items-center justify-center p-2 rounded-lg`, transactionStore.getBackgroundClass(transaction.colour)]"> 
                    <component 
                      :is="transactionStore.getIconComponent(transaction.icon, transaction.type)" 
                      :size="20" 
                      :class="transactionStore.getTextClass(transaction.colour)"
                    />
                  </div>

                  <div class="flex flex-col">
                    <h3 class="text-sm font-medium text-white">{{ transaction.name }}</h3>
                    <p class="text-zinc-400 text-xs">
                      {{ formatTime(transaction) }}
                    </p>
                  </div>
                </div>
                <p :class="['text-base font-medium', {
                  'text-red-400': transaction.type === 'Expense',
                  'text-emerald-400': transaction.type ==='Income',
                }]">
                  {{ transaction.type === 'Expense' ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center gap-6 min-h-64 text-zinc-400"
        >
          <div class="flex items-center justify-center p-2 rounded-lg dark:bg-gray-300/40">
            <ArrowLeftRight :size="36" class="text-gray-500 dark:text-white" />
          </div>

          <div class="flex flex-col items-center gap-1">
            <p>No transactions yet.</p>
            <p class="text-sm">Create your first transaction!</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>