import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import TransactionsView from "@/views/TransactionsView.vue";
import AnalyticsView from "@/views/AnalyticsView.vue";
import BudgetsView from "@/views/BudgetsView.vue";

const routes = [
  { path: '/', component: HomeView },
  { path: '/transactions', component: TransactionsView },
  { path: '/analytics', component: AnalyticsView },
  { path: '/budgets', component: BudgetsView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;