<template>
    <div class="body">
        <h1> Edit Game page</h1>
        <!-- {{game.name}} -->
    </div>

    <!-- <GameInfoBar :game="game" />  -->
    
    <el-form :model="form">
        <el-form-item label="Game Name" >
            <el-input v-model="form.gameName" :placeholder="game.name"/>
        </el-form-item>

        <el-form-item label="Platforms">
            <el-checkbox-group v-for="platform in PLATFORMS" :key="platform" v-model="form.gamePlatforms">
                <el-checkbox :label="platform.name" name="gamePlatforms"/>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="ReleaseDate">
            <el-date-picker v-model="form.gameReleaseDate" :placeholder="form.gameReleaseDate"/>                
        </el-form-item>
        <el-form-item label="TotalRuns">
            <el-input-number v-model="form.gameTotalRuns" disabled="true"/>
        </el-form-item>
        <el-form-item label="Categories">
            <el-checkbox-group v-for="category in form.gameCategories" :key="category" v-model="form.gamePlatforms">
                <el-checkbox :label="category.name" name="gameCategories"/>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Image URL:">
            <el-input v-model="form.gameImage" />
        </el-form-item>

    </el-form>


    <!-- <el-button v-if="editMode" v-on:click="editGame">Save changes</el-button> -->
    <el-button type="danger" @click="editGame">Save game</el-button>
    <el-button type="danger" @click="deleteGame">Delete game</el-button>
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

</script>

<script lang="ts">
import type { Game } from '../models/game'
import { GAMES } from '../mock-data'
import { defineComponent } from 'vue'
import { reactive } from 'vue'
import GameInfoBar from '../components/GameInfoBar.vue'
import GameLeaderboard from '../components/GameLeaderboard.vue'
import GameStats from '@/components/GameStats.vue'

import type {AxiosInstance} from 'axios'
import { integer } from 'vue-mc/validation';


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
            game: GAMES.find(game => game.id == this.id),
            editedData: this.game,
            form: reactive({
                gameName: '',
                gamePlatforms: [],
                gameReleaseDate: '',
                gameTotalRuns: 0,
                gameCategories: '',
                gameRule: '',
                gameImage: '',
            })
        }
    },
    methods: {
        async fetchGame(id: any){
            const res = await this.$axios.get('/game/'+id)
            // console.log(res.data.data)
            this.game = res.data.data
        },
        async editGame() {
            console.log("Save Changes called");
            console.log(this.form);
            // const res = await this.$axios.put()
            // console.log("Move to gameDetail view");
            // this.$router.push('/gamedetail/'+this.id);
        },
        async deleteGame() {
            console.log("Delete game called");
            const res = await this.$axios.delete('/game/'+1)
            console.log(res);

            this.$router.push('/');
        },
    },
    async mounted() {
        this.id = this.$route.params.id;
        // console.log(this.game)
        await this.fetchGame(this.id)        
    }
})

</script>


<style>

</style>