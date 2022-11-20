<template>
    <div class="game-list">
        <el-button @click="addGame">Add Game</el-button>

        <el-scrollbar max-height="100%">

            <div v-for="game in games" :key="game._id">
                <RouterLink :to="{name: 'gamedetail', params: {id: game._id}}">
                    <el-card>
                        <el-image :src=game.image class="game-cover"/>

                        <div>
                            <span>{{game.name}}</span>
                            <p> {{game.platforms}}</p>
                        </div>
                    </el-card>
                </RouterLink>
            </div>
            
        </el-scrollbar>
    </div>
    
</template>
  
<script lang="ts">
import { GAMES } from '../mock-data'


import { defineComponent } from 'vue'
import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}


export default defineComponent({
    name: 'Home',
    data() {
        return {
            games: GAMES,
        }
    },
    methods: {
        async fetchGames(){
            const res = await this.$axios.get('/game')
            // console.log(res.data.data)
            this.games = res.data.data
        },
        addGame() {
            this.$router.push('/addgame');
        }
    },

    async mounted() {
        // console.log(this.games)
        await this.fetchGames()

    }
})
</script>

<style>
  .game-list {
      display: grid;
      columns: 4;
      flex-wrap: wrap;
  }

  .game-cover {
    height: 150px;
  }
</style>