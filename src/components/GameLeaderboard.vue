<template>
    <h1> GameLeaderboard</h1>
</template>

<script lang="ts">

import { defineComponent, defineProps } from 'vue'
import { Game } from '../models/game'

export default defineComponent({
    name: 'GameLeaderboard',
    props: {
        game: Game,
    },
    data() {
        return {
            // game: this.game,
        }
    },
    mounted() {

    }
})
</script>

<style scoped>

</style>