<script setup>
  import { ref } from 'vue';

  import { ScrollPanel, ProgressBar, Button, Dialog, Select, InputText, InputGroup, InputGroupAddon } from 'primevue';
  import { Form } from '@primevue/forms';

  import { PiggyBank, Wallet, Plus, Tags, DollarSign } from 'lucide-vue-next';

  const currentSpent = 200;
  const totalBudget = 800;

  const budgetUsedPercentage = () => {
    return (currentSpent / totalBudget) * 100;
  };

  const selectedCategory = ref();
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
              placeholder="Select a Category"
              v-model="selectedCategory"
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
              v-keyfilter.money
              fluid
              placeholder="Budget"
              size="small"
            />
          </InputGroup>

          <div class="flex col-span-full items-center justify-end gap-4">
            <Button type="button" severity="secondary" label="Cancel" @click="visible = false"/>
            <Button type="submit" label="Add" />
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
            <h3 class="flex font-medium text-2xl">${{ totalBudget }}</h3>
            <ProgressBar 
              :value="budgetUsedPercentage()" 
              :show-value="false" 
            />
            <div class="flex items-center justify-between">
              <p class="text-black/50 text-sm"><span class="font-medium text-lg text-zinc-800">${{ currentSpent }}</span> spent so far</p>
              <p class="text-black/50 text-sm">{{ budgetUsedPercentage() }}%</p>
            </div>
          </div>
        </div>

        <!-- Category Budgets -->
        <div class="bg-white rounded-xl mx-6 gap-5 border border-emerald-300/50">
          <header class="flex flex-row items-center justify-between p-5">
            <div class="flex flex-row items-center gap-2">
              <Wallet 
              :size="16"
              />
              <h2 class="font-medium text-zinc-800">Category Budgets</h2>
            </div>

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
          </header>

          
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>