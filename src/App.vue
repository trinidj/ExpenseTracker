<script setup>
  import { RouterView } from 'vue-router';
  import { onMounted } from 'vue';
  import { useThemeStore } from '@/stores/useThemeStore';

  const themeStore = useThemeStore();

  onMounted(() => {
    themeStore.initializeTheme();
  });
</script>

<template>
  <RouterView />
</template>