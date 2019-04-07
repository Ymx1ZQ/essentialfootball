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
                            <div class="form-inline">
                                <label>First Name</label>
                                <input class="form-control" type="text" name="firstName" :value="selectedFootballer.firstName" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                            <div class="form-inline">
                                <label>Last Name</label>
                                <input class="form-control" type="text" name="lastName" :value="selectedFootballer.lastName" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                            <div class="form-inline">
                                <label>Nick Name</label>
                                <input class="form-control" type="text" name="nickName" :value="selectedFootballer.nickName" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                            <div class="form-inline">
                                <label>Birth Date</label>
                                <input class="form-control" type="date" name="birthDate" :value="selectedFootballer.birthDate" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                            <div class="form-inline">
                                <label>Team</label>
                                <basic-select
                                    :options="teamOptions"
                                    :selected-option="teamOptions.find(teamOption=>teamOption.value==selectedFootballer.team)"
                                    name="team"
                                    @select="item=>{teamSelector=item.value; updateFootballer()}"
                                ></basic-select>
                            </div>
                            <div class="form-inline">
                                <label>Injury Days</label>
                                <input class="form-control" type="number" min="0" name="injuryDays" :value="selectedFootballer.injuryDays" @keyup="updateFootballer" @change="updateFootballer"/>
                            </div>
                        </b-tab>
                        <b-tab title="Skills data">
                            <div class="form-inline">
                                <label>Energy (/100)</label>
                                <input class="form-control" type="number" name="energy" :value="selectedFootballer.energy" @keyup="updateFootballer" @change="updateFootballer" readonly="readonly"/>
                            </div>
                            <div class="form-inline">
                                <label>Morale (/100)</label>
                                <input class="form-control" type="number" name="morale" :value="selectedFootballer.morale" @keyup="updateFootballer" @change="updateFootballer" readonly="readonly"/>
                            </div>
                            <div class="form-inline">
                                <label>Condition</label>
                                <stars-selector 
                                    name="condition" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.condition)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
                            <div class="form-inline">
                                <label>Experience</label>
                                <stars-selector 
                                    name="experience" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.experience)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
                            <div class="form-inline">
                                <label>Mental skills</label>
                                <stars-selector 
                                    name="mental" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.mental)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
                            <div class="form-inline">
                                <label>Technical skills</label>
                                <stars-selector 
                                    name="technical" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.technical)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
                            <div class="form-inline">
                                <label>Tactical skills</label>
                                <stars-selector 
                                    name="tactical" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.tactical)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
                            <div class="form-inline">
                                <label>Physical skills</label>
                                <stars-selector 
                                    name="physical" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.physical)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
                            <div class="form-inline">
                                <label>Flair</label>
                                <stars-selector 
                                    name="flair" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.flair)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
                            <div class="form-inline">
                                <label>Potential</label>
                                <stars-selector 
                                    name="potential" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.potential)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
                            <div class="form-inline">
                                <label>Reputation</label>
                                <stars-selector 
                                    name="reputation" 
                                    :value="selectedFootballer.convertToStars(selectedFootballer.reputation)"
                                    @select="updateFootballer"
                                ></stars-selector>
                            </div>
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
    import StarsSelector from './StarsSelector'

    @Component({
        components: {
            'basic-select': BasicSelect,
            'stars-selector': StarsSelector
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
            // personal data
            let firstNameInput = document.querySelector('#footballerEditorCard input[name="firstName"]') as HTMLInputElement
            let lastNameInput = document.querySelector('#footballerEditorCard input[name="lastName"]') as HTMLInputElement
            let nickNameInput = document.querySelector('#footballerEditorCard input[name="nickName"]') as HTMLInputElement
            let birthDateInput = document.querySelector('#footballerEditorCard input[name="birthDate"]') as HTMLInputElement
            let injuryDaysInput = document.querySelector('#footballerEditorCard input[name="injuryDays"]') as HTMLInputElement
            
            // attributes
            let energyInput = document.querySelector('#footballerEditorCard input[name="energy"]') as HTMLInputElement
            let moraleInput = document.querySelector('#footballerEditorCard input[name="morale"]') as HTMLInputElement
            let conditionInput = document.querySelector('#footballerEditorCard input[name="condition"]') as HTMLInputElement
            let experienceInput = document.querySelector('#footballerEditorCard input[name="experience"]') as HTMLInputElement
            let mentalInput = document.querySelector('#footballerEditorCard input[name="mental"]') as HTMLInputElement
            let technicalInput = document.querySelector('#footballerEditorCard input[name="technical"]') as HTMLInputElement
            let tacticalInput = document.querySelector('#footballerEditorCard input[name="tactical"]') as HTMLInputElement
            let physicalInput = document.querySelector('#footballerEditorCard input[name="physical"]') as HTMLInputElement
            let flairInput = document.querySelector('#footballerEditorCard input[name="flair"]') as HTMLInputElement
            let potentialInput = document.querySelector('#footballerEditorCard input[name="potential"]') as HTMLInputElement
            let reputationInput = document.querySelector('#footballerEditorCard input[name="reputation"]') as HTMLInputElement
            
            console.log(firstNameInput.value)
            console.log(lastNameInput.value)
            console.log(nickNameInput.value)
            console.log(birthDateInput.value)
            console.log(injuryDaysInput.value)
            console.log(energyInput.value)
            console.log(moraleInput.value)
            console.log(conditionInput.value)
            console.log(experienceInput.value)
            console.log(mentalInput.value)
            console.log(technicalInput.value)
            console.log(tacticalInput.value)
            console.log(physicalInput.value)
            console.log(flairInput.value)
            console.log(potentialInput.value)
            console.log(reputationInput.value)
            

            let footballerData:FootballerData = {
                id: this.footballerSelector,
                
                // personal data
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                nickName: nickNameInput.value,
                birthDate: birthDateInput.value,
                team: this.teamSelector,
                injuryDays: Number(injuryDaysInput.value),
                
                // attributes
                energy: this.selectedFootballer.convertToNumber(Number(energyInput.value)),
                morale: this.selectedFootballer.convertToNumber(Number(moraleInput.value)),
                condition: this.selectedFootballer.convertToNumber(Number(conditionInput.value)),
                experience: this.selectedFootballer.convertToNumber(Number(experienceInput.value)),
                mental: this.selectedFootballer.convertToNumber(Number(mentalInput.value)),
                technical: this.selectedFootballer.convertToNumber(Number(technicalInput.value)),
                tactical: this.selectedFootballer.convertToNumber(Number(tacticalInput.value)),
                physical: this.selectedFootballer.convertToNumber(Number(physicalInput.value)),
                flair: this.selectedFootballer.convertToNumber(Number(flairInput.value)),
                potential: this.selectedFootballer.convertToNumber(Number(potentialInput.value)),
                reputation: this.selectedFootballer.convertToNumber(Number(reputationInput.value))
            }
            this.$emit('updateFootballer', footballerData)
        }

    }
</script>

<style scoped lang="scss">
    .form-inline label{
        width: 180px;
        justify-content: left;
    }
</style>