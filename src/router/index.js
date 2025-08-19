import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import TransactionsView from "@/views/TransactionsView.vue";

const routes = [
  { path: '/', component: HomeView },
  { path: '/transactions', component: TransactionsView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;