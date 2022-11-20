<template>
    <div class="body">
        <h1> Add Game page</h1>
        <!-- {{game.name}} -->
    </div>

    <!-- <GameInfoBar :game="game" />  -->
    
    <el-form >
        <el-form-item label="Game Name" >
            <el-input v-model="gameName"/>
        </el-form-item>

        <el-form-item label="Platforms">
            <el-checkbox-group v-for="platform in PLATFORMS" :key="platform" v-model="gamePlatforms">
                <el-checkbox :label="platform.name" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="ReleaseDate">
            <el-date-picker v-model="gameReleaseDate" :placeholder="gameReleaseDate"/>                
        </el-form-item>
        <!-- <el-form-item label="TotalRuns">
            <el-input-number v-model="gameTotalRuns" disabled="true" style="{background-color: white;}"/>
        </el-form-item> -->
        <!-- <el-form-item label="Categories">
            <el-checkbox-group v-for="category in gameCategories" :key="category" v-model="gamePlatforms">
                <el-checkbox :label="category.name"/>
            </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="Image URL:">
            <el-input v-model="gameImage" />
        </el-form-item>

    </el-form>


    <!-- <el-button v-if="editMode" v-on:click="editGame">Save changes</el-button> -->
    <el-button type="primary" @click="addGame">Save game</el-button>
    <el-button type="danger" @click="cancel">Cancel</el-button>
</template>

<script setup lang="ts">
import { 
    ElButton, 
    ElForm, 
    ElInput, 
    ElFormItem, 
    ElCheckboxGroup, 
    ElCheckbox, 
    ElDatePicker, 
    ElInputNumber 
} from 'element-plus'

import { PLATFORMS } from '../mock-data'
import { Platform } from '../models/platform'

</script>

<script lang="ts">
import type { Game } from '../models/game'
import { GAMES } from '../mock-data'
import { defineComponent } from 'vue'
import GameInfoBar from '../components/GameInfoBar.vue'
import GameLeaderboard from '../components/GameLeaderboard.vue'
import GameStats from '@/components/GameStats.vue'

import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineComponent({
    name: 'GameDetail',
    data() {
        return {
            id: -1,
            game: null,
            // editedData: this.game,
            gameName: '',
            gamePlatforms: [],
            gameReleaseDate: '',
            gameTotalRuns: 0,
            gameCategories: [],
            gameRule: '',
            gameImage: '',
        }
    },
    methods: {
        async addGame() {
            console.log("Save Changes called");
            let game = {
                "name": this.gameName,
                "platforms": this.gamePlatforms,
                "releaseDate": this.gameReleaseDate,
                "image": this.gameImage
            }
            console.log(game);

            const res = await this.$axios.post('/game', game)
            console.log("Move to home view");
            this.$router.push('/');
        },
        cancel() {
            this.$router.push('/');
        }
    },
    async mounted() {
        // console.log(this.game)
        // this.id = this.$route.params.id;
        // await this.fetchGame(this.id);

    }
})

</script>

<style>

</style>