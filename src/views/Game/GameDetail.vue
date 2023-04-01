<template>
    <div class="detail-body">
        <div class="left-side">
            <GameInfoBar :game="game"/>
            <GameLeaderboard :game="game" />
        </div>
        <div>
            <div class="detail-buttons">
                <el-button v-if="!editMode" @click="goToEditPage"> Edit game </el-button>
                <el-button @click="goToSubmitRunPage"> Submit Run </el-button>
            </div>
            <GameStats :game="game" />
        </div>
    </div>

</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'

</script>


<script lang="ts">
import { GAMES } from '../../mock-data'
import { defineComponent } from 'vue'
import GameInfoBar from '@/components/GameComponents/GameInfoBar.vue'
import GameLeaderboard from '@/components/GameComponents/GameLeaderboard.vue'
import GameStats from '@/components/GameComponents/GameStats.vue'

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
            editMode: false,
        }
    },
    computed: {
        game: {
            get() {
                return this.$store.state.games.find((game: { _id: string } ) => game._id == this.id)},
            set() {}
        }
    },
    methods: {
        async deleteGame() {
            console.log("Delete game called");
            const res = await this.$axios.delete('/game/'+1)
            console.log(res);
            
        },
        toggleEdit() {
            this.editMode = !this.editMode;
            console.log("EditMode set to: "+this.editMode);
        },
        goToEditPage() {
            // console.log("Moving to edit view");
            this.$router.push('/editGame/'+this.id);
        },
        goToSubmitRunPage() {
            // console.log("Moving to submit run view");
            this.$router.push('/submit/'+this.id);
        },
    },
    created() {
        if( this.$route.params.id){
            this.id = String(this.$route.params.id);
        }
    }
})

</script>


<style>

.detail-body {
    margin-top: 10px;
    display: flex;
}

</style>