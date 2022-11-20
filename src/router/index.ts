import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/gamedetail/:id',
      name: 'gamedetail',
      component: () => import('../views/GameDetail.vue')
    },
    {
      path: '/player/:id',
      name: 'player',
      component: () => import('../views/Player.vue')
    },
    {
      path: '/editgame/:id',
      name: 'editgame',
      component: () => import('../views/GameEdit.vue')
    }
  ]
})

export default router
