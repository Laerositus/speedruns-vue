<template>
    <div class="body">
        <h1> Add a new game</h1>
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
            <div class="form-platforms" >
                <el-checkbox-group v-for="platform in $store.state.platforms" :key="platform._id" v-model="game.platforms" class="platforms-group">
                    <el-checkbox :label="platform.name" class="platforms-item"/>
                </el-checkbox-group>
            </div>
        </el-form-item>
        
        <el-form-item label="Image URL" prop="image">
            <el-input v-model="game.image" />
        </el-form-item>

        <el-form-item label="ReleaseDate" prop="releaseDate">
            <el-date-picker type="date" v-model="game.releaseDate" />            
        </el-form-item>
        
    </el-form>    
    
    <el-button type="primary" @click="addGame(ruleFormRef)">Save game</el-button>
    <el-button type="danger" @click="$router.back()">Cancel</el-button>
</template>

<script lang="ts" setup >
import { ref } from 'vue'
const ruleFormRef = ref<FormInstance>();
</script>

<script lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive} from 'vue'
import { Game } from '../../models/game'
import { defineComponent, } from 'vue'
import utils from '@/utils'

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
            game: {
                name: '',
                platforms: [],
                releaseDate: '',
                image: ''
            },
            
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
            }),
        }
    },
    methods: {
        async addGame(formEl: FormInstance | undefined) {
            if(await utils.validateFields(formEl) == false) return;
            try {
                const platformIDs = this.$store.getters.filteredPlatformIDs(this.game.platforms);

            let game = {
                "name": this.game.name,
                "platforms": platformIDs,
                "releaseDate": this.game.releaseDate,
                "image": this.game.image,
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
            }
            catch (e: any) {
                console.log(e.message);
            }
        },
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

</style>