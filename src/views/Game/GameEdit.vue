<template>
    <div class="body">
        <h1> Edit Game page</h1>
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
        <el-form-item label="TotalRuns">
            <el-input-number v-model="gameTotalRuns" disabled="true" style="{background-color: white;}"/>
        </el-form-item>
        <el-form-item label="Categories">
            <el-checkbox-group v-for="category in gameCategories" :key="category" v-model="gamePlatforms">
                <el-checkbox :label="category.name"/>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Image URL:">
            <el-input v-model="gameImage" />
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

import { PLATFORMS } from '../../mock-data'

</script>

<script lang="ts">
import type { Game } from '../../models/game'
import { GAMES, CATEGORIES } from '../../mock-data'
import { defineComponent } from 'vue'

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
            id: '',
            game: GAMES[0],
            // editedData: this.game,
            gameName: '',
            gamePlatforms: PLATFORMS,
            gameReleaseDate: new Date(),
            gameTotalRuns: 0,
            gameCategories: CATEGORIES,
            gameRule: '',
            gameImage: '',
        }
    },
    methods: {
        async fetchGame(id: any){
            const res = await this.$axios.get('/game/'+id)
            // console.log(res.data.data)
            this.game = res.data.data;
            this.fillDetails();
        },
        fillDetails() {
            this.gameName = this.game.name;
            this.gamePlatforms = this.game.platforms;
            this.gameReleaseDate = this.game.releaseDate;     
            this.gameTotalRuns = this.game.totalRuns;
            this.gameCategories = this.game.categories;
            this.gameRule = this.game.gameRule;
            this.gameImage = this.game.image;
        },
        async editGame() {
            console.log("Save Changes called");
            let game = {
                "id": this.id,
                "name": this.gameName,
                "platforms": this.gamePlatforms,
                "releaseDate": this.gameReleaseDate,
                "totalRuns": this.gameTotalRuns,
                "playerCount": this.game.playerCount,
                "categories": this.gameCategories,
                "gameRule": this.gameRule,
                "image": this.gameImage
            }
            console.log(game);

            const res = await this.$axios.put('/game/'+ this.id, game)
            console.log("Move to gameDetail view");
            this.$router.push('/gamedetail/'+this.id);
        },
        async deleteGame() {
            console.log("Delete game called");
            const res = await this.$axios.delete('/game/'+this.id)
            console.log(res);
            this.$store.commit('removeGame', this.id);

            this.$router.push('/');
        },
    },
    async mounted() {
        // console.log(this.game)
        this.id = String(this.$route.params.id);
        await this.fetchGame(this.id);
    }
})

</script>


<style>

</style>