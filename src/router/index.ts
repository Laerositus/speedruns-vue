import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Entry from '@/components/Entry.vue'

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
      component: () => import('../views/Game/GameDetail.vue')
    },
    {
      path: '/entry',
      name: 'entry',
      component: Entry
    },
    {
      path: '/player/:playername',
      name: 'player',
      component: () => import('../views/Player.vue')
    },
    {
      path: '/editgame/:id',
      name: 'editgame',
      component: () => import('../views/Game/GameEdit.vue')
    },
    {
      path: '/addgame',
      name: 'addgame',
      component: () => import('../views/Game/GameAdd.vue')
    },
    {
      path: '/platforms',
      name: 'platforms',
      component: () => import ('../views/Platform/Platforms.vue')
    },
    {
      path: '/platformdetail/:id',
      name: 'platformdetail',
      component: () => import ('../views/Platform/PlatformDetail.vue')
    },
    {
      path: '/addplatform',
      name: 'addplatform',
      component: () => import('../views/Platform/PlatformAdd.vue')
    },
    {
      path: '/editplatform/:id',
      name: 'editplatform',
      component: () => import('../views/Platform/PlatformEdit.vue')
    },
    {
      path: '/games',
      name: 'games',
      component: Home
    },
    {
      path: '/submit/:id',
      name: 'submit',	
      component: () => import('../views/Run/RunSubmit.vue')
    },
  ]
})

export default router
