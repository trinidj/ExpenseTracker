<script setup>
  import { ref } from 'vue';
  import { Menu, Home, ArrowLeftRight, ChartArea, Banknote  } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';
  
  import { Drawer } from 'primevue';

  const props = defineProps({
    pageTitle: {
      type: String,
      required: true
    }
  });

  const visible = ref(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Analytics', path: '/analytics', icon: ChartArea },
    { name: 'Budgets', path: '/budgets', icon: Banknote }
  ]
</script>

<template>
  <header class="flex flex-row justify-between items-center px-6 py-8">
    <Drawer 
      v-model:visible="visible" 
      header="Expense Tracker"
      class="border-2! border-r-emerald-300!"
    >
      <div class="h-full">
        <nav class="flex flex-col h-full overflow-hidden gap-2">
          <RouterLink 
            v-for="navLink in navLinks"
            :key="navLink.name"
            :to="navLink.path"
            v-slot="{ isActive }"
            class="flex items-center gap-4 px-3 py-2 rounded-md transition-all ease duration-200 hover:bg-gray-200"
          >
            <component :is="navLink.icon" :size="20" :class="isActive ? 'text-emerald-300' : ''" />
            <p :class="['font-medium text-base', isActive ? 'text-emerald-300' : '']" >{{ navLink.name }}</p>
          </RouterLink>
        </nav>
      </div>
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