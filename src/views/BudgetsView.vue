<script setup>
  import { ref, computed } from 'vue';

  import { ScrollPanel, ProgressBar, Button, Dialog, Select, InputText, InputGroup, InputGroupAddon } from 'primevue';
  import { Form } from '@primevue/forms';

  import { PiggyBank, Wallet, Plus, Tags, DollarSign, ChartBar } from 'lucide-vue-next';

  import { useBudgetStore } from '@/stores/useBudgetStore';

  const budgetStore = useBudgetStore();

  const budgetData = ref({
    amount: '',
    category: '',
  });

  const budgetUsedPercentage = computed(() => {
    return (budgetStore.currentSpent / budgetStore.totalBudget) * 100 || 0;
  });

  const categories = ref([
    { name: 'Food' },
    { name: 'Entertainment' },
    { name: 'Travel' },
    { name: 'Housing' }
  ]);

  const position = ref('center');
  const visible = ref(false);

  const openPosition = (pos) => {
    position.value = pos;
    visible.value = true;
  };

  const listItems = ref([]);

  const handleSubmit = () => {
    const budget = {
      amount: budgetData.value.amount,
      category: budgetData.value.category.name,
    };

    budgetStore.addBudgetItem(budget);

    const addToBudget = parseFloat(budgetData.value.amount);
    if (!isNaN(addToBudget)) {
      budgetStore.totalBudget += addToBudget;
    }

    budgetData.value.name = '';
    budgetData.value.category = '';

    visible.value = false;
  };
</script>

<template>
  <div class="bg-[#FFE3C6] h-62 rounded-bl-3xl rounded-br-3xl">
    <header class="flex flex-row justify-start items-center px-6 py-8">
      <h1 class="text-zinc-800 text-2xl font-semibold">Budgets</h1>
    </header>

    <Dialog
      modal
      header="New Budget"
      v-model:visible="visible"  
      :position="position"
      :draggable="false"
    >
      <Form>
        <div class="grid grid-cols-2 gap-6">
          <InputGroup>
            <InputGroupAddon>
              <Tags 
                :size="16"
              />
            </InputGroupAddon>
            
            <Select 
              fluid
              v-model="budgetData.category"
              placeholder="Select a Category"
              :options="categories"
              option-label="name"
              size="small"
              class="flex! items-center!"
            />
          </InputGroup>

          <InputGroup>
            <InputGroupAddon>
              <DollarSign
                :size="16"
              />
            </InputGroupAddon>

            <InputText 
              v-model="budgetData.amount"
              v-keyfilter.money
              fluid
              placeholder="Budget"
              size="small"
            />
          </InputGroup>

          <div class="flex col-span-full items-center justify-end gap-4">
            <Button type="button" severity="secondary" label="Cancel" @click="visible = false"/>
            <Button type="submit" label="Add" @click="handleSubmit" />
          </div>
        </div>
      </Form>
    </Dialog>

    <ScrollPanel style="height: 1000px;">
      <div class="flex flex-col gap-5">
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
              :value="budgetUsedPercentage"
              :show-value="false" 
            />
            <div class="flex items-center justify-between">
              <p v-if="listItems.length > 0" class="text-black/50 text-sm"><span class="font-medium text-lg text-zinc-800">${{ budgetStore.currentSpent }}</span> spent so far</p>
              
              <p v-else class="text-black/50 text-sm">No Budget Set</p>

              <p class="text-black/50 text-sm">{{ budgetUsedPercentage.toFixed(0) || 0 }}%</p>
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

          <div class="flex justify-center p-5 pt-0">
            <ul 
              v-if="budgetStore.budgets.length > 0"
            >
              <li 
                v-for="budget in budgetStore.budgets"
              >
                  <div class="flex justify-between items-center w-full">
                  <h3 class="font-medium">{{ budget.category }}</h3>
                  <p class="text-emerald-600 font-semibold">${{ budget.amount }}</p>
                </div>
              </li>
            </ul>
            <div v-else class="text-center text-gray-500 py-8">
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
            <li>
              <div class="flex flex-col gap-2 p-5 pt-0">
                <h3 class="flex font-medium">Entertainment</h3>
                <ProgressBar 
                  :show-value="false" 
                />
                <div class="flex items-center justify-between">
                  <p v-if="listItems.length > 0" class="text-black/50 text-sm"><span class="font-medium text-lg text-zinc-800">{{  }}</span> spent so far</p>
                  
                  <p v-else class="text-black/50 text-sm">No Budget Set</p>

                  <p class="text-black/50 text-sm">{{ '0%' }}</p>
                </div>
              </div>
            </li>

            <li>
              <div class="flex flex-col gap-2 p-5 pt-0">
                <h3 class="flex font-medium">Food</h3>
                <ProgressBar 
                  :show-value="false" 
                />
                <div class="flex items-center justify-between">
                  <p v-if="listItems.length > 0" class="text-black/50 text-sm"><span class="font-medium text-lg text-zinc-800">{{  }}</span> spent so far</p>
                  
                  <p v-else class="text-black/50 text-sm">No Budget Set</p>

                  <p class="text-black/50 text-sm">{{ '0%' }}</p>
                </div>
              </div>
            </li>

            <li>
              <div class="flex flex-col gap-2 p-5 pt-0">
                <h3 class="flex font-medium">Housing</h3>
                <ProgressBar 
                  :show-value="false" 
                />
                <div class="flex items-center justify-between">
                  <p v-if="listItems.length > 0" class="text-black/50 text-sm"><span class="font-medium text-lg text-zinc-800">{{  }}</span> spent so far</p>
                  
                  <p v-else class="text-black/50 text-sm">No Budget Set</p>

                  <p class="text-black/50 text-sm">{{ '0%' }}</p>
                </div>
              </div>
            </li>

            <li>
              <div class="flex flex-col gap-2 p-5 pt-0">
                <h3 class="flex font-medium">Travel</h3>
                <ProgressBar 
                  :show-value="false" 
                />
                <div class="flex items-center justify-between">
                  <p v-if="listItems.length > 0" class="text-black/50 text-sm"><span class="font-medium text-lg text-zinc-800">{{  }}</span> spent so far</p>
                  
                  <p v-else class="text-black/50 text-sm">No Budget Set</p>

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