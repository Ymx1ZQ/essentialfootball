<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <basic-select
                    :options="leagueOptions"
                    :selected-option="leagueOptions.find(leagueOption=>leagueOption.value==leagueSelector)"
                    v-if="leagues.length>0"
                    @select="(item)=>leagueSelector=item.value"
                ></basic-select>
                <p v-if="leagues.length==0">No league found.</p>
                <button class="btn btn-primary" @click="createLeague">Create league</button>
            </div>
            <div class="col-md-9">
                <div id="leagueEditorCard" class="editor-card" v-if="selectedLeague">
                    <p class="small text-muted">ID: {{leagueSelector}}</p>
                    <div class="form-group">
                        <label>Name</label>
                        <input class="form-control" type="text" name="name" :value="selectedLeague.name" @keyup="updateLeague" @change="updateLeague"/>
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
    import {League, LeagueData} from '../../entities/League'
    import {BasicSelect} from 'vue-search-select'

    @Component({
        components: {
            'basic-select': BasicSelect
        }
    } as ComponentOptions<Vue>)
    
    export default class LeaguesEditor extends Vue {
        // props
        @Prop(Array) readonly leagues: League[]
        
        // state
        leagueSelector:string = ''
        
        // computed
        get leagueOptions() {
            return this.leagues.map(league=>{return {value: league.id, text: league.name}})
        }

        get selectedLeague() {
            return this.leagues.find(league=>league.id==this.leagueSelector)
        }
        
        // methods
        created() {
            if (this.leagues.length>0) {
                this.leagueSelector = this.leagues[0].id
            }
        }

        createLeague() {
            this.$emit('createLeague')
            this.leagueSelector = this.leagues[this.leagues.length-1].id
        }

        updateLeague() {
            let nameInput = document.querySelector('#leagueEditorCard input[name="name"]') as HTMLInputElement
            let leagueData:LeagueData = {
                id: this.leagueSelector,
                name: nameInput.value
            }
            this.$emit('updateLeague', leagueData)
        }

    }
</script>

<style scoped lang="scss">

</style>