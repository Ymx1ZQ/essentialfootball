import uuidv4 from 'uuid/v4'

export class Base {
	id!:string
	
	constructor() {
		this.id = uuidv4()
	}

	getId() {
		return this.id
	}
}