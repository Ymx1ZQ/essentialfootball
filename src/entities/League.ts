import {Base, BaseData} from './Base'
import {keys} from 'ts-transformer-keys';

export interface LeagueData extends BaseData {
	name: string
}
const dataKeys = keys<LeagueData>()

export class League extends Base {
	private _name: string

	constructor() {
		super()
		this._keys = dataKeys
	}

	import(data: LeagueData) {
		this._import(data)
	}

	// getters
	get name() {
		return this._name
	}

}
