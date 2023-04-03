import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import axios from './plugins/axios'
import store from './store'

import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const localUrl = 'http://localhost:3000'
const remoteUrl = 'https://speedrun-collection.onrender.com'
const apiPath = '/api'

const app = createApp(App)

app.use(router)
// for( const [key,component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.use(axios, {
    baseUrl: localUrl + apiPath,
})
app.use(store)

app.mount('#app')