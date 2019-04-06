import {Base, BaseData} from './Base'
import {keys} from 'ts-transformer-keys';
import * as moment from "moment";

export interface FootballerData extends BaseData {
	firstName: string
	lastName: string
	birthDate: string
}
const dataKeys = keys<FootballerData>()

export class Footballer extends Base {
	private _firstName: string
	private _lastName: string
	private _birthDate: string

	constructor() {
		super()
		this._keys = dataKeys;
	}

	import(data: FootballerData) {
		this._import(data)
	}

	// getters
	get firstName() {
		return this._firstName
	}

	get lastName() {
		return this._lastName
	}

	get birthDate() {
		return moment(this._birthDate)
	}
	
	// computed
	ageOn(dateString: string) {
		return this.birthDate.diff(dateString, 'years');
	}

}
