<template>
    <div class="body">
        <h1> Edit {{ platform.name }}</h1>
    </div>

    <el-form >
        <el-form-item label="platform Name" >
            <el-input v-model="platform.name"/>
        </el-form-item>

        <el-form-item label="ReleaseDate">
            <el-date-picker v-model="platform.releaseDate"/>
        </el-form-item>

    </el-form>

    <el-button type="primary" @click="editplatform">Save platform</el-button>
    <el-button @click="$router.back()">Cancel</el-button>
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
        }
    },
    computed: {
        platform() {
            const p = this.$store.state.platforms.find((p: Platform) => p._id == this.id);
            return p;
        }
    },
    methods: {
        async editplatform() {
            const res = await this.$axios.put('/platform/'+ this.id, this.platform)
            console.log("Move to platformDetail view");

            this.$store.commit('updatePlatform', this.platform);
            this.$router.push('/platformdetail/'+this.id);
        },
        async deleteplatform() {
            const res = await this.$axios.delete('/platform/'+this.id)
            console.log(res);

            this.$store.commit('removePlatform', this.platform._id);
            this.$router.push('/platforms');
        },
    },
    created() {
        this.id = String(this.$route.params.id);
    }
})

</script>


<style>

</style>