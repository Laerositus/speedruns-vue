<script lang="ts" setup>
const ruleFormRef = ref<FormInstance>();
</script>

<template>
    <div class="entry">
        <el-form ref="ruleFormRef" :model="user" :rules="rules">
            <el-form-item label="Username" prop="username">
                <el-input v-model="user.username"/>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="user.password" type="password" show-password/>
            </el-form-item>

            <div>
                <el-button @click="register(ruleFormRef)">Register</el-button>
                <el-button @click="login(ruleFormRef)">Log In</el-button>
            </div>            
        </el-form>
    </div>
</template>

<script lang="ts">
import type {AxiosInstance} from 'axios'
import type { FormInstance, FormRules } from 'element-plus';
import {defineComponent, reactive, ref} from 'vue'
import { Player } from '@/models/player'
import utils from '@/utils';

declare module '@vue/runtime-core'{
    interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineComponent({
    name: 'Entry',
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            rules: reactive<FormRules>({
                username: [
                    {required: true, message: 'Please enter a username', trigger: 'blur'},
                    {min: 2, message: 'Password must be at least 2 character', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: 'Please enter a password', trigger: 'blur'},
                    {min: 4, message: 'Password must be at least 4 characters', trigger: 'blur'}
                ]
            })
        }        
    },
    props: ["entryActive"],
    methods: {
        async register(formEl: FormInstance | undefined) {
            if(await utils.validateFields(formEl) == false) return;

            //TODO Show error message when register fails
            let userinfo = {
                "username": this.user.username,
                "password": this.user.password
            }
            let res;

            try {
                res = await this.$axios.post('/auth/register', userinfo); 
                //console.log(res);     // res.data.data = playername + password
                let resData = res.data.data;

                const newPlayer = new Player(userinfo.username);
                res = await this.$axios.post('/player', newPlayer);

                this.$store.commit('logIn', newPlayer);
                this.$emit('dismissEntryDialog');
            } catch (err) {
                console.log(res);
            }            
        },
        async login(formEl: FormInstance | undefined) {
            if(await utils.validateFields(formEl) == false) return;

            let userinfo = {
                "username": this.user.username,
                "password": this.user.password
            }

            let res;
            try {
                res = await this.$axios.post('/auth/login', userinfo);
                if(res.status !== 200) {
                    console.log("Login failed: " + res.data.message);
                    return;
                }

                res = await this.$axios.get('/player/'+userinfo.username);

                if(res.status !== 200){
                    // No player found'
                    console.log("No player found");
                    return;
                }

                let playerData = res.data.data;
                let loginPlayer = new Player(playerData.playername, playerData.totalRuns, playerData.creationDate, playerData.discord, playerData.steam, playerData.twitch, playerData.youtube);

                this.$store.commit('logIn', loginPlayer);
                this.$emit('dismissEntryDialog');
                
            } catch(err: any){
                res = err.response;
                console.log(res);
                if (Array.isArray(res.data.data)) {
                    res.data.data.forEach((item: { msg: any; }) => console.log(item.msg));
                } else {
                    console.log(res.data.message);
                }
            }
        }
    }
    
});

</script>
