<template>
    <h1>
        {{game.name}} InfoBar
    </h1>
    

</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import { Game } from '../models/game'

export default defineComponent({
    name: 'GameInfoBar',
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