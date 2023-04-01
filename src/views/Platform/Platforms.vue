<template>
    <div class="platform-list">
        <el-button @click="addPlatform">Add platform</el-button>
        <el-scrollbar max-height="100%">

            <div class="platform-grid">
                <div v-for="platform in platforms" :key="platform._id" class="platform-item">
                    <RouterLink :to="{name: 'platformdetail', params: {id: platform._id}}">
                        <el-card class="platform-card">
                            <div class="platform-image">
                                <!-- <el-image :src=platform.image class="platform-cover"/> -->
                            </div>
    
                            <div>
                                <span>{{platform.name}}</span>
                            </div>
                        </el-card>
                    </RouterLink>
                </div>
            </div>
            
        </el-scrollbar>
    </div>
    
</template>

<script lang="ts">
import { PLATFORMS } from '../../mock-data'

import { defineComponent } from 'vue'
import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}


export default defineComponent({
    name: 'Platforms',
    data() {
        return {
            platforms: PLATFORMS
        }
    },
    methods: {
        async fetchData(){
            var res2 = await this.$axios.get('/platform')
            this.platforms = res2.data.data
            // this.$store.commit("setPlatforms", this.platforms)
        },
        addPlatform() {
            this.$router.push('/addplatform');
        }
    },
    async mounted() {
        // console.log(this.platforms)
        await this.fetchData()

    }
})
</script>

<style>
.platform-list {
    margin: 1%
}

.platform-grid {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-row-gap: 5px;
}

.platform-item {
    width: 150px;
    height: 250px;
}

.platform-card {
    height: 100%;
}

.platform-image {
    width: 98%;
    text-align: center;
    overflow: hidden;
}

.platform-cover {
    height:130px;
    position: relative;
    left: 100%;
    margin-left: -200%;
}
</style>