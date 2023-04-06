<template>
    <div class="body">
        <h1> Add new platform</h1>
    </div>
    
    <el-form 
        ref="ruleFormRef"
        :rules="rules"
        :model="platform"
    >
        <el-form-item label="Platform Name" prop="name">
            <el-input v-model="platform.name"/>
        </el-form-item>
        <el-form-item label="ReleaseDate" prop="releaseDate">
            <el-date-picker v-model="platform.releaseDate" type="date"/>                
        </el-form-item>
        <!-- <el-form-item label="Image URL:">
            <el-input v-model="platformImage" />
        </el-form-item> -->

    </el-form>


    <!-- <el-button v-if="editMode" v-on:click="editplatform">Save changes</el-button> -->
    <el-button type="primary" @click="addPlatform(ruleFormRef)">Save platform</el-button>
    <el-button type="danger" @click="$router.back()">Cancel</el-button>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()    
</script>

<script lang="ts">
import { Platform } from '../../models/platform'
import { defineComponent} from 'vue'
import utils from '@/utils'

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
            platform: {
                name: '',
                releaseDate: '',
            },
            rules: reactive<FormRules>({
                name: [
                    { required: true, message: 'Please enter a platform name', trigger: 'blur'},
                    { min: 1, message: 'Length should be at least 1', trigger: 'blur'},
                ],
                releaseDate: [
                    { type: 'date', required: true, message: 'Please enter a game release date', trigger: 'blur'}
                ]
            })
        }
    },
    methods: {
        async addPlatform(formEl: FormInstance | undefined) {
            if(!utils.validateFields(formEl)) return;
            
            try{                 
                let platform = {
                    "name": this.platform.name,
                    "releaseDate": this.platform.releaseDate,
                }
                const res = await this.$axios.post('/platform', platform);
            
                let relDate = new Date();
                relDate.setTime(Date.parse(this.platform.releaseDate));
                let resP = res.data.data;
                
                let p = new Platform( 
                    resP._id, 
                    this.platform.name, 
                    relDate
                );
                this.$store.commit('addPlatform', p);

            } catch(e) { console.log(e) }
            this.$router.back();
        }
    },
})

</script>

<style>

</style>