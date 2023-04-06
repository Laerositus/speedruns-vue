<template>
    <div class="body">
        <h1> Edit {{ platform.name }}</h1>
    </div>

    <el-form ref="ruleFormRef" :rules="rules" :model="platform">
        <el-form-item label="platform Name" prop="name">
            <el-input v-model="platform.name"/>
        </el-form-item>

        <el-form-item label="ReleaseDate" prop="releaseDate">
            <el-date-picker v-model="platform.releaseDate"/>
        </el-form-item>

    </el-form>

    <el-button type="primary" @click="editplatform(ruleFormRef)">Save platform</el-button>
    <el-button @click="$router.back()">Cancel</el-button>
    <el-button type="danger" @click="deleteplatform">Delete platform</el-button>

</template>
<script lang="ts" setup>

const ruleFormRef = ref<FormInstance>();
</script>


<script lang="ts">
import type { Platform } from '../../models/platform'
import { defineComponent, reactive, ref } from 'vue'

import type {AxiosInstance} from 'axios'
import type { FormInstance, FormRules } from 'element-plus'
import utils from '@/utils';

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
    computed: {
        platform() {
            const p = this.$store.state.platforms.find((p: Platform) => p._id == this.id);
            return p;
        }
    },
    methods: {
        async editplatform(formEl: FormInstance | undefined) {
            if(await utils.validateFields(formEl) == false) return;

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