import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import TransactionsView from "@/views/TransactionsView.vue";
import AnalyticsView from "@/views/AnalyticsView.vue";

const routes = [
  { path: '/', component: HomeView },
  { path: '/transactions', component: TransactionsView },
  { path: '/analytics', component: AnalyticsView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;