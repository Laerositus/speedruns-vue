<template>
    <div class="body">
        <h1>{{platform.name}}</h1>
        <h2 v-if="releaseDate">ReleaseDate: {{releaseDate}}</h2>
    </div>


    <!-- <PlatformInfoBar :platform="platform" /> 
    <PlatformStats :platform="platform" /> -->
    <el-button v-if="!editMode" @click="goToEditPage"> Edit platform </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'

</script>


<script lang="ts">
import type { Platform } from '../../models/platform'
import { PLATFORMS } from '../../mock-data'
import { defineComponent } from 'vue'

import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineComponent({
    name: 'PlatformDetail',
    data() {
        return {
            id: '',
            platform: PLATFORMS[0],
            releaseDate: '',
            editMode: false,
        }
    },
    methods: {
        async fetchPlatform(id: any){
            const res = await this.$axios.get('/platform/'+id)            
            this.platform = res.data.data
        },
        async editPlatform() {
            console.log("Save Changes called");
                    
        },
        async deletePlatform() {
            console.log("Delete platform called");
            // this.toggleEdit();
            const res = await this.$axios.delete('/platform/'+1)
            console.log(res);

            // this.$router.push('/');
        },
        toggleEdit() {
            this.editMode = !this.editMode;
            console.log("EditMode set to: "+this.editMode);
        },
        goToEditPage() {
            console.log("Moving to edit view");
            this.$router.push('/editPlatform/'+this.id);
        },
        getReleaseDate(platform: Platform) {
            // Setting releasedate if exists
            if(platform.releaseDate){
                let stringRes = platform.releaseDate                
                let Stringdate = String(stringRes).substring(0, 10)
                let date = new Date(Stringdate)
                let day = date.getDate();
                let month = date.getMonth();
                let year = date.getFullYear();
                let res = `${day}-${month}-${year}`
                this.releaseDate = res;
            }
        }
    },
    async mounted() {
        this.id = String(this.$route.params.id);
        // console.log(this.platform)
        await this.fetchPlatform(this.id);
        this.getReleaseDate(this.platform);
    }
})

</script>

<style>

</style>