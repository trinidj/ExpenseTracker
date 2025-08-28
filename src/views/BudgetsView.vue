<script setup>
  import { ref } from 'vue';

  import Header from '@/components/layout/Header.vue';

  import { ScrollPanel, ProgressBar, Button, Dialog, Select, InputText, Message } from 'primevue';
  import { Form } from '@primevue/forms';

  import { PiggyBank, Wallet, Plus, ChartBar } from 'lucide-vue-next';

  import { useBudgetStore } from '@/stores/useBudgetStore';

  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { useToast } from 'primevue';
  import z from 'zod';

  const budgetStore = useBudgetStore();

  const budgetData = ref({
    amount: '',
    category: '',
  });

  const categories = ref([
    { name: 'Food' },
    { name: 'Entertainment' },
    { name: 'Travel' },
    { name: 'Housing' }
  ]);

  const visible = ref(false);

  const toast = useToast();
  const initialValues = ref({
    category: null,
    budget: '',
  });

  const resolver = ref(zodResolver(
    z.object({
      category: z.nullable(
        z.object({
          name: z.string(),
        })
      ).refine(val => val !== null, {
        message: "Please select a category."
      }),

      budget: z.string().min(1, { message: 'Budget is required.' })
    })
  ));

  const onFormSubmit = ({ valid }) => {
    if (valid) {
      toast.add({ 
        severity: 'success', 
        summary: 'Form is submitted.', 
        life: 2000 
      });
    }
  };

  const handleSubmit = () => {
    if (!budgetData.value.category || !budgetData.value.amount) {
      return;
    }

    const budget = {
      amount: budgetData.value.amount,
      category: budgetData.value.category.name,
    };

    budgetStore.addBudgetItem(budget);

    const addToBudget = parseFloat(budgetData.value.amount);
    if (!isNaN(addToBudget)) {
      budgetStore.totalBudget += addToBudget;
    }

    budgetData.value.amount = '';
    budgetData.value.category = '';

    visible.value = false;
  };
</script>

<template>
  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <Header page-title="Budgets" />

    <Dialog
      modal
      header="New Budget"
      v-model:visible="visible"  
      position="bottom"
      :draggable="false"
    >
      <Form v-slot="$form" :resolver="resolver" :initial-values="initialValues" @submit="onFormSubmit">
        <div class="grid grid-cols-2 gap-6">
          <div class="flex flex-col gap-1">
            <Select
              name="category" 
              fluid
              v-model="budgetData.category"
              placeholder="Select a Category"
              :options="categories"
              option-label="name"
              size="small"
              class="flex! items-center!"
            />

            <Message 
              v-if="$form.category?.invalid" 
              severity="error" 
              variant="simple"
              size="small"
            >
              {{ $form.category.error?.message }}
            </Message>
          </div>

          <div class="flex flex-col gap-1">
            <InputText 
              name="budget"
              v-model="budgetData.amount"
              v-keyfilter.money
              fluid
              placeholder="Budget"
              size="small"
            />
            <Message
              v-if="$form.budget?.invalid"
              severity="error"
              variant="simple"
              size="small"
            >
              {{ $form.budget.error?.message }}
            </Message>
          </div>

          <div class="flex col-span-full items-center justify-end gap-4">
            <Button type="button" severity="secondary" label="Cancel" @click="visible = false"/>
            <Button type="submit" label="Add" @click="handleSubmit" />
          </div>
        </div>
      </Form>
    </Dialog>

    <ScrollPanel>
      <div class="flex flex-col gap-5">
        <!-- Budget Progress -->
        <div class="bg-white rounded-xl mx-6 gap-5 border border-emerald-300/50">
          <header class="flex flex-row items-center gap-2 p-5">
            <PiggyBank 
              :size="16"
            />
            <h2 class="font-medium text-zinc-800">Budget Progress</h2>
          </header>

          <div class="flex flex-col gap-2 p-5 pt-0">
            <h3 class="flex font-medium text-2xl">${{ budgetStore.totalBudget }}</h3>
            <ProgressBar 
              :value="budgetStore.budgetSpentPercentage"
              :show-value="false" 
            />
            <div class="flex items-center justify-between">
              <p 
                v-if="budgetStore.budgets.length > 0" 
                class="text-black/50 text-sm"
              >
                <span class="font-medium text-lg text-zinc-800">${{ budgetStore.totalSpent }}</span> spent so far
              </p>
              
              <p v-else class="text-black/50 text-sm">No Budget Set</p>

              <p class="text-black/50 text-sm">{{ budgetStore.budgetSpentPercentage }}%</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl mx-6 gap-5 border border-emerald-300/50">
          <header class="flex flex-row items-center justify-between p-5">
            <div class="flex flex-row items-center gap-2">
              <Wallet 
                :size="16"
              />
              <h2 class="font-medium text-zinc-800">Category Budgets</h2>
              <p class="text-xs text-gray-500">({{ budgetStore.budgets.length }} items)</p>
            </div>

            <div class="flex gap-2">
              <Button 
                type="button" 
                label="Add" 
                class="p-2! bg-emerald-400! rounded-md! border-0! hover:bg-emerald-500! cursor-pointer"
                @click="openPosition('bottom')"
              >
                <Plus 
                  :size="16"
                  class="text-white"
                />
              </Button>
            </div>
          </header>

          <div class="flex p-5 pt-0 justify-center">
            <ul 
              v-if="budgetStore.budgets.length > 0"
              class="w-full"
            >
              <li 
                v-for="budget in budgetStore.budgets"
              >
                <div class="flex justify-between items-center w-full p-2 hover:bg-emerald-300/30 rounded-md transition-all ease duration-200">
                  <h3 class="font-medium">{{ budget.category }}</h3>
                  <p class="text-emerald-600 font-semibold">${{ budget.amount }}</p>
                </div>
              </li>
            </ul>
            <div 
              v-else 
              class="text-center text-gray-500 py-8"
            >
              <p>No budget items yet.</p>
              <p class="text-sm">Click "Add" to create your first budget!</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl mx-6 gap-5 border border-emerald-300/50">
          <header class="flex flex-row items-center gap-2 p-5">
            <ChartBar 
              :size="16"
            />
            <h2 class="font-medium text-zinc-800">Tracker</h2>
          </header>

          <ul>
            <li
              v-for="budget in budgetStore.budgets"
              :key="budget.category"
            >
              <div class="flex flex-col gap-2 p-5 pt-0">
                <header class="flex flex-row justify-between items-center">
                  <h3 class="flex font-medium">{{ budget.category }}</h3>
                  <p class="text-zinc-800 font-medium text-xl">${{ budget.amount }}</p>
                </header>
                <ProgressBar 
                  :show-value="false" 
                />
                <div class="flex items-center justify-between">
                  <p v-if="budgetStore.budgets.length > 0" class="text-black/50 text-sm"><span class="font-medium text-lg text-zinc-800">{{  }}</span> spent so far</p>
                  
                  <p v-else-if="budgetStore.budgets.length > 0" class="text-black/50 text-sm">No Budget Set</p>

                  <p class="text-black/50 text-sm">{{ '0%' }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>