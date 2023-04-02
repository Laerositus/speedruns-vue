<template>
    <RunSubmissionForm :game="game"/>
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
    computed: {
        game: {
            get(): any {
                const id = this.$route.params.id;
                const currentGame = this.$store.state.games.find((game: {_id: string}) => game._id == id);
                console.log(currentGame);
                return currentGame;
            },
            set() { }
        }
    },
    methods: {
        

    },
    mounted(){
        
    }
})
</script>
