<template>
    <div class="body">
        <h1 v-if="platform">{{platform.name}}</h1>
        <h2 v-if="platform">Released on: {{ rDate }}</h2>
        <el-button v-if="!editMode" @click="goToEditPage"> Edit platform </el-button>

        <div class="games-list">
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
                            </div>
                        </el-card>
                    </RouterLink>
                </div>            
            </div>
        </el-scrollbar>

        </div>
    </div>

    <!-- <PlatformInfoBar :platform="platform" /> 
    <PlatformStats :platform="platform" /> -->
</template>

<script lang="ts">
import type { Game } from '@/models/game'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PlatformDetail',
    data() {
        return {
            id: '',
            rDate: '',
            editMode: false,
        }
    },
    computed: {
        platform() {
            const platform = this.$store.state.platforms.find((platform: { _id: string }) => platform._id == this.id);
            this.rDate = this.getRDate(platform.releaseDate);
            return platform;
        },
        games() {
            const gamesList = this.$store.getters.gameListByPlatform(this.platform);
            return gamesList;
        }
    },
    methods: {
        async editPlatform() {
            console.log("Save Changes called");                    
        },
        toggleEdit() {
            this.editMode = !this.editMode;
            console.log("EditMode set to: "+this.editMode);
        },
        goToEditPage() {
            console.log("Moving to edit view");
            this.$router.push('/editPlatform/'+this.id);
        },
        getRDate(date: Date){
            let newDate = new Date(date);
            let sdate = newDate.toDateString();
            return sdate;
        }
    },
    created() {
        this.id = String(this.$route.params.id);
    }
})

</script>

<style>

.game-card {
    height: 250px;
}

</style>