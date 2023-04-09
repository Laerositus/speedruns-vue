<template>
    <div class="run-submit-body">
        <h1 class="header">Submit new run for {{ game.name }}</h1>

        <div class="form">
            <el-form ref="ruleFormRef" :model="run" :rules="rules">
                <el-form-item label="Game name">
                    <el-input v-model="runGameName" disabled placeholder="game.name"/>
                </el-form-item>

                <el-form-item label="Platform" prop="platform">
                    <el-select v-model="run.platform">
                        <el-option v-for="platform in $store.getters.filteredPlatforms(game.platforms)" :key="platform" :label="platform.name" :value="platform._id"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="Category" prop="category">
                    <el-select v-model="run.category">
                        <el-option v-for="cat in game.categories" :key="cat.name" :label="cat.name" :value="cat._id"/>
                    </el-select>

                </el-form-item>

                <el-form-item label="Time" prop="time"> 
                    <el-input-number v-model="run.time.hours" class="time-input" :min="0" /> <span class="time-label">H</span>
                    <el-input-number v-model="run.time.minutes" class="time-input" :min="0" :max="59" /> <span class="time-label">M</span>
                    <el-input-number v-model="run.time.seconds" class="time-input" :min="0" :max="59" /> <span class="time-label">S</span>
                </el-form-item>

                <el-form-item label="Link to video" prop="videoLink">
                    <el-input v-model="run.videoLink"/>
                </el-form-item>

            </el-form>
        </div>

        <div class="buttons">
            <el-button type="primary" @click="submitRun(ruleFormRef)">Submit Run</el-button>
            <el-button type="danger" @click="cancel">Cancel</el-button>
        </div>

    </div>
    
</template>

<script lang="ts" setup>
const ruleFormRef = ref<FormInstance>();
</script>

<script lang="ts">
import axios from 'axios';
import { defineComponent, reactive, ref} from 'vue';
import type { Category } from '@/models/category';
import type { Platform } from '@/models/platform';
import { Run } from '@/models/run';
import type { FormInstance, FormRules } from 'element-plus';
import utils from '@/utils';

const validateTime = (rule: any, value: any, callback: any) => {
    const time = value.hours * 3600 + value.minutes * 60 + value.seconds;
    if (time == 0) {
        callback(new Error('Please enter a time above zero'));
    } else { callback()}
}

export default defineComponent({
    name: 'RunSubmissionForm',
    props: [ 'game' ],
    data() {
        return {
            run: {
                game: '',
                platform: '',
                category: '',
                time:  {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                },
                videoLink: ''
            },
            runGameName: this.game.name,
            rules: reactive<FormRules>({
                platform: [
                    { required: true, message: 'Please select a platform', trigger: 'change'}
                ],
                category: [
                    { required: true, message: 'Please select a category', trigger: 'change'}
                ],
                time: [
                    { required: true, validator: validateTime, trigger: 'blur'}
                ],
                videoLink: [
                    
                ],
            })
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
        async submitRun(formEl: FormInstance | undefined) {
            if(await utils.validateFields(formEl) == false) return;

            let player = this.$store.state.loggedInPlayer.playername;

            const newRun = {
                game: this.game._id,
                category: this.run.category,
                time: this.run.time,
                platform: this.run.platform,
                player: player,
                videoLink: this.run.videoLink
            };

            let res;
            try {
                res = await axios.post('/run', newRun);
                // console.log(res.data);

                let run = new Run(
                    res.data.data._id, 
                    newRun.game, newRun.category, 
                    newRun.time, newRun.platform, 
                    player, 0, 
                    newRun.videoLink );

                // console.log(run);
                this.$store.commit('addRun', run);
                this.$router.back();
            } catch(err) {
                console.log(err);
                console.log(res);
            }
        },
        findPlacement(){
            let currentplacement = -1;

            return currentplacement;
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
    margin-left: 15px;
}

.time-label {
    font-size: 20px;
    font-weight: bold;
    margin-left: 5px;
}
</style>