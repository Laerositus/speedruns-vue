<template>
    <PlayerStats />
    <PlayerGamesRun />
    <PlayerInfoBar />
    <PlayerRunsList />
</template>

<script lang="ts">
import PlayerStats from '../components/PlayerStats.vue'
import PlayerGamesRun from '../components/PlayerGamesRun.vue'
import PlayerInfoBar from '../components/PlayerInfoBar.vue'
import PlayerRunsList from '../components/PlayerRunsList.vue'

import { defineComponent } from 'vue'
import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

</script>