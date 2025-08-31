<script setup>
  import { ref } from 'vue';

  import { Plus } from 'lucide-vue-next';

  import { Button, Drawer, InputText, Select, SelectButton, Message, Popover } from 'primevue';
  import { Form } from '@primevue/forms';

  import { useTransactionsStore } from '@/stores/useTransactionsStore';
  import { useBalanceStore } from '@/stores/useBalanceStore';

  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { useToast } from 'primevue';
  import z from 'zod';

  const transactionStore = useTransactionsStore();
  const balanceStore = useBalanceStore();

  let visible = ref(false);
  const op = ref();

  const handleAddTransactionClick = (event) => {
    if (balanceStore.totalBalance <= 0) {
      op.value.toggle(event);
    } else {
      visible.value = true;
    }
  };

  let currentTransactionType = ref('Expense');

  const expenseFormData = ref({
    type: 'Expense',
    name: '',
    amount: '',
    category: null,
    date: null,
    icon: null,
    colour: '',
  });

  const incomeFormData = ref({
    type: 'Income',
    name: '',
    amount: '',
    category: null,
  });

  const selectButtonOptions = ref(['Income', 'Expense']);

  const incomeCategories = transactionStore.incomeCategories;
  const expenseCategories = transactionStore.expenseCategories;

  const toast = useToast();
  const initalValues = ref({
    name: '',
    amount: '',
    category: null,
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

  const handleSubmit = () => {
    if (currentTransactionType.value === 'Income') {
      const incomeAmount = Math.abs(parseFloat(incomeFormData.value.amount));

      const incomeTransaction = {
        type: incomeFormData.value.type,
        name: incomeFormData.value.name,
        amount: incomeAmount,
        category: incomeFormData.value.category.name,
      };

      transactionStore.addTransaction(incomeTransaction);

      incomeFormData.value.name = '';
      incomeFormData.value.amount = '';
      incomeFormData.value.category = '';

    } else if (currentTransactionType.value === 'Expense') {
      const expenseAmount = -Math.abs(parseFloat(expenseFormData.value.amount));

      const expenseTransaction = {
        type: expenseFormData.value.type,
        name: expenseFormData.value.name,
        amount: expenseAmount,
        category: expenseFormData.value.category.name,
      };

      transactionStore.addTransaction(expenseTransaction);

      expenseFormData.value.name = '';
      expenseFormData.value.amount = '';
      expenseFormData.value.category = null;
    }

    visible.value = false;
  };
</script>

<template>
  <Drawer 
    header="Add Transaction"
    v-model:visible="visible"  
    position="bottom"
    class="h-fit! rounded-tl-lg rounded-tr-lg" 
  >
    <Form
      v-slot="$form" 
      :resolver="resolver"
      :initial-values="initalValues" 
      @submit="onFormSubmit"
    >
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center col-span-full">
            <SelectButton 
              fluid
              v-model="currentTransactionType"
              :options="selectButtonOptions"
            />
          </div>

          <div
            v-if="currentTransactionType === 'Expense'" 
            class="grid grid-cols-2 gap-4 col-span-full"
          >
            <div class="flex flex-col gap-1">
              <InputText 
                name="name"
                v-model="expenseFormData.name"
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
                v-model="expenseFormData.amount"
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
                placeholder="Select a Category" 
                fluid
                v-model="expenseFormData.category"
                :options="expenseCategories"
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
          </div>

          <div
            v-else
            class="grid grid-cols-2 gap-4 col-span-full"
          >
            <div class="flex flex-col gap-1">
              <InputText 
                name="name"
                v-model="incomeFormData.name"
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
                fluid
                v-model="incomeFormData.amount"
                v-keyfilter.money
                placeholder="0.00"
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
                placeholder="Select a Category"
                fluid
                v-model="incomeFormData.category"
                :options="incomeCategories"
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
          </div>
        </div>

        <div class="flex col-span-full items-center justify-end gap-4">
          <Button type="button" severity="secondary" label="Cancel" @click="visible = false"/>
          <Button type="submit" label="Add" @click="handleSubmit" />
        </div>
      </div>
    </Form>
  </Drawer>

  <Button 
    unstyled
    type="button"
    class="absolute cursor-pointer right-0 transform -translate-6 bg-teal-400 hover:bg-teal-500 border border-teal-400 p-4 rounded-full shadow-lg bottom-0"
    @click="handleAddTransactionClick"
  >
    <Plus :size="24" class="text-white" />
  </Button>

  <Popover ref="op">
    <p>Please update your balance before proceeding.</p>
  </Popover>
</template>