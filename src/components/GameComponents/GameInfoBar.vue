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
                <div v-for="platform in game.platforms" :key="platform._id" >
                    {{ platform.name }}
                </div>
            </div>

            
        </div>
        <div class="info-release-date">
            <span class="release-date" type="date">
                Released: {{ rDate }}
            </span>
        </div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import { Game } from '@/models/game'

export default defineComponent({
    name: 'GameInfoBar',
    props: {
        game: {
            type: Game,
            default: {}
        }
    },
    data() {
        return {
            rDate: "",
        }
    },
    methods: {
        getReleaseDate(){
            let newDate = new Date(this.game.releaseDate);
            // let day = newDate.getDay();
            // let month = newDate.getMonth();
            // let year = newDate.getFullYear();
            // let date = `${day} - ${month} - ${year}`
            let date = newDate.toDateString();
            return date;
        }
    },
    watch: {
        game() {
            this.rDate = this.getReleaseDate();
        }
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

