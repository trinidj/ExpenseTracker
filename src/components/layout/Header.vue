<script setup>
  import { ref } from 'vue';
  import { Menu, Home, ArrowLeftRight, ChartArea, Banknote, CircleDollarSign, MessageCircle, ExternalLink, Bell } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';
  
  import { Drawer, Button, Popover, OverlayBadge } from 'primevue';

  const props = defineProps({
    pageTitle: {
      type: String,
      required: true
    }
  });

  const visible = ref(false);
  const op = ref();

  const toggle = (event) => {
    op.value.toggle(event);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Analytics', path: '/analytics', icon: ChartArea },
    { name: 'Budgets', path: '/budgets', icon: Banknote }
  ];
</script>

<template>
  <header class="flex flex-row justify-between items-center px-6 py-8">
    <Drawer 
      v-model:visible="visible" 
      class="border-2! border-r-emerald-300! w-72!"
    >
      <template #header>
        <div class="flex flex-row items-center gap-2">
          <CircleDollarSign 
            :size="25"
          />
          <h1 class="text-lg font-medium">Expense Tracker</h1>
        </div>
      </template>

      <nav class="flex flex-col h-full overflow-hidden gap-4">
        <!-- Site Nav Links -->
        <RouterLink 
          v-for="navLink in navLinks"
          :key="navLink.name"
          :to="navLink.path"
          v-slot="{ isActive }"
          class="flex items-center gap-4 p-2 rounded-md transition-all ease duration-200 hover:bg-gray-200 hover:text-zinc-900"
        >
          <component 
            :is="navLink.icon" 
            :size="20" 
            :class="isActive ? 'text-emerald-300' : ''" />
          <p :class="['font-medium text-base', isActive ? 'text-emerald-300' : '']" >{{ navLink.name }}</p>
        </RouterLink>
      </nav>

      <template #footer>
        <div class="flex flex-col">
          <ul>
            <li class="flex flex-row p-2 rounded-md items-center gap-4 transition-all ease duration-200 hover:bg-gray-200 hover:text-zinc-900">
              <a href="https://github.com/trinidj/ExpenseTracker/issues" target="_blank">
                <div class="flex items-center gap-2">
                  <MessageCircle 
                    :size="20"
                  />
                  <p class="flex items-center font-medium text-base">Feedback <sup><ExternalLink :size="12" /></sup></p>
                </div>
              </a>
            </li>
          </ul>
        </div>                   
      </template>
    </Drawer>

    <div class="flex gap-4 items-center ">
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
    </div>
    <Button
      @click="toggle"
    >
      <OverlayBadge severity="danger">
        <Bell :size="20" />
      </OverlayBadge>
    </Button>

    <Popover ref="op">
      <div class="flex flex-col gap-4">
        Notifications
      </div>
    </Popover>
  </header>
</template>