import uuidv4 from 'uuid/v4'

export interface BaseState {
	id: string
}

export class Base {
	_keys!:string[]
	_id!:string
	
	constructor() {
		this._id = uuidv4()
	}

	get id() {
		return this._id
	}

	_import(state:any) {
		let entity = this
		this._keys.forEach(key=>{
			entity['_'+key]=state[key]
		})
	}

	export() {
		let state:any = {}
		let entity = this
		this._keys.forEach(key=>{
			state[key] = entity['_'+key]
		})
		return state
	}
}