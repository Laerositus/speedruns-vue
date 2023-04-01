<template>
    <h1> Submit Run Vue!</h1>
    <RunSubmissionForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RunSubmissionForm from '@/components/RunSubmissionForm.vue'

export default defineComponent({
    name: 'Submit',
    components: {
        RunSubmissionForm,
    },
    data() {
        return {

        }
    },
    methods: {

    }
})
</script>
