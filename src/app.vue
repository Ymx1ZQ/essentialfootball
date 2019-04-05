<template>
    <div>
    	{{message}}: {{counter}}
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
    
    export default class App extends Vue {
        // props
        // @Prop(String) readonly agencyId: string
        // @Prop(String) readonly apiToken: string
        
        // state
        message:string = "hello world"

        // computed
        get counter () {
        	return this.message.length
        }

        // methods
        mounted() {
            //this.loadData()
        }

        
    }
</script>

<style scoped lang="scss">
    body * {
        background: green !important;
        color: blue;
    }
</style>