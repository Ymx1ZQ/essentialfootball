<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <basic-select
                    :options="footballerOptions"
                    :selected-option="footballerOptions.find(footballerOption=>footballerOption.value==footballerSelector)"
                    v-if="footballers.length>0"
                    @select="(item)=>footballerSelector=item.value"
                ></basic-select>
                <p v-if="footballers.length==0">No footballer found.</p>
                <button class="btn btn-primary" @click="createFootballer">Create footballer</button>
            </div>
            <div class="col-md-9">
                <div id="footballerEditorCard" class="editor-card" v-if="selectedFootballer">
                    <p class="small text-muted">ID: {{footballerSelector}}</p>
                    <b-tabs content-class="mt-3">
                        <b-tab title="Personal data" active>
                            <div class="form-group">
                                <label>First Name</label>
                                <input class="form-control" type="text" name="firstName" :value="selectedFootballer.firstName" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input class="form-control" type="text" name="lastName" :value="selectedFootballer.lastName" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                            <div class="form-group">
                                <label>Nick Name</label>
                                <input class="form-control" type="text" name="nickName" :value="selectedFootballer.nickName" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                            <div class="form-group">
                                <label>Birth Date</label>
                                <input class="form-control" type="date" name="birthDate" :value="selectedFootballer.birthDate" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                            <div class="form-group">
                                <label>Team</label>
                                <basic-select
                                    :options="teamOptions"
                                    :selected-option="teamOptions.find(teamOption=>teamOption.value==selectedFootballer.team)"
                                    name="team"
                                    @select="item=>{teamSelector=item.value; updateFootballer()}"
                                ></basic-select>
                            </div>
                        </b-tab>
                        <b-tab title="Skills data">
                            
                        </b-tab>
                        <b-tab title="Tactical data">
                            
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator' 
    import {Footballer, FootballerData} from '../../entities/Footballer'
    import {Team, TeamData} from '../../entities/Team'
    import {BasicSelect} from 'vue-search-select'

    @Component({
        components: {
            'basic-select': BasicSelect
        }
    } as ComponentOptions<Vue>)
    
    export default class FootballersEditor extends Vue {
        props
        @Prop(Array) readonly footballers: Footballer[]
        @Prop(Array) readonly teams: Team[]
        
        // state
        footballerSelector:string = ''
        teamSelector:string = ''
        
        // computed
        get teamOptions() {
            return this.teams.map(team=>{return {value: team.id, text: team.name}})
        }
        get footballerOptions() {
            return this.footballers.map(footballer=>{return {value: footballer.id, text: footballer.fullName }})
        }

        get selectedFootballer() {
            return this.footballers.find(footballer=>footballer.id==this.footballerSelector)
        }
        
        // methods
        created() {
            if (this.footballers.length>0) {
                this.footballerSelector = this.footballers[0].id
            }
            if (
                this.teams.length>0 &&
                this.teams.find(team=>team.id==this.selectedFootballer.team)
            ) {
                this.teamSelector = this.selectedFootballer.team
            } else {
                this.teamSelector = ''
            }
        }

        createFootballer() {
            this.$emit('createFootballer')
            this.footballerSelector = this.footballers[this.footballers.length-1].id
        }

        updateFootballer() {
            let firstNameInput = document.querySelector('#footballerEditorCard input[name="firstName"]') as HTMLInputElement
            let lastNameInput = document.querySelector('#footballerEditorCard input[name="lastName"]') as HTMLInputElement
            let nickNameInput = document.querySelector('#footballerEditorCard input[name="nickName"]') as HTMLInputElement
            let birthDateInput = document.querySelector('#footballerEditorCard input[name="birthDate"]') as HTMLInputElement
            let footballerData:FootballerData = {
                id: this.footballerSelector,
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                nickName: nickNameInput.value,
                birthDate: birthDateInput.value,
                team: this.teamSelector
            }
            this.$emit('updateFootballer', footballerData)
        }

    }
</script>

<style scoped lang="scss">

</style>