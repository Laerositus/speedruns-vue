<template>
    <h1>Stats</h1>
    <p>Players: {{ game.playerCount }}</p>
    <p>Runs: {{ game.totalRuns }} </p>

</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import { Game } from '@/models/game'

export default defineComponent({
    name: 'GameStats',
    props: [ 'game'],
    data() {
        return {
            playerCount: '',
            runCount: '',
            
        }
    },
    methods: {
        
    },
    watch: {
        game() {
            
        }
    },
    created() {
    }
})

</script>

<style scoped>

</style>