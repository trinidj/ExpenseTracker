<script setup>
  import { ref } from 'vue';
  import { Menu } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';
  
  import { Drawer } from 'primevue';

  const props = defineProps({
    pageTitle: {
      type: String,
      required: true
    }
  });

  const visible = ref(false);
</script>

<template>
  <header class="flex flex-row justify-between items-center px-6 py-8">
    <Drawer 
      v-model:visible="visible" 
      header="Expense Tracker"
      class="border-2! border-r-emerald-300!"
    >
      
    </Drawer>
    <Button
      unstyled
      class="cursor-pointer"
      @click="visible = true"
    >
      <Menu 
        :size="20"
      />
    </Button>
    <h1 class="text-zinc-800 text-2xl font-semibold">{{ pageTitle }}</h1>
  </header>
</template>