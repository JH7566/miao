import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import HomePage from "./views/HomePage.vue";
import Address from "./views/Address.vue";
import Find from "./views/Find.vue";
import My from "./views/My.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/HomePage",
      component: HomePage,
      children: [
        { path: "/HomePage", component: HomePage },
        { path: "/Address", component: Address },
        { path: "/Find", component: Find },
        { path: "/My", component: My },
      ],
    },
  ],
});
