<script setup lang="ts">
import { Film } from '@element-plus/icons-vue'

</script>

<template>
    <h1>Leaderboard</h1>

    <el-table stripe :data="runs">
            <el-table-column prop="placement" label="Placement"/>
            <el-table-column prop="player" label="Player"/>
            <el-table-column label="Platform">
                <template #default="scope">
                    {{ getPlatform(scope.row.platform) }}       
                </template>
            </el-table-column>
            <el-table-column label="Category">
                <template #default="scope">
                    {{ getCategory(scope.row.category) }}       
                </template>
            </el-table-column>
            <el-table-column label="Time">   
                <template #default="scope">
                    <span>{{ scope.row.time.hours}}</span>h:<span>{{ scope.row.time.minutes}}</span>m:<span> {{ scope.row.time.hours }} </span>s
                </template>
            </el-table-column>
            <el-table-column label="Video">
                <template #default="scope">
                    <el-button @click="openVideoLink(scope.row.videoLink)">
                        <el-icon > <Film /> </el-icon>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column>
                <template #default="scope">
                    <el-button type="primary" v-if="scope.row.player == $store.state.loggedInPlayer?.playername" @click="routingRunDetail(scope.row._id)">Edit</el-button>
                </template>
            </el-table-column>
    
    </el-table>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Run } from '@/models/run'

export default defineComponent({
    name: 'GameLeaderboard',
    props: [ 'runs', 'game'],
    data() {
        return {
        }
    },
    methods: {
        getCategory(catID: string): string {
            const cat = this.game.categories.find((el: { _id: string; }) => el._id == catID);
            return cat.name;
        },
        getPlatform(platformID: string): string {
            const plat = this.$store.state.platforms.find((el: { _id: string; }) => el._id == platformID);            
            return plat.name;
        },
        routingRunDetail(id: string){
            this.$router.push('/run/' + id);
        },
        openVideoLink(url: string) {
            window?.open(url, '_blank').focus();
        },
    }
})
</script>

<style scoped>

.runs {
    display: grid;
    grid-template-rows: auto;
}

</style>