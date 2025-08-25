<script setup>
  import { ref } from 'vue';

  import { Plus, Home, ArrowLeftRight, ChartArea, Banknote, DollarSign, Tags, Text } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';

  import { Button, Dialog, InputText, Select, SelectButton, InputGroup, InputGroupAddon } from 'primevue';
  import { Form } from '@primevue/forms';

  import { useTransactionsStore } from '@/stores/useTransactionsStore';

  const transactionStore = useTransactionsStore();

  const formData = ref({
    type: 'Expense',
    name: '',
    amount: '',
    category: null,
    date: null,
  });

  const handleSubmit = () => {
    const amount = parseFloat(formData.value.amount);
    const finalAmount = formData.value.type === 'Expense' ? -Math.abs(amount) : Math.abs(amount);

    const transaction = {
      name: formData.value.name,
      amount: finalAmount,
      category: formData.value.category.name,
      date: formData.value.date,
      type: formData.value.type,
      size: 35
    };

    transactionStore.addTransaction(transaction);

    formData.value.name = '';
    formData.value.amount = '';
    formData.value.category = '';

    visible.value = false;
  }

  const position = ref('center');
  const visible = ref(false);

  const openPosition = (pos) => {
    position.value = pos;
    visible.value = true;
  };

  const selectButtonOptions = ref(['Income', 'Expense']);
  const categories = ref([
    { name: 'Food' },
    { name: 'Entertainment' },
    { name: 'Travel' },
    { name: 'Housing' }
  ]);
</script>

<template>
  <Dialog 
    modal
    header="Add Transaction"
    v-model:visible="visible"  
    :position="position" 
    :draggable="false"
  >
    <Form>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-4 col-span-full">
          <SelectButton 
            fluid
            v-model="formData.type"
            :options="selectButtonOptions"
          />
        </div>

        <InputGroup>
          <InputGroupAddon>
            <Text 
              :size="15"
            />
          </InputGroupAddon>

          <InputText 
            v-model="formData.name"
            fluid
            placeholder="Name"
            size="small"
          />    
        </InputGroup>

        <InputGroup>
          <InputGroupAddon class="flex! items-center! justify-center!">
            <DollarSign 
              :size="15"
            />
          </InputGroupAddon>
          
          <InputText 
            v-model="formData.amount"
            v-keyfilter.money 
            fluid
            placeholder="Price" 
            size="small" 
          />
        </InputGroup>

        <InputGroup class="col-span-full">
          <InputGroupAddon>
            <Tags 
              :size="15"
            />
          </InputGroupAddon>
          <Select 
            placeholder="Select a Catgeory" 
            fluid
            v-model="formData.category"
            :options="categories"
            option-label="name"
            size="small"
            class="flex! items-center!"
          />
        </InputGroup>

        <div class="flex col-span-full items-center justify-end gap-4">
          <Button type="button" severity="secondary" label="Cancel" @click="visible = false"/>
          <Button type="submit" label="Add" @click="handleSubmit" />
        </div>
      </div>
    </Form>
  </Dialog>

  <nav class="fixed bottom-0 h-auto left-0 right-0 bg-white border-t-2 border-t-teal-400 rounded-tr-3xl rounded-tl-3xl px-10 py-4 z-10">
    <div class="flex flex-row items-center justify-between relative">
      <RouterLink to="/" v-slot="{ isActive }">
        <Home 
          :size="20"
          :class="isActive ? 'text-emerald-300' : 'text-[#888888]'"
        />
      </RouterLink>

      <RouterLink to="/transactions" v-slot="{ isActive }">
        <ArrowLeftRight 
          :size="20"
          :class="isActive ? 'text-emerald-300' : 'text-[#888888]'"
        />
      </RouterLink>

      <Button 
        class="absolute! left-1/2! transform! -translate-x-1/2! -translate-y-8! bg-teal-400! hover:bg-teal-500! border! border-teal-400! hover:border-teal-500 p-4! rounded-full! shadow-lg!"
        @click="openPosition('bottom')"
      >
        <Plus :size="24" class="text-white" />
      </Button>
      
      <RouterLink to="/analytics" v-slot="{ isActive }">
        <ChartArea 
          :size="20"
          :class="isActive ? 'text-emerald-300' : 'text-[#888888]'"
        />
      </RouterLink>

      <RouterLink to="/budgets" v-slot="{ isActive }">
        <Banknote
          :size="20"
          :class="isActive ? 'text-emerald-300' : 'text-[#888888]'"
        />
      </RouterLink>
    </div>
  </nav>
</template>