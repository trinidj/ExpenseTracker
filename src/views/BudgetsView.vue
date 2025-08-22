<script setup>
  import { ref, onMounted, watch } from 'vue';

  import { ScrollPanel, ProgressBar, Button, Dialog, Select, InputText, InputGroup, InputGroupAddon, Listbox } from 'primevue';
  import { Form } from '@primevue/forms';

  import { PiggyBank, Wallet, Plus, Tags, DollarSign } from 'lucide-vue-next';

  const currentSpent = 200;
  const totalBudget = 800;

  const budgetUsedPercentage = () => {
    return (currentSpent / totalBudget) * 100;
  };

  const setCategory = ref('');
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

  const setAmount = ref('');

  // Add the missing listItems ref and selectedItem ref
  const listItems = ref([]);
  const selectedItem = ref(null);

  // localStorage key
  const STORAGE_KEY = 'budget-items';

  // Load data from localStorage
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        listItems.value = JSON.parse(saved);
        console.log('Loaded items from localStorage:', listItems.value);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  // Save data to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(listItems.value));
      console.log('Saved items to localStorage:', listItems.value);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Load data when component mounts
  onMounted(() => {
    loadFromStorage();
  });

  // Watch for changes to listItems and save automatically
  watch(listItems, () => {
    saveToStorage();
  }, { deep: true });

  const addItem = () => {
    // Fix the validation - setAmount is a string, setCategory is an object
    if (setCategory.value && setCategory.value.name && setAmount.value.trim() !== '') {
      const newItem = {
        name: setCategory.value.name, // Use the category name
        description: `$${setAmount.value}`, // Format as currency
        code: (listItems.value.length + 1).toString(),
        id: Date.now() // Add unique ID for better tracking
      }
      listItems.value.push(newItem)
      
      setCategory.value = ''
      setAmount.value = ''
      
      visible.value = false;
      
      console.log('Added item:', newItem)
    }
  };

  const clearAllItems = () => {
    listItems.value = [];
    localStorage.removeItem(STORAGE_KEY);
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
              v-model="setCategory"
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
              v-model="setAmount"
              v-keyfilter.money
              fluid
              placeholder="Budget"
              size="small"
            />
          </InputGroup>

          <div class="flex col-span-full items-center justify-end gap-4">
            <Button type="button" severity="secondary" label="Cancel" @click="visible = false"/>
            <Button type="submit" label="Add" @click="addItem" />
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
              <span class="text-xs text-gray-500">({{ listItems.length }} items)</span>
            </div>

            <div class="flex gap-2">
              <Button 
                v-if="listItems.length > 0"
                type="button" 
                label="Clear All" 
                severity="secondary"
                size="small"
                @click="clearAllItems"
              />
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

          <div class="flex justify-center p-5">
            <Listbox 
              v-if="listItems.length > 0"
              v-model="selectedItem"
              :options="listItems"
              optionLabel="name"
              placeholder="Select a budget item"
              class="w-full"
            >
              <template #option="slotProps">
                <div class="flex justify-between items-center w-full">
                  <span class="font-medium">{{ slotProps.option.name }}</span>
                  <span class="text-emerald-600 font-semibold">{{ slotProps.option.description }}</span>
                </div>
              </template>
            </Listbox>
            <div v-else class="text-center text-gray-500 py-8">
              <p>No budget items yet.</p>
              <p class="text-sm">Click "Add" to create your first budget!</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>