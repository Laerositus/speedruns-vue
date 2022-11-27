<template>
    <el-button @click="addGame">Add Game</el-button>
    <div class="game-list">

        <el-scrollbar max-height="100%">

            <div v-for="game in games" :key="game._id" class="game-item">
                <RouterLink :to="{name: 'gamedetail', params: {id: game._id}}">
                    <el-card>
                        <el-image :src=game.image class="game-cover"/>

                        <div>
                            <span>{{game.name}}</span>
                            <div v-for="platform in game.platforms" :key="platform._id">                                
                                <p>{{platform.name}}</p>
                            </div>
                        </div>
                    </el-card>
                </RouterLink>
            </div>
            
        </el-scrollbar>
    </div>
    
</template>
  
<script lang="ts">
import { GAMES, PLATFORMS } from '../mock-data'

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
            platforms: PLATFORMS
        }
    },
    methods: {
        async fetchData(){
            console.log(this.games)
            var res = await this.$axios.get('/game')
            this.games = res.data.data
            // this.$store.commit("setGames", this.games)
            var res2 = await this.$axios.get('/platform')
            this.platforms = res2.data.data
            // this.$store.commit("setPlatforms", this.platforms)
        },
        addGame() {
            this.$router.push('/addgame');
        }
    },
    async mounted() {
        // console.log(this.games)
        await this.fetchData()

    }
})
</script>

<style>
  .game-list {
    
    display: grid;
    grid-template-columns: 250px;
    grid-template-rows: auto;
    grid-auto-flow: dense;
  }

  .game-cover {
    height: 150px;
  }
</style>