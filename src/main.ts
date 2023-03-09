import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import axios from './plugins/axios'
import { createStore } from 'vuex'

import { GAMES, PLATFORMS, CATEGORIES } from './mock-data'
import './assets/main.css'

const localUrl = 'http://localhost:3000'
const remoteUrl = 'https://speedrun-collection.onrender.com'
const apiPath = '/api'

const store = createStore( {
    state() {
        return {
            games: GAMES,
            platforms: PLATFORMS,
        }
    },
    mutations: {
        setGames(state, games) {
            state.games = games;
        },
        setPlatforms(state, platforms) {
            state.platforms = platforms;
        },
        updateGame(state, updatedGame){
            state.games.forEach((game) => {
                if (game._id == updatedGame._id) {
                    game = updatedGame;
                }
            })
        },
    },
    getters: {
        games (state) {
            return state.games
        },
        platforms (state) {
            return state.platforms
        }
    },
    actions: {
        // updateGame (context, game) {
        //     context.commit("updateGame", game);
        // }
    }
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.provide("$store", store)
app.use(store)
app.use(axios, {
    baseUrl: remoteUrl + apiPath,
})

app.mount('#app')
