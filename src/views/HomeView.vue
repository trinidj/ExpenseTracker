<script setup>
  import { ref, reactive } from 'vue';

  import { DollarSign, TrendingDown, CircleEllipsis, TrendingUp } from 'lucide-vue-next';

  import { Button, Dialog, InputText, Message, Toast, ScrollPanel } from 'primevue';
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

  <section class="flex flex-col p-6 pt-0">
    <div class="flex flex-col gap-6">
      <AddTransactionButton />

      <!-- Balance Card -->
      <section class="flex p-5 rounded-xl gap-5 justify-between items-center border border-emerald-300">
        <div class="flex flex-col gap-6 text-zinc-800">
          <h2 class="font-semibold text-zinc-400">Total Balance</h2>
          <p class="font-medium text-2xl">${{ balanceStore.totalBalance }}</p>
        </div>
        
        <div class="flex items-center justify-center bg-emerald-300 p-2 rounded-lg">
          <DollarSign 
            class="text-white"
          />
        </div>
      </section>

      <!-- Income Card -->
      <section class="flex items-center justify-between p-5 rounded-xl gap-5 border border-emerald-300">
        <div class="flex flex-col gap-6 text-zinc-800">
          <h2 class="font-semibold text-zinc-400">Income</h2>
          <p class="font-medium text-2xl">${{ balanceStore.totalIncome }}</p>
        </div>

        <div class="flex items-center justify-center bg-emerald-300 p-2 rounded-lg">
          <TrendingUp 
            class="text-white"
          />
        </div>
      </section>

      <!-- Expense Card -->
      <section class="flex items-center justify-between p-5 rounded-xl gap-5 border border-emerald-300">
        <div class="flex flex-col gap-6 text-zinc-800">
          <h2 class="font-semibold text-zinc-400">Expenses</h2>
          <p class="font-medium text-2xl text-zinc-800">${{ balanceStore.totalExpenses }}</p>
        </div>

        <div class="flex items-center justify-center bg-emerald-300 p-2 rounded-lg">
          <TrendingDown 
            class="text-white"
          />
        </div>
      </section>

      <!-- Active Budget Card -->
      <section class="flex items-center justify-between p-5 rounded-xl gap-5 border border-emerald-300">
        <div class="flex flex-col gap-6 text-zinc-800">
          <h2 class="font-semibold text-zinc-400">Active Budget</h2>
          <p class="font-medium text-2xl text-zinc-800">${{ budgetStore.totalBudget }}</p>
        </div>

        <div class="flex items-center justify-center bg-emerald-300 p-2 rounded-lg">
          <TrendingDown 
            class="text-white"
          />
        </div>
      </section>

      <!-- Recent Transactions -->
      <section class="flex flex-col gap-5 bg-white border border-emerald-300/50 p-5 rounded-xl">
        <header class="flex flex-row items-center justify-between">
          <h2 class="text-lg text-zinc-900">Recent Transactions</h2>
          <RouterLink to="/transactions">
            <p class="text-[#000000]/50 font-balance text-sm hover:underline">View All</p>
          </RouterLink>                                                               
        </header>

        <ScrollPanel class="h-fit">
          <div v-if="transactionStore.transactions.length > 0">
            <ul class="flex flex-col gap-4 h-fit">
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
                      <h3 class="text-sm font-medium">{{ transaction.name }}</h3>
                      <p class="text-black/45 text-xs">
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
            class="flex flex-col items-center justify-center min-h-64 text-black/50"
          >
            <p>No transactions yet.</p>
            <p class="text-sm">Create your first transaction!</p>
          </div>
        </ScrollPanel>
      </section>              
    </div>
  </section>
</template>