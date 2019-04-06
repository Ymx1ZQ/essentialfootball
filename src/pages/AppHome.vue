<template>
    <div>
        <h2>Start the game!</h2>
        <button class="btn btn-success" disabled="disabled">New Game</button><br/>
        <button class="btn btn-primary"><router-link class="text-white" :to="{name: 'editor'}">Editor</router-link></button><br/>
        <button class="btn btn-info" disabled="disabled">Settings</button><br/>
        <button class="btn btn-info" disabled="disabled">Credits</button>
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
    
    export default class AppHome extends Vue {
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