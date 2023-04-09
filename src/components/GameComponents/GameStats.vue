<template>
    <h1>Stats</h1>
    <p>Players: {{ game.playerCount }}</p>
    <p>Runs: {{ game.totalRuns }} </p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'GameStats',
    props: ['game'],
    data() {
        return { }
    },
    methods: {
    },
    created() {
    }
})

</script>

<style scoped>

</style>