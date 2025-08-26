import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { KeyFilter } from 'primevue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { ToastService } from 'primevue';

const app = createApp(App);
const pinia = createPinia();

pinia.use(createPersistedState({
  storage: localStorage,
}));

app.directive('keyfilter', KeyFilter);
app.use(router);
app.use(pinia);
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
    }
  }
});
app.mount('#app');
