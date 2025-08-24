import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { KeyFilter } from 'primevue';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.directive('keyfilter', KeyFilter);
app.use(router);
app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
    }
  }
});
app.mount('#app');
