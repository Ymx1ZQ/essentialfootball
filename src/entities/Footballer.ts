import {Base, BaseState} from './Base'
import {keys} from 'ts-transformer-keys';
import * as moment from "moment";

export interface FootballerState extends BaseState {
	firstName: string
	lastName: string
}

export class Footballer extends Base {
	private _firstName: string
	private _lastName: string

	constructor() {
		super()
		this._keys = keys<Footballer>();
	}

	get firstName() {
		return this._firstName
	}

	get lastName() {
		return this._lastName
	}
	
	import(state: Footballer) {
		this._import(state)
	}

}
