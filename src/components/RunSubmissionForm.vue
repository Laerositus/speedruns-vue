<template>
    <div class="run-submit-body">
        <h1 class="header">Submit new run for {{ game.name }}</h1>

        <div class="form">
            <el-form>
                <el-form-item label="Game name">
                    <el-input v-model="runGameName" disabled placeholder="game.name"/>
                </el-form-item>

                <el-form-item label="Platform">
                    <el-select v-model="runnedPlatform">
                        <el-option v-for="platform in game.platforms" :key="platform.name" :label="platform.name" :value="platform._id"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="Category">
                    <el-select v-model="runnedCategory">
                        <el-option v-for="cat in game.categories" :key="cat.name" :label="cat.name" :value="cat._id"/>
                    </el-select>

                </el-form-item>

                <el-form-item label="Time"> 
                    <el-input-number v-model="runnedTime.hours" class="time-input" :min="0" /> <span class="time-label">:</span>
                    <el-input-number v-model="runnedTime.minutes" class="time-input" :min="0"  /> <span class="time-label">:</span>
                    <el-input-number v-model="runnedTime.seconds" class="time-input" :min="0" />
                </el-form-item>

                <el-form-item label="Link to video">
                    <el-input v-model="runnedVideoLink"/>
                </el-form-item>

            </el-form>
        </div>

        <div class="buttons">
            <el-button type="primary" @click="submitRun">Submit Run</el-button>
            <el-button type="danger" @click="cancel">Cancel</el-button>
        </div>

    </div>
    
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { Game } from '@/models/game';
import { Player } from '@/models/player';
import type { Category } from '@/models/category';
import type { Platform } from '@/models/platform';
import type { Run } from '@/models/run';

export default defineComponent({
    name: 'RunSubmissionForm',
    props: [ 'game' ],
    data() {
        return {
            runGameName: this.game.name,
            runnedGame: this.game,
            runnedPlatform: '',
            runnedCategory: '',
            runnedTime: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            runnedPlayer: new Player("Laerositus"),
            runnedPlacement: 1,
            runnedVideoLink: '',
        }
    },
    computed: {
        
    },
    methods: {
        getCat(id: string): Category {
            console.log("Get Cat")
            return this.game.categories.find((cat: {_id: string}) => cat._id == id);
        },
        getPlat(id: string): Platform {
            return this.game.platforms.find((platform: {_id: string}) =>platform._id == id);
        },
        async submitRun() {
            const newRun = {
                game: this.game,
                category: this.getCat(this.runnedCategory),
                time: this.runnedTime,
                platform: this.getPlat(this.runnedPlatform),
                player: this.runnedPlayer,
                placement: this.runnedPlacement,
                videoLink: this.runnedVideoLink
            }
            console.log(newRun);
        },
        log(msg: any) {
            console.log(msg);
        },
        cancel(){}
    },
});
</script>

<style scoped>
.time-input {
    width: 80px;
    margin: 0px 10px;
}

.time-label {
    font-size: 20px;
    font-weight: bold;
}
</style>