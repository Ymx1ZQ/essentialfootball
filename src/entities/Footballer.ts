import {Base, BaseData} from './Base'
import {keys} from 'ts-transformer-keys';
import * as moment from "moment";

export interface FootballerData extends BaseData {
	// personal data
	firstName: string
	lastName: string
	nickName: string
	birthDate: string
	team: string
	injuryDays: number

	// attributes data [0-99]
	energy:number
	morale:number

	condition:number
	experience:number
	
	mental:number
	technical:number
	tactical:number
	physical:number
	flair:number
	
	potential:number
	reputation:number

	// attributes data [0-99]
	

}
const dataKeys = keys<FootballerData>()

export class Footballer extends Base {
	// personal data
	private _firstName: string
	private _lastName: string
	private _nickName: string
	private _birthDate: string
	private _team: string
	private _injuryDays: number

	// attributes data [0-99]
	private _energy:number
	private _morale:number
	private _condition:number
	private _experience:number
	private _mental:number
	private _technical:number
	private _tactical:number
	private _physical:number
	private _flair:number
	private _potential:number
	private _reputation:number

	constructor() {
		super()
		this._keys = dataKeys;
	}

	import(data: FootballerData) {
		this._import(data)
	}

	// getters
	get firstName() { return this._firstName }
	get lastName() { return this._lastName }
	get nickName() { return this._nickName }
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
	get injuryDays() { return this._injuryDays }
	get energy() { return this._energy }
	get morale() { return this._morale }
	get condition() { return this._condition }
	get experience() { return this._experience }
	get mental() { return this._mental }
	get technical() { return this._technical }
	get tactical() { return this._tactical }
	get physical() { return this._physical }
	get flair() { return this._flair }
	get potential() { return this._potential }
	get reputation() { return this._reputation }

	// methods
	ageOn(dateString: string) {
		return moment(this.birthDate).diff(dateString, 'years');
	}

	convertToStars(number: number) {
		return Math.floor(1+number/7.075)/2
	}

	convertToNumber(stars: number) {
		return Math.floor(stars*14-3)
	}
}
