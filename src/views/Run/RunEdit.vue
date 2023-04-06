<template>
    <RunEditForm :run="run"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RunEditForm from '@/components/RunComponents/RunEditForm.vue'

export default defineComponent({
    name: 'RunEdit',
    components: {
        RunEditForm,
    },
    data() {
        return {
        }
    },
    computed: {
        run() {
            const id = this.$route.params.id;
            const currentRun = this.$store.state.runs.find((run: {_id: string}) => run._id == id);
            return currentRun;
        }
    },
    methods: {
        

    },
    mounted(){
        
    }
})
</script>
