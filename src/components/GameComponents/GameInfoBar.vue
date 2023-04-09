<template>
    <div class="info-body">
        <div class="info-cover" >
            <el-image :src=game.image />
        </div>
        <div class="info-content">
            <h1 class="info-name">
                {{game.name}}
            </h1>
            <div class="info-platforms">
                <div v-for="platform in $store.getters.filteredPlatformNames(game.platforms)" :key="platform" >
                    <a v-if="platform" @click="goToPlatform(platform)"> {{ platform }} </a>
                </div>
            </div>

            
        </div>
        <div class="info-release-date">
            <span class="release-date" type="date">
                Released on: {{ rDate }}
            </span>
        </div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import { Game } from '@/models/game'
import type { Platform } from '@/models/platform';

export default defineComponent({
    name: 'GameInfoBar',
    props: [ 'game'],
    data() {
        return {
            rDate: this.getReleaseDate(),
        }
    },
    computed: {
        // rDate: {
        //     get() {return this.getReleaseDate()}
        // }
    },
    methods: {
        getReleaseDate(){
            let newDate = new Date(this.game.releaseDate);
            let date = newDate.toDateString();
            return date;
        },
        goToPlatform(platform: string) {
            const plat = this.$store.state.platforms.find((p: Platform) => p.name == platform);
            this.$router.push('/platformdetail/' + plat._id);
        }
    },
    watch: {
        
    },
    created() {
    }
})

</script>

<style scoped>

.info-body {
    display: flex;
    gap: 10px;
}

.info-cover {
    width: 190px;
}

.info-content {
    width: 300px;
    font-size: 0.8em;
}

.info-release-date {
    width: 100%;
}
</style>

