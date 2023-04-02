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
                    <el-checkbox :label="platform.name" class="platforms-item" @change="log"/>
                </el-checkbox-group>
            </div>
        </el-form-item>
        
        <el-form-item label="Image URL">
            <el-input v-model="gameImage" />
        </el-form-item>

        <el-form-item label="ReleaseDate">
            <el-date-picker type="date" v-model="gameReleaseDate" :placeholder="gameReleaseDate"/>            
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
import type { Game } from '../../models/game'
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
            console.log("Save Changes called");

            const ps = this.$store.getters.filteredPlatforms(this.gamePlatforms);

            let game = {
                "name": this.gameName,
                "platforms": ps,
                "releaseDate": this.gameReleaseDate,
                "image": this.gameImage
            }

            console.log(game);

            const res = await this.$axios.post('/game', game)
            console.log(res);
            let gameData = res.data.data;

            let newGame: Game = {
                _id: gameData._id,
                name: gameData.name,
                platforms: gameData.platforms,
                releaseDate: gameData.releaseDate,
                runs: [],
                totalRuns: 0,
                playerCount: 0,
                categories: gameData.categories,
                gameRule: '',
                image: gameData.image
            }

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
    async mounted() {
        // console.log(this.game)
        // this.id = this.$route.params.id;
        // await this.fetchGame(this.id);

    }
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
}

/* .platforms-group {
    
}

.platforms-item {

} */

</style>