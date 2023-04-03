<template>
    <h1>Leaderboard</h1>

    <el-table :data="runs">
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
    
    </el-table>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import type { Run } from '@/models/run'

export default defineComponent({
    name: 'GameLeaderboard',
    props: [ 'game'],
    computed: {
        runs(): Run[] {
            const runs = this.$store.getters.runListByGame(this.game);
            // console.log(runs);
            return runs;
        },
    },
    data() {
        return {
        }
    },
    mounted() {

    },
    methods: {
        getCategory(catID: string): string {
            const cat = this.game.categories.find((el: { _id: string; }) => el._id == catID);
            return cat.name;
        },
        getPlatform(platformID: string): string {
            const plat = this.game.platforms.find((el: { _id: string; }) => el._id == platformID);
            return plat.name;
        }
    }
})
</script>

<style scoped>

.runs {
    display: grid;
    grid-template-rows: auto;
}

</style>