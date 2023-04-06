<template>
    <div class="body">
        <h1> Edit {{ game.name }}</h1>
    </div>
    
    <el-form >
        <el-form-item label="Game Name" >
            <el-input v-model="game.name"/>
        </el-form-item>

        <el-form-item label="Platforms">
            <div class="form-platforms">
                <el-checkbox-group v-for="platform in $store.state.platforms" :key="platform._id" v-model="gamePlatforms" class="platforms-group">
                    <el-checkbox :label="platform.name" :checked="gameContainsPlatform(platform)" class="platforms-item"/>
                </el-checkbox-group>
            </div>
        </el-form-item>
        <!-- <el-form-item label="Categories">
            <el-checkbox-group v-for="category in game.categories" :key="category._id" v-model="game.categories">
                <el-checkbox :label="category.name"/>
            </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="Image URL:">
            <el-input v-model="game.image" />
        </el-form-item>
        
        <el-form-item label="ReleaseDate">
            <el-date-picker v-model="game.releaseDate"/>                
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
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '@/models/game'
import type { Platform } from '@/models/platform';

export default defineComponent({
    name: 'GameDetail',
    data() {
        return {
            id: '',
            gamePlatforms: [],
        }
    },
    computed: {
        game(): Game {
            const game = this.$store.state.games.find((game: { _id: string }) => game._id == this.id);
            return game;
        },
    },
    methods: {
        gameContainsPlatform(platform: Platform): boolean {
            if (this.game.platforms.includes(platform._id)) return true;
            else return false;
        },
        async editGame() {
            const platformIDs = this.$store.getters.filteredPlatformIDs(this.gamePlatforms);

            let game = {
                "_id": this.game._id,
                "name": this.game.name,
                "platforms": platformIDs,
                "releaseDate": this.game.releaseDate,
                "categories": this.game.categories,
                "gameRule": this.game.gameRule,
                "image": this.game.image
            }

            const res = await this.$axios.put('/game/'+ this.id, game)
            // console.log(res.data);

            const updatedGame = new Game(game._id, game.name, game.platforms, game.releaseDate, this.game.totalRuns,  this.game.playerCount, this.game.categories, game.gameRule, game.image);
            this.$store.commit('updateGame', updatedGame);

            this.$router.back();
        },
        async deleteGame() {
            console.log("Delete game called");
            const res = await this.$axios.delete('/game/'+this.id)
            console.log(res);
            this.$store.commit('removeGame', this.id);

            this.$router.push('/');
        },
        log(item: any) {
            console.log(item);
        }
    },
    created() {
        this.id = String(this.$route.params.id);
    }
})

</script>


<style>

.form-platforms {
    display: grid;
    grid-template-rows: repeat(5, auto);
    grid-auto-flow: column;
    gap: 0.5em;
}

.platforms-item {
    margin-left: 10px;
}

</style>