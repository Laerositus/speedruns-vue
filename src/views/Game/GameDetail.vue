<template>
    <div class="detail-body">
        <div class="left-side">
            <GameInfoBar :game="game"/>
            <GameLeaderboard :game="game" :runs="runs"/>
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
import { ElMessage } from 'element-plus'
import { defineComponent } from 'vue'
import type { Run } from '@/models/run'

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
            runs: new Array<Run>(),
        }
    },
    computed: {
        game() {
            let g = this.$store.state.games.find((game: { _id: string } ) => game._id == this.id);
            this.runs = this.$store.getters.runListByGame(g);
            g.totalRuns = this.runs.length;
            g.playerCount = 0;
            var playersInRuns = new Array<string>();
            this.runs.forEach(run => {
                if(!playersInRuns.includes(run.player)) {
                    g.playerCount ++;
                }
            })
            return g;
        },
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
            this.$router.push('/editgame/'+this.id);
        },
        goToSubmitRunPage() {
            // console.log("Moving to submit run view");
            if(this.$store.state.loggedIn) {
                this.$router.push('/submit/'+this.id);
            } else {
                ElMessage({
                    showClose: true,
                    duration: 1500,
                    message: "You need to be logged in to submit a run.",
                    type: "warning",
                });
            };
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