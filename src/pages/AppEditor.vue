<template>
    <div>
        <h2>Editor</h2>
        <router-link :to="{name: 'home'}">Cancel</router-link>
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator' 

    @Component({
        components: {

        }
    } as ComponentOptions<Vue>)
    
    export default class AppEditor extends Vue {
        // props
        // @Prop(String) readonly agencyId: string
        // @Prop(String) readonly apiToken: string
        
        // state
        
        // computed
        
        // methods
        mounted() {
        }

        
    }
</script>

<style scoped lang="scss">

</style>