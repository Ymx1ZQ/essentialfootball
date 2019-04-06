// import {Base} from './Base'

// export class Footballer extends Base {
	
// }

import uuidv4 from 'uuid/v4'

export class Footballer {
	id!:string
	
	constructor() {
		this.id = uuidv4()
	}

	getId() {
		return this.id
	}
}