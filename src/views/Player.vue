<script setup lang="ts">
import { defineComponent } from 'vue';

</script>


<template>
    <h1 v-if="user"> Player: {{  user.playername }}</h1>

    <el-button @click="logOut">Log Out</el-button>
    <el-button @click="deletePlayer" type="danger">Delete account</el-button>

    <el-dialog v-model="passwordDialog">
        <el-input v-model="password" type="password" show-password></el-input>
    </el-dialog>
</template>


<script lang="ts">
import { PLAYERS } from '../mock-data'

export default defineComponent({
    data() {
        return {
            user: PLAYERS[0],
            passwordDialog: false,
            password: '',
        }
    },
    methods: {
        logOut() {
            this.$store.commit('logOut');
            this.$router.push("/");
        },
        async deletePlayer() {

            let res;
            
            try{
                // Delete from neo4j
                const userinfo = {
                    username: this.user.playername,
                    password: this.password
                }

                res = await this.$axios.delete('/user');

                // Delete from mongo
                res = await this.$axios.delete('/player/' + this.user.playername);


            } catch (err) {
                console.error(err);
                console.log(res);
            }

            // Log out and return to homepage
            this.logOut();
            
        },
        async fetchPlayer(playername: any){
            const res = await this.$axios.get('/player/' + playername);
            this.user = res.data.data;
        }
    },
    async mounted() {
        if( this.$route.params.playername){
            let name = String(this.$route.params.playername);
            // console.log(this.game)
            await this.fetchPlayer(name);
        }
    }
})


</script>


<style>

</style>