<template>
    <h1> gameStats</h1>
</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import { Game } from '../models/game'

export default defineComponent({
    name: 'GameStats',
    props: {
        game: Game,
    },
    data() {
        return {

        }
    },
    mounted() {
        
    }
})

</script>

<style scoped>

</style>