<template>
    <div class="body">
        <h1> GameDetail page</h1>
        <!-- {{game.name}} -->
    </div>

    <GameInfoBar :game="game" /> 
    <GameLeaderboard :game="game" />
    <GameStats :game="game" />
    <el-button v-if="!editMode" @click="goToEditPage"> Edit game </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'

</script>


<script lang="ts">
import type { Game } from '../../models/game'
import { GAMES } from '../../mock-data'
import { defineComponent } from 'vue'
import GameInfoBar from '../../components/GameInfoBar.vue'
import GameLeaderboard from '../../components/GameLeaderboard.vue'
import GameStats from '@/components/GameStats.vue'

import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineComponent({
    name: 'GameDetail',
    data() {
        return {
            id: '',
            game: GAMES[0],
            editMode: false,
        }
    },
    methods: {
        async fetchGame(id: any){
            const res = await this.$axios.get('/game/'+id)
            // console.log(res.data.data)
            this.game = res.data.data
        },
        async deleteGame() {
            console.log("Delete game called");
            // this.toggleEdit();
            const res = await this.$axios.delete('/game/'+1)
            console.log(res);

            // this.$router.push('/');
        },
        toggleEdit() {
            this.editMode = !this.editMode;
            console.log("EditMode set to: "+this.editMode);
        },
        goToEditPage() {
            console.log("Moving to edit view");
            this.$router.push('/editGame/'+this.id);
        }
    },
    async mounted() {
        if( this.$route.params.id){
            this.id = String(this.$route.params.id);
            // console.log(this.game)
            await this.fetchGame(this.id);
        }
    }
})

</script>


<style>

</style>