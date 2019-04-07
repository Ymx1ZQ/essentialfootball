import {Base, BaseData} from './Base'
import {keys} from 'ts-transformer-keys';
import * as moment from "moment";

export interface FootballerData extends BaseData {
	firstName: string
	lastName: string
	nickName: string
	birthDate: string
	team: string
}
const dataKeys = keys<FootballerData>()

export class Footballer extends Base {
	private _firstName: string
	private _lastName: string
	private _nickName: string
	private _birthDate: string
	private _team: string

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

	get nickName() {
		return this._nickName
	}

	get fullName() {
		if (this.nickName) return this.nickName;
		return `${this.firstName} ${this.lastName}`
	}

	get shortName() {
		if (this.nickName) return this.nickName;
		return `${this.firstName[0]}. ${this.lastName}`
	}

	get birthDate() {
		/* TODO!! manage dates!! */
		return this._birthDate
	}


	get team() {
		/* TODO!! manage relations!! */
		return this._team
	}
	
	// computed
	ageOn(dateString: string) {
		return moment(this.birthDate).diff(dateString, 'years');
	}

}
