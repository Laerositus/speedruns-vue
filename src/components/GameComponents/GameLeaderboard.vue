<template>
    <h1>Leaderboard</h1>

    <div class="runs">
        <div v-for="run in game.runs" :key="run.placement">
            <span> {{ run.placement }}</span>
            <span> </span>
        </div>

    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { Game } from '@/models/game'

export default defineComponent({
    name: 'GameLeaderboard',
    props: {
        game: {
            type: Game,
            default: {},
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        console.log()

    }
})
</script>

<style scoped>

.runs {
    display: grid;

}

</style>