<template>
    <div>
        <h2>Start the game!</h2><br/>
         <div class="col-md-3">
            <button class="btn btn-block btn-success" disabled="disabled">New Game</button><br/><br/>
            <router-link class="btn btn-block btn-primary text-white" :to="{name: 'editor'}">Editor</router-link><br/><br/>
            <button class="btn btn-block btn-info" disabled="disabled">Settings</button><br/><br/>
            <button class="btn btn-block btn-info" disabled="disabled">Credits</button><br/>
        </div>
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