<template>
    <div class="game-list">        
        <el-button @click="addGame" id="add-game">Add Game</el-button>
        <el-scrollbar max-height="100%">
            <div class="game-grid">            
                <div v-for="game in games" :key="game._id" class="game-item">
                    <RouterLink :to="{ name: 'gamedetail', params: { id: game._id } }">
                        <el-card class="game-card">
                            <div class="game-image">
                                <el-image :src=game.image class="game-cover" />
                            </div>
                            
                            <div>
                                <span class="game-name">{{ game.name }}</span>
                                <div class="game-platforms">
                                    <div v-for="platform in $store.getters.filteredPlatformNames(game.platforms)" :key="platform">
                                        <div v-if="platform" > {{ platform }}  </div>
                                        
                                    </div>
                                </div>

                            </div>
                        </el-card>
                    </RouterLink>
                </div>            
            </div>
        </el-scrollbar>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'Home',
    data() {
        return {
            random: 0,
        }
    },
    computed: {
        games: {
            get(): any {
                return this.$store.state.games;
            },
            set() {
                console.log("Games has changed");
            }
        },
    },
    methods: {
        addGame() {
            this.$router.push('/addgame');
        },
    },
})
</script>

<style>

.game-list {
    margin: 1%
}

.game-grid {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-row-gap: 5px;
}

.game-item {
    width: 150px;
}

.game-card {
    height: 300px;
}

.game-image {
    width: 98%;
    text-align: center;
    overflow: hidden;
}

.game-cover {
    height:130px;
    position: relative;
    left: 100%;
    margin-left: -200%;
}

.game-name {
    font-size: medium;
    
}

.game-platforms {
    display: flex;
    flex-wrap: wrap;
}

.game-platforms > * {    
    font-size: 12px;
    font-weight: 100;
    margin-right: 3px;
}

</style>