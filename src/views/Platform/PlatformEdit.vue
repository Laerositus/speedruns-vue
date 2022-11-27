<template>
    <div class="body">
        <h1> Edit platform page</h1>
        <!-- {{platform.name}} -->
    </div>

    <!-- <platformInfoBar :platform="platform" />  -->
    
    <el-form >
        <el-form-item label="platform Name" >
            <el-input v-model="platformName"/>
        </el-form-item>

        <!-- <el-form-item label="Platforms">
            <el-checkbox-group v-for="platform in PLATFORMS" :key="platform" v-model="platformPlatforms">
                <el-checkbox :label="platform.name" />
            </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="ReleaseDate">
            <el-date-picker v-model="platformReleaseDate" :placeholder="platformReleaseDate"/>                
        </el-form-item>
        <!-- <el-form-item label="TotalRuns">
            <el-input-number v-model="platformTotalRuns" disabled="true" style="{background-color: white;}"/>
        </el-form-item> -->
        <!-- <el-form-item label="Categories">
            <el-checkbox-group v-for="category in platformCategories" :key="category" v-model="platformPlatforms">
                <el-checkbox :label="category.name"/>
            </el-checkbox-group>
        </el-form-item> -->
        <!-- <el-form-item label="Image URL:">
            <el-input v-model="platformImage" />
        </el-form-item> -->

    </el-form>


    <!-- <el-button v-if="editMode" v-on:click="editplatform">Save changes</el-button> -->
    <el-button type="danger" @click="editplatform">Save platform</el-button>
    <el-button type="danger" @click="deleteplatform">Delete platform</el-button>
</template>

<script setup lang="ts">
import { 
    ElButton, 
    ElForm, 
    ElInput, 
    ElFormItem, 
    ElCheckboxGroup, 
    ElCheckbox, 
    ElDatePicker, 
    ElInputNumber 
} from 'element-plus'
</script>

<script lang="ts">
import type { Platform } from '../../models/platform'
import { PLATFORMS, GAMES , CATEGORIES } from '../../mock-data'
import { defineComponent } from 'vue'

import type {AxiosInstance} from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export default defineComponent({
    name: 'platformDetail',
    data() {
        return {
            id: '',
            platform: PLATFORMS[0],
            // editedData: this.platform,
            platformName: '',
            platformGames: GAMES,
            platformReleaseDate: new Date(),
        }
    },
    methods: {
        async fetchplatform(id: any){
            const res = await this.$axios.get('/platform/'+id)
            // console.log(res.data.data)
            this.platform = res.data.data;
            this.fillDetails();
        },
        fillDetails() {
            this.platformName = this.platform.name;
            this.platformReleaseDate = this.platform.releaseDate;
            this.platformGames = this.platform.games
        },
        async editplatform() {
            console.log("Save Changes called");
            let platform = {
                "id": this.id,
                "name": this.platformName,
                "releaseDate": this.platformReleaseDate,
                "games": this.platformGames
            }
            console.log(platform);

            const res = await this.$axios.put('/platform/'+ this.id, platform)
            console.log("Move to platformDetail view");
            this.$router.push('/platformdetail/'+this.id);
        },
        async deleteplatform() {
            console.log("Delete platform called");
            const res = await this.$axios.delete('/platform/'+this.id)
            console.log(res);

            this.$router.push('/platforms');
        },
    },
    async mounted() {
        // console.log(this.platform)
        this.id = String(this.$route.params.id);
        await this.fetchplatform(this.id);
    }
})

</script>


<style>

</style>