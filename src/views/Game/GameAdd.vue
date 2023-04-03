<template>
    <div class="body">
        <h1> Add a new game</h1>
    </div>
    
    <el-form >
        <el-form-item label="Game Name" >
            <el-input v-model="gameName"/>
        </el-form-item>

        <el-form-item label="Platforms">
            <div class="form-platforms" >
                <el-checkbox-group v-for="platform in $store.state.platforms" :key="platform._id" v-model="gamePlatforms" class="platforms-group">
                    <el-checkbox :label="platform.name" class="platforms-item"/>
                </el-checkbox-group>
            </div>
        </el-form-item>
        
        <el-form-item label="Image URL">
            <el-input v-model="gameImage" />
        </el-form-item>

        <el-form-item label="ReleaseDate">
            <el-date-picker type="date" v-model="gameReleaseDate" />            
        </el-form-item>
        
    </el-form>    
    
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

</script>

<script lang="ts">
import { Game } from '../../models/game'
import { defineComponent } from 'vue'

import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineComponent({
    name: 'GameAdd',
    data() {
        return {
            gameName: '',
            gamePlatforms: [],
            gameReleaseDate: '',
            gameImage: '',
        }
    },
    methods: {
        async addGame() {
            const platformIDs = this.$store.getters.filteredPlatformIDs(this.gamePlatforms);

            let game = {
                "name": this.gameName,
                "platforms": platformIDs,
                "releaseDate": this.gameReleaseDate,
                "image": this.gameImage,
                "categories": [
                    {
                        "_id": 0,
                        "name": "Any%",
                        "categoryRule": "Run ends at credits"
                    }
                ],
            }
            
            const res = await this.$axios.post('/game', game)
            
            let gameData = res.data.data;

            let newGame = new Game(
                gameData._id,
                gameData.name,
                gameData.platforms,
                gameData.releaseDate,
                0,0,
                gameData.categories,
                gameData.gameRule,
                gameData.image
            );

            this.$store.commit('addGame', newGame);
            this.$router.push('/');
        },
        cancel() {
            this.$router.push('/');
        },
        log() {
            console.log(this.gamePlatforms);
        }
    },
})

</script>

<style>
.el-picker-panel__body {
    background-color: black;
}

.form-label {
    margin-left: 20px;
}

.form-platforms {
    display: grid;
    grid-template-rows: repeat(5, auto);
    grid-auto-flow: column;
    gap: 0.5em;
}

.platforms-item {
    margin-left: 10px;
}

.el-checkbox__label {
    margin-left: 5px;
}

</style>