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
                    :leagues="database.leagues"
                    @createLeague="createLeague" 
                    @updateLeague="updateLeague"
                    ></leagues-editor></b-tab>
                <b-tab title="Teams"><teams-editor
                    :leagues="database.leagues"
                    :teams="database.teams"
                    @createTeam="createTeam" 
                    @updateTeam="updateTeam"
                ></teams-editor></b-tab>
                <b-tab title="Footballers"><footballers-editor :footballers="database.footballers"></footballers-editor></b-tab>
            </b-tabs>
            <hr class="bg-light"/>
            <button class="btn btn-success" @saveDatabase>Save data</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator' 
    import {Database} from '../interfaces/interfaces'
    import {League, LeagueData} from '../entities/League'
    import {Team, TeamData} from '../entities/Team'
    import LeaguesEditor from '../components/editor/LeaguesEditor'
    import TeamsEditor from '../components/editor/TeamsEditor'

    @Component({
        components: {
            "leagues-editor": LeaguesEditor,
            "teams-editor": TeamsEditor
        }
    } as ComponentOptions<Vue>)
    
    export default class AppEditor extends Vue {
        // props
        // @Prop(String) readonly agencyId: string
        // @Prop(String) readonly apiToken: string
        
        // data
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
            let data:LeagueData = {
                id: league.id,
                name: 'new league'
            }
            league.import(data)
            this.database.leagues.push(league)
        }

        createTeam() {
            let team:Team = new Team()
            let teamData:TeamData = {
                id: team.id,
                name: 'new team',
                cash: 0,
                league: undefined
            }
            team.import(teamData)
            this.database.teams.push(team)
        }

        saveDatabase() {
            let database:any = {}
            // for database
        }

        updateLeague(data:LeagueData) {
            this.database.leagues.find(league=>league.id==data.id).import(data)
        }

        updateTeam(data:TeamData) {
            this.database.teams.find(team=>team.id==data.id).import(data)
        }
        
    }
</script>

<style scoped lang="scss">
    /deep/ .editor-card {
        background: rgba(0,0,0,0.5);
        padding: 1em;
    }
</style>