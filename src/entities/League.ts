import {Base} from './Base'

export interface LeagueState {
	name: string
}

export class League extends Base implements LeagueState {
	name:string

	constructor(name) {
		super()
		this.name = name
	}
	
	importState(state:LeagueState) {
		for (let key in state) {
			this[key] = state[key]
		}
	}

}
