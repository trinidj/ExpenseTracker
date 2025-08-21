<script setup>
  import { ref } from 'vue';

  import { Plus, Home, ArrowLeftRight, ChartArea, Banknote, } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';

  import { Button, Dialog, InputText, Select, Textarea, SelectButton } from 'primevue';
  import { Form } from '@primevue/forms';

  const position = ref('center');
  const visible = ref(false);

  const openPosition = (pos) => {
      position.value = pos;
      visible.value = true;
  };

  const selectValue = ref('Income');
  const selectOptions = ref(['Income', 'Expense']);
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
      <div class="grid grid-cols-2 gap-5">
        <div class="flex items-center gap-4 col-span-full">
          <SelectButton 
            fluid
            v-model="selectValue"
            :options="selectOptions"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="amount">Amount</label>
          <InputText v-keyfilter.money placeholder="0.00" fluid />
        </div>

        <div class="flex flex-col gap-2">
          <label for="category">Category</label>
          <Select placeholder="Select a Catgeory" fluid/>
        </div>

        <div class="flex flex-col gap-2 col-span-full">
          <label for="description">Description</label>
          <Textarea 
            fluid
            rows="5"
            class="resize-none"
          />
        </div>

        <div class="flex col-span-full items-center justify-end gap-4">
          <Button type="button" severity="secondary" label="Cancel" @click="visible = false"/>
          <Button type="submit" label="Add" />
        </div>
      </div>
    </Form>
  </Dialog>

  <nav class="fixed bottom-0 h-auto left-0 right-0 bg-white border-t-2 border-t-teal-400 rounded-tr-3xl rounded-tl-3xl px-10 py-4 z-10">
    <div class="flex flex-row items-center justify-between relative">
      <RouterLink to="/" v-slot="{ isActive }">
        <Home 
          :size="25"
          :class="isActive ? 'text-emerald-500' : 'text-[#888888]'"
        />
      </RouterLink>

      <RouterLink to="/transactions" v-slot="{ isActive }">
        <ArrowLeftRight 
          :size="25"
          :class="isActive ? 'text-emerald-500' : 'text-[#888888]'"
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
          :size="25"
          :class="isActive ? 'text-emerald-500' : 'text-[#888888]'"
        />
      </RouterLink>

      <RouterLink to="/budgets" v-slot="{ isActive }">
        <Banknote
          :size="25"
          :class="isActive ? 'text-emerald-400' : 'text-[#888888]'"
        />
      </RouterLink>
    </div>
  </nav>
</template>