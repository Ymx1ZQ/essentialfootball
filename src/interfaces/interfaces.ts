import {Footballer} from '../entities/Footballer'
import {League} from '../entities/League'
import {Team} from '../entities/Team'

export interface Database {
	footballers:Footballer[]
	leagues:League[]
	teams:Team[]
}