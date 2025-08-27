<script setup>
  import { ref } from 'vue';

  import { DollarSign, ArrowDown, ArrowUp, Ellipsis } from 'lucide-vue-next';

  import { Button, Dialog, InputText, Message } from 'primevue';
  import { Form } from '@primevue/forms';

  import { RouterLink } from 'vue-router';

  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import z from 'zod';

  import { useBalanceStore } from '@/stores/useBalanceStore';
  import { useTransactionsStore } from '@/stores/useTransactionsStore';

  const balanceStore = useBalanceStore();
  const transactionStore = useTransactionsStore();

  const visible = ref(false);

  const formatTime = (transaction) => {
    const date = new Date(transaction.createdAt);
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric', 
      hour: 'numeric',
      minute: '2-digit', 
      hour12: true
    });
  };

  const initialValues = ref({
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
    const balanceAmount = parseFloat(balanceData.value.balance);
    const incomeAmount = parseFloat(balanceData.value.income);

    balanceStore.setBalance(balanceAmount);
    balanceStore.setIncome(incomeAmount);

    balanceData.value.balance = '';
    balanceData.value.income = '';

    visible.value = false;
  }
</script>

<template>
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

  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <!-- Header -->                                           
    <header class="flex flex-row justify-start items-center px-6 py-8">
      <h1 class="text-zinc-800 text-2xl font-semibold">Home</h1>
    </header>
    
    <!-- Balance Card -->
    <section class="static flex flex-col bg-gradient-to-b from-emerald-300 to-[#6EE7DB] rounded-xl mx-6 shadow-black/20 shadow-2xl gap-5 justify-between">
      <div class="flex flex-col p-5 gap-1 text-gray-50">
        <div class="flex flex-row items-center justify-between">
          <div class="flex items-center gap-1">
            <DollarSign 
              :size="16"
            />
            <p class="">Total Balance</p>
          </div>

          <Button 
            unstyled
            class="cursor-pointer"
            @click="visible = true"
          >
            <Ellipsis />
          </Button>
        </div>

          <p class="font-medium text-3xl">${{ balanceStore.totalBalance }}</p>
      </div>

      <div class="flex flex-row items-center justify-between p-5 pt-0">
        <div class="flex flex-col gap-1 text-gray-50">
          <div class="flex flex-row items-center gap-1">
            <ArrowDown 
              :size="16"
            />
            <p>Income</p>
          </div>

          <p class="font-medium text-2xl">${{ balanceStore.totalIncome }}</p>
        </div>

        <div class="flex flex-col gap-1 text-gray-50">
          <div class="flex flex-row items-center gap-1">
            <ArrowUp 
              :size="16"
            />
            <p>Expenses</p>
          </div>

          <p class="font-medium text-2xl">$500.00</p>
        </div>
      </div>
    </section>

    <!-- Recent Transactions -->
    <section>
      <header class="flex flex-row items-center justify-between m-6 mb-5">
        <h2 class="text-lg text-zinc-900">Recent Transactions</h2>
        <RouterLink to="/transactions">
          <p class="text-[#000000]/50 font-balance text-sm hover:underline">View All</p>
        </RouterLink>
      </header>

      <ul
        v-if="transactionStore.transactions.length > 0" 
        class="mx-6 flex flex-col gap-4"
      >
        <li
          v-for="transaction in transactionStore.transactions"
          :key="transaction.id"
        >
          <div class="flex flex-row items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex flex-col">
                <h3 class="text-sm">{{ transaction.name }}</h3>
                <p class="text-black/45 text-xs">
                  {{ formatTime(transaction) }}
                </p>
              </div>
            </div>
            <p :class="['text-base font-medium', {
              'text-red-400': transaction.amount <= 0,
              'text-emerald-400': transaction.amount > 0,
            }]">
              {{ transaction.type === 'Expense' ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
            </p>
          </div>
        </li>
      </ul>

      <div
        v-else
        class="flex flex-col items-center justify-center min-h-64 text-black/50"
      >
        <p>No transactions yet.</p>
        <p class="text-sm">Create your first transaction!</p>
      </div>
    </section>
  </div>
</template>