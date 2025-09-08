import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import { KeyFilter } from 'primevue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
const pinia = createPinia();

pinia.use(createPersistedState({
  storage: localStorage,
}));

app.directive('keyfilter', KeyFilter);
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: '.dark',
    }
  }
});

app.use(router);
app.use(pinia);
app.mount('#app');
