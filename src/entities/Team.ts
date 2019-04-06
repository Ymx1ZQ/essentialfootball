import {Base, BaseData} from './Base'
import {keys} from 'ts-transformer-keys';

export interface TeamData extends BaseData {
	name: string
	league: string
	cash: number
}
const dataKeys = keys<TeamData>()

export class Team extends Base {
	private _name: string
	private _league: string
	private _cash: number

	constructor() {
		super()
		this._keys = dataKeys;
	}

	import(data: TeamData) {
		this._import(data)
	}

	// getters
	get name() {
		return this._name
	}

	get league() {
		return this._league
	}

	get cash() {
		return this._cash?Math.round(this._cash*100)/100:0
	}

}