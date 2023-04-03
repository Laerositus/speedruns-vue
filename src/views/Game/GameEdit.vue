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
            <el-checkbox-group v-for="platform in game.platforms" :key="platform" v-model="game.platforms">
                <el-checkbox :label="platform.name" />
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="ReleaseDate">
            <el-date-picker v-model="game.releaseDate"/>                
        </el-form-item>
        <el-form-item label="TotalRuns">
            <el-input-number v-model="gameTotalRuns" disabled style="{background-color: white;}"/>
        </el-form-item>
        <el-form-item label="Categories">
            <el-checkbox-group v-for="category in game.categories" :key="category._id" v-model="game.categories">
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
        }
    },
    computed: {
        game() {
            return this.$store.state.game.find((game: { _id: string }) => game._id == this.id)
        }
    },
    methods: {
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
            let game = {
                "name": this.game.name,
                "platforms": this.game.platforms,
                "releaseDate": this.game.releaseDate,
                "totalRuns": this.game.totalRuns,
                "playerCount": this.game.playerCount,
                "categories": this.game.categories,
                "gameRule": this.game.gameRule,
                "image": this.game.image
            }

            const res = await this.$axios.put('/game/'+ this.id, game)

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
    created() {
        this.id = String(this.$route.params.id);
    }
})

</script>


<style>

</style>