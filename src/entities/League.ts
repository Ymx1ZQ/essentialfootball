import {Base, BaseState} from './Base'
import {keys} from 'ts-transformer-keys';

export interface LeagueState extends BaseState {
	name: string
}
const _keys = keys<LeagueState>()

export class League extends Base {
	private _name: string

	constructor() {
		super()
		this._keys = _keys
	}

	import(state: LeagueState) {
		this._import(state)
	}

	// getters
	get name() {
		return this._name
	}
	

}
