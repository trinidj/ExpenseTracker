<script setup>
  import { ref } from 'vue';

  import { Plus, Home, ArrowLeftRight, ChartArea, Banknote, } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router';

  import { Button, Dialog } from 'primevue';
  import { Form } from '@primevue/forms';

  const position = ref('center');
  const visible = ref(false);

  const openPosition = (pos) => {
      position.value = pos;
      visible.value = true;
  }
</script>

<template>
  <Dialog v-model:visible="visible" modal :position="position" header="Add Transaction">
    <Form>
      <div class="flex gap-2">
        <Button label="Cancel" @click="visible = false"/>
        <Button label="Add" @click="visible = false" />
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

      <button>
        <Banknote
          :size="25"
          class="text-[#888888]"
        />
      </button>
    </div>
  </nav>
</template>