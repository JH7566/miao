import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import MyVotes from '../components/MyVotes.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    {
      path: '/my',
      name: 'my',
      component: MyVotes
    }
  ]
})

export default router
