import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Entry from '@/components/Entry.vue'

export const routeNames = {
  HOME : 'home',
  ABOUT: 'about',
  GAMEDETAIL: 'gamedetail',
  ENTRY: 'entry',
  PLAYER: 'player',
  EDITGAME: 'editgame',
  ADDGAME: 'addgame',
  PLATFORMS: 'platforms',
  PLATFORMDETAIL: 'platformdetail',
  ADDPLATFORM: 'addplatform',
  EDITPLATFORM: 'editplatform',
  SUBMIT: 'submit',
  RUNEDIT: 'runedit',
}

export const routes = [
  {
    path: '/',
    name: routeNames.HOME,
    component: Home
  },
  {
    path: '/about',
    name: routeNames.ABOUT,
    component: () => import('../views/About.vue')
  },
  {
    path: '/gamedetail/:id',
    name: routeNames.GAMEDETAIL,
    component: () => import('../views/Game/GameDetail.vue')
  },
  {
    path: '/entry',
    name: routeNames.ENTRY,
    component: Entry
  },
  {
    path: '/player/:playername',
    name: routeNames.PLAYER,
    component: () => import('../views/Player.vue')
  },
  {
    path: '/editgame/:id',
    name: routeNames.EDITGAME,
    component: () => import('../views/Game/GameEdit.vue')
  },
  {
    path: '/addgame',
    name: routeNames.ADDGAME,
    component: () => import('../views/Game/GameAdd.vue')
  },
  {
    path: '/platforms',
    name: routeNames.PLATFORMS,
    component: () => import ('../views/Platform/Platforms.vue')
  },
  {
    path: '/platformdetail/:id',
    name: routeNames.PLATFORMDETAIL,
    component: () => import ('../views/Platform/PlatformDetail.vue')
  },
  {
    path: '/addplatform',
    name: routeNames.ADDPLATFORM,
    component: () => import('../views/Platform/PlatformAdd.vue')
  },
  {
    path: '/editplatform/:id',
    name: routeNames.EDITPLATFORM,
    component: () => import('../views/Platform/PlatformEdit.vue')
  },
  {
    path: '/submit/:id',
    name: routeNames.SUBMIT,	
    component: () => import('../views/Run/RunSubmit.vue')
  },
  {
    path: '/runedit/:id',
    name: routeNames.RUNEDIT,
    component: () => import('../views/Run/RunEdit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router