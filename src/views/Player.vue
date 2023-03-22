<script setup lang="ts">
import { defineComponent } from 'vue';

</script>


<template>
    <h1> Player: {{  user.username }}</h1>

    <el-button @click="logOut">Log Out</el-button>
    <el-button type="danger">Delete account</el-button>
</template>


<script lang="ts">
export default defineComponent({
    data() {
        return {
            id: '',
            user: { _id: '', username: 'Tempname', totalRuns: 0, creationDate: new Date()},
        }
    },
    methods: {
        logOut() {
            this.$emit("toggleLoginStatus");
            this.$router.push("/");
        },
        async fetchPlayer(id: any){
            const res = await this.$axios.get('/player/' + id);
            this.user = res.data.data;
        }
    },
    async mounted() {
        if( this.$route.params.id){
            this.id = String(this.$route.params.id);
            // console.log(this.game)
            await this.fetchPlayer(this.id);
        }
    }
})


</script>


<style>

</style>