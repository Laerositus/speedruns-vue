<template>
    <div class="body">
        <h1> Edit {{ game.name }}</h1>
    </div>
    
    <el-form 
        ref="ruleFormRef"
        :model="game"
        :rules="rules"
    >
        <el-form-item label="Game Name" prop="name">
            <el-input v-model="game.name"/>
        </el-form-item>

        <el-form-item label="Platforms" prop="platforms">
            <div class="form-platforms">
                <el-checkbox-group v-for="platform in $store.state.platforms" :key="platform._id" v-model="gamePlatforms" class="platforms-group">
                    <el-checkbox :label="platform.name" :checked="gameContainsPlatform(platform)" class="platforms-item"/>
                </el-checkbox-group>
            </div>
        </el-form-item>

        <el-form-item label="Image URL:" prop="image">
            <el-input v-model="game.image" />
        </el-form-item>
        
        <el-form-item label="ReleaseDate" prop="releaseDate">
            <el-date-picker v-model="game.releaseDate"/>
        </el-form-item>
    </el-form>

    <!-- <el-button v-if="editMode" v-on:click="editGame">Save changes</el-button> -->
    <el-button type="danger" @click="editGame(ruleFormRef)">Save game</el-button>
    <el-button type="danger" @click="deleteGame">Delete game</el-button>
</template>

<script lang="ts" setup >
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>();
</script>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Game } from '@/models/game'
import type { Platform } from '@/models/platform';
import utils from '@/utils';

export default defineComponent({
    name: 'GameDetail',
    data() {
        return {
            id: '',
            gamePlatforms: [],
            rules: reactive<FormRules>({
                name: [
                    { required: true, message: 'Please enter a game name', trigger: 'blur'},
                    { min: 1, message: 'Length should be at least 1', trigger: 'blur'},
                ],
                platforms: [
                    { 
                        type: 'array',
                        required: true,
                        message: 'Please check at least one game platform',
                        trigger: 'change'
                    }
                ],
                releaseDate: [
                    { type: 'date', required: true, message: 'Please enter a game release date', trigger: 'blur'}
                ]
            })
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
        async editGame(formEl: FormInstance | undefined) {
            if(await utils.validateFields(formEl) == false) return;

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