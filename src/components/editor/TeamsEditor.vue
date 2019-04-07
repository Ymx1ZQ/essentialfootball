<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <basic-select
                    :options="teamOptions"
                    :selected-option="teamOptions.find(teamOption=>teamOption.value==teamSelector)"
                    v-if="teams.length>0"
                    @select="(item)=>teamSelector=item.value"
                ></basic-select>
                <p v-if="teams.length==0">No team found.</p>
                <button class="btn btn-primary" @click="createTeam">Create team</button>
            </div>
            <div class="col-md-9">
                <div id="teamEditorCard" class="editor-card" v-if="selectedTeam">

                    <p class="small text-muted">ID: {{teamSelector}}</p>
                    <div class="form-group">
                        <label>Name</label>
                        <input class="form-control" type="text" name="name" :value="selectedTeam.name" @keyup="updateTeam" @change="updateTeam"/>
                    </div>
                    <div class="form-group">
                        <label>League</label>
                        <basic-select
                            :options="leagueOptions"
                            :selected-option="leagueOptions.find(leagueOption=>leagueOption.value==selectedTeam.league)"
                            name="league"
                            @select="item=>{leagueSelector=item.value; updateTeam()}"
                        ></basic-select>
                    </div>
                    <div class="form-group">
                        <label>Cash (€)</label>
                        <input step="5000" class="form-control" type="number" name="cash" :value="selectedTeam.cash||0" @mouseup="updateTeam" @keyup="updateTeam" @change="updateTeam"/>
                        <p class="small text-muted">€{{Math.round(selectedTeam.cash/1000000*100)/100}}M</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator' 
    import {Team, TeamData} from '../../entities/Team'
    import {League, LeagueData} from '../../entities/League'
    import { BasicSelect } from 'vue-search-select'

    @Component({
        components: {
            'basic-select': BasicSelect
        }
    } as ComponentOptions<Vue>)
    
    export default class TeamsEditor extends Vue {
        // props
        @Prop(Array) readonly teams: Team[]
        @Prop(Array) readonly leagues: League[]
        
        // state
        teamSelector:string = ''
        leagueSelector:string = ''
        
        // computed
        get leagueOptions() {
            return this.leagues.map(league=>{return {value: league.id, text: league.name}})
        }
        get teamOptions() {
            return this.teams.map(team=>{return {value: team.id, text: team.name}})
        }

        get selectedTeam() {
            return this.teams.find(team=>team.id==this.teamSelector)
        }
        
        // methods
        created() {
            if (this.teams.length>0) {
                this.teamSelector = this.teams[0].id
            }
            if (
                this.leagues.length>0 &&
                this.leagues.find(league=>league.id==this.selectedTeam.league)
            ) {
                this.leagueSelector = this.selectedTeam.league
            } else {
                this.leagueSelector = ''
            }
        }

        createTeam() {
            this.$emit('createTeam')
            this.teamSelector = this.teams[this.teams.length-1].id
        }

        updateTeam() {
            let nameInput = document.querySelector('#teamEditorCard input[name="name"]') as HTMLInputElement
            let cashInput = document.querySelector('#teamEditorCard input[name="cash"]') as HTMLInputElement
            let teamData:TeamData = {
                id: this.teamSelector,
                name: nameInput.value,
                cash: Number(cashInput.value),
                league: this.leagueSelector
            }
            this.$emit('updateTeam', teamData)
        }

    }
</script>

<style scoped lang="scss">

</style>