<script setup>
  import { ref } from 'vue';

  import { Plus } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';

  import { Button, Dialog, InputText, Select, SelectButton, Message } from 'primevue';
  import { Form } from '@primevue/forms';

  import { useTransactionsStore } from '@/stores/useTransactionsStore';

  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { useToast } from 'primevue';
  import z from 'zod';

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
    };

    transactionStore.addTransaction(transaction);

    formData.value.name = '';
    formData.value.amount = '';
    formData.value.category = '';

    visible.value = false;
  }

  const visible = ref(false);

  const selectButtonOptions = ref(['Income', 'Expense']);
  const categories = ref([
    { name: 'Food' },
    { name: 'Entertainment' },
    { name: 'Travel' },
    { name: 'Housing' }
  ]);

  const toast = useToast();
  const initialValues = ref({
    name: '',
    amount: '',
    category: null
  });

  const resolver = ref(zodResolver(
    z.object({
      name: z.string().min(1, { message: 'Name is required.' }),
      amount: z.string().min(1, { message: 'Amount is required.' }),

      category: z.nullable(
        z.object({
          name: z.string(),
        })
      ).refine(val => val !== null, {
        message: 'Please select a category.'
      }),
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
</script>

<template>
  <Dialog 
    modal
    header="Add Transaction"
    v-model:visible="visible"  
    position="bottom" 
    :draggable="false"
  >
    <Form v-slot="$form" :resolver="resolver" :initial-values="initialValues" @submit="onFormSubmit">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center col-span-full">
          <SelectButton 
            fluid
            v-model="formData.type"
            :options="selectButtonOptions"
          />
        </div>

        <div class="flex flex-col gap-1">
          <InputText 
            name="name"
            v-model="formData.name"
            fluid
            placeholder="Name"
            size="small"
          />

          <Message
            v-if="$form.name?.invalid"
            severity="error"
            variant="simple"
            size="small"
          >
            {{ $form.name.error?.message }}
          </Message>
        </div>      
        
        <div class="flex flex-col gap-1">
          <InputText 
            name="amount"
            v-model="formData.amount"
            v-keyfilter.money 
            fluid
            placeholder="Price" 
            size="small" 
          />

          <Message
            v-if="$form.amount?.invalid"
            severity="error"
            variant="simple"
            size="small"
          >
            {{ $form.amount.error?.message }}
          </Message>
        </div>
        
        <div class="flex flex-col gap-1 col-span-full">
          <Select 
            name="category"
            placeholder="Select a Catgeory" 
            fluid
            v-model="formData.category"
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


        <div class="flex col-span-full items-center justify-end gap-4">
          <Button type="button" severity="secondary" label="Cancel" @click="visible = false"/>
          <Button type="submit" label="Add" @click="handleSubmit" />
        </div>
      </div>
    </Form>
  </Dialog>

  <Button 
    unstyled
    class="absolute cursor-pointer right-0 transform -translate-x-1/2 -translate-y-8 bg-teal-400 hover:bg-teal-500 border border-teal-400 p-4 rounded-full shadow-lg bottom-0"
    @click="visible = true"
  >
    <Plus :size="24" class="text-white" />
  </Button>
</template>