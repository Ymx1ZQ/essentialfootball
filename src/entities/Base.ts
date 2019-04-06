import uuidv4 from 'uuid/v4'

export interface BaseData {
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

	_import(data:any) {
		let entity = this
		this._keys.forEach(key=>{
			entity['_'+key]=data[key]
		})
	}

	export() {
		let data:any = {}
		let entity = this
		this._keys.forEach(key=>{
			data[key] = entity['_'+key]
		})
		return data
	}
}