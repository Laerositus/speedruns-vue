import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import axios from './plugins/axios'
import { createStore } from 'vuex'

import { GAMES } from './mock-data'
import './assets/main.css'

const localUrl = 'http://localhost:3000'
const remoteUrl = 'https://speedrun-collection.onrender.com'
const apiPath = '/api'
// const gamePath = '/games'
// const authPath = '/auth'

const store = createStore( {
    state() {
        return {
            count: 0,
            game: GAMES[0],
            games: GAMES
        }
    },
    mutations: {
        setGame(state, game) {
            state.game = game;
        }
    }
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(store)
app.use(axios, {
    baseUrl: remoteUrl + apiPath,
})

app.mount('#app')
