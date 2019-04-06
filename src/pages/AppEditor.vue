<template>
    <div>
        <router-link class="float-right" :to="{name: 'home'}">↰ back</router-link>
        <h2>Editor</h2>
        <div v-if="!databaseLoaded">
            <button class="btn btn-success">Load database</button>
            <button class="btn btn-secondary" @click="createEmptyDatabase">Create empty database</button>
        </div>
        <div v-if="databaseLoaded">
            <b-tabs content-class="mt-3">
                <b-tab title="Leagues" active><leagues-editor 
                    @createLeague="createLeague" 
                    @updateLeague="updateLeague"
                    :leagues="database.leagues"
                    ></leagues-editor></b-tab>
                <b-tab title="Teams"><teams-editor :teams="database.teams"></teams-editor></b-tab>
                <b-tab title="Footballers"><footballers-editor :footballers="database.footballers"></footballers-editor></b-tab>
            </b-tabs>
            <hr class="bg-light"/>
            <button class="btn btn-success">Save data</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator' 
    import {Database} from '../interfaces/interfaces'
    import {League, LeagueState} from '../entities/League'
    import LeaguesEditor from '../components/editor/LeaguesEditor'

    @Component({
        components: {
            "leagues-editor": LeaguesEditor
        }
    } as ComponentOptions<Vue>)
    
    export default class AppEditor extends Vue {
        // props
        // @Prop(String) readonly agencyId: string
        // @Prop(String) readonly apiToken: string
        
        // state
        database:Database = {
            footballers: [],
            leagues: [],
            teams: []
        }
        databaseLoaded:boolean = false
        
        // computed
        
        // methods
        mounted() {
        }

        createEmptyDatabase() {
            this.database = {
                footballers: [],
                leagues: [],
                teams: []
            }
            this.databaseLoaded = true
        }

        createLeague() {
            let league:League = new League()
            let leagueState:LeagueState = {
                id: league.id,
                name: 'new league'
            }
            league.import(leagueState)
            this.database.leagues.push(league)
        }

        updateLeague(leagueState:LeagueState) {
            this.database.leagues.find(league=>league.id==leagueState.id).import(leagueState)
        }
        
    }
</script>

<style scoped lang="scss">

</style>