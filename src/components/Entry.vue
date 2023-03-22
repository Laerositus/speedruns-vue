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
                console.log(res.data.data);
                const resUser = res.data.data;
                let u = new Player(resUser.id, resUser.username, 0, new Date());
    
                this.$emit('loggedIn', u);
                this.$emit('toggleLoginStatus');
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
                console.log(res);

                this.$emit('loggedIn', new Player("id" , this.username, 0 , new Date()));
                this.$emit('toggleLoginStatus');

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
