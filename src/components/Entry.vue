<template>
    <div class="entry">
        <el-form>
            <el-form-item label="Username" >
                <el-input v-model="username"/>
            </el-form-item>
            <el-form-item label="Password" >
                <el-input v-model="password" type="password" show-password/>
            </el-form-item>

            <div>
                <el-button @click="register">Register</el-button>
                <el-button @click="login">Log In</el-button>
            </div>            
        </el-form>
    </div>

</template>

<script lang="ts">
import type {AxiosInstance} from 'axios'
import {defineComponent} from 'vue'
import { Player } from '../models/player'

declare module '@vue/runtime-core'{
    interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineComponent({
    name: 'Entry',
    data() {
        return {
            username: '',
            password: ''
        }        
    },
    props: ["entryActive"],
    methods: {
        async register() {
            //TODO Show error message when register fails
            let userinfo = {
                "username": this.username,
                "password": this.password
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
        async login() {
            //TODO Show Error message if login failed
            let userinfo = {
                "username": this.username,
                "password": this.password
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

                console.log("Response user");
                console.log(res)

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
