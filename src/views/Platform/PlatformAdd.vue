<template>
    <div class="body">
        <h1> Add new platform</h1>
    </div>
    
    <el-form >
        <el-form-item label="Platform Name" >
            <el-input v-model="platformName"/>
        </el-form-item>
        <el-form-item label="ReleaseDate">
            <el-date-picker v-model="platformReleaseDate" :placeholder="platformReleaseDate"/>                
        </el-form-item>
        <!-- <el-form-item label="Image URL:">
            <el-input v-model="platformImage" />
        </el-form-item> -->

    </el-form>


    <!-- <el-button v-if="editMode" v-on:click="editplatform">Save changes</el-button> -->
    <el-button type="primary" @click="addplatform">Save platform</el-button>
    <el-button type="danger" @click="cancel">Cancel</el-button>
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
import { GAMES,PLATFORMS } from '../../mock-data'
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
            id: -1,
            platform: null,
            platformName: '',
            platformReleaseDate: '',
        }
    },
    methods: {
        async addplatform() {
            console.log("Save Changes called");
            let platform = {
                "name": this.platformName,
                "releaseDate": this.platformReleaseDate,
            }
            console.log(platform);

            const res = await this.$axios.post('/platform', platform)
            console.log("Move to platform view");
            this.$router.push('/platforms');
        },
        cancel() {
            this.$router.push('/');
        }
    },
    async mounted() {
        // console.log(this.platform)
        // this.id = this.$route.params.id;
        // await this.fetchplatform(this.id);

    }
})

</script>

<style>

</style>