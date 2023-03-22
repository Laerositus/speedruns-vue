<template>
    <el-button @click="addGame">Add Game</el-button>
    <div class="game-list">
        <div class="game-grid">

            
            <el-scrollbar max-height="100%">
                
                <div v-for="game in games" :key="game._id" class="game-item">
                    <RouterLink :to="{ name: 'gamedetail', params: { id: game._id } }">
                        <el-card>
                            <el-image :src=game.image class="game-cover" />
                            
                            <div>
                                <span>{{ game.name }}</span>
                                <div v-for="platform in game.platforms" :key="platform._id">
                                    <p>{{ platform }}</p>
                                </div>
                            </div>
                        </el-card>
                    </RouterLink>
                </div>
            
            </el-scrollbar>
        </div>
    </div>
</template>
  
<script lang="ts">

export default ({
    name: 'Home',
    data() {
        return {
            random: 0,
        }
    },
    computed: {
        games: {
            get() {
                return this.$store.state.games;
            },
            set() {
                console.log("games has changed");
            }
        }
    },
    methods: {
        addGame() {
            this.$router.push('/addgame');
        }
    }
})
</script>

<style>
.game-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.game-grid {
    display: grid;
    grid-template-columns: 200px, 200px, 200px, 200px;
    grid-auto-flow: column;
}

.game-item {
    width: 200px;
    
}

.game-cover {
    height: 150px;
    max-width: 110px;
}
</style>