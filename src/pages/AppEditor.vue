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
                <b-tab title="Footballers"><footballers-editor 
                    :footballers="database.footballers"
                    :teams="database.teams"
                    @createFootballer="createFootballer"
                    @updateFootballer="updateFootballer"
                ></footballers-editor></b-tab>
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
    import {Footballer, FootballerData} from '../entities/Footballer'
    import {League, LeagueData} from '../entities/League'
    import {Team, TeamData} from '../entities/Team'
    import FootballersEditor from '../components/editor/FootballersEditor'
    import LeaguesEditor from '../components/editor/LeaguesEditor'
    import TeamsEditor from '../components/editor/TeamsEditor'
    import StarsSelector from '../components/editor/StarsSelector'

    @Component({
        components: {
            "footballers-editor": FootballersEditor,
            "leagues-editor": LeaguesEditor,
            "teams-editor": TeamsEditor,
            "stars-selector": StarsSelector
        }
    } as ComponentOptions<Vue>)
    
    export default class AppEditor extends Vue {
        // props
        
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

        createFootballer() {
            let footballer:Footballer = new Footballer()
            let footballerData:FootballerData = {
                id: footballer.id,
                
                // personal data
                firstName: 'new',
                lastName: 'footballer',
                nickName: '',
                birthDate: '1987-08-31',
                injuryDays: 0,
                team: undefined,

                // attributes
                energy: 80,
                morale: 80,
                condition: 67,
                experience: 67,
                mental: 67,
                technical: 67,
                tactical: 67,
                physical: 67,
                flair: 67,
                potential: 67,
                reputation: 67
            }
            footballer.import(footballerData)
            this.database.footballers.push(footballer)
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

        updateFootballer(data:FootballerData) {
            this.database.footballers.find(footballer=>footballer.id==data.id).import(data)
        }
        
    }
</script>

<style scoped lang="scss">
    /deep/ .editor-card {
        background: rgba(0,0,0,0.5);
        padding: 1em;
    }
</style>