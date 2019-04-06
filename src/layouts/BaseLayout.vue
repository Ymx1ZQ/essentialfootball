<template>
    <div style="height: 100%">
        <header class="navbar navbar-dark bg-dark text-light" >
            <h1>Essential Football</h1>
        </header>
        <main class="bg-dark-semitransparent text-white">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </main>
        <footer class="page-footer bg-dark text-light">
            <div class="container-fluid">
                © 2019, Essential Football
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator' 
    import Router from 'vue-router'
    
    @Component({
        components: {

        },
    } as ComponentOptions<Vue>)
    export default class BaseLayout extends Vue {

    }
</script>

<style scoped lang="scss">
    header {
        height: 72px;
    }
    footer {
        height: 24px;
    }
    main {
        height: calc( 100vh - 96px );
    }
    main div {
        padding-top: 1em;
        padding-bottom: 1em;
    }

</style>
