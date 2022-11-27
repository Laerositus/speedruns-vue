<template>
    <el-button @click="addPlatform">Add platform</el-button>
    <div class="platform-list">

        <el-scrollbar max-height="100%">

            <div v-for="platform in platforms" :key="platform._id">
                <RouterLink :to="{name: 'platformdetail', params: {id: platform._id}}">
                    <el-card>
                        <!-- <el-image :src=platform.image class="platform-cover"/> -->

                        <div>
                            <span>{{platform.name}}</span>
                            <!-- <div v-for="platform in platform.platforms" :key="platform._id">                                
                                <p>{{platform.name}}</p>
                            </div> -->
                        </div>
                    </el-card>
                </RouterLink>
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
      display: flex;
      columns: 4;
      flex-wrap: wrap;
  }

  .platform-cover {
    height: 150px;
  }
</style>