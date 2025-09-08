import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThemeStore = defineStore('theme', () => {
  // states
  const isDarkMode = ref(false);

  // getters
  const currentTheme = computed(() => isDarkMode.value ? 'dark' : 'light');

  // actions
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    applyTheme();
  };

  const setDarkMode = (value) => {
    isDarkMode.value = value;
    applyTheme();
  };

  const initializeTheme = () => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('theme')) {
      isDarkMode.value = systemPrefersDark;
    }
    applyTheme();
  };

  const applyTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return {
    isDarkMode,
    currentTheme,
    toggleDarkMode,
    setDarkMode,
    initializeTheme,
  }
}, {
  persist: true
});