import { JsonDB } from 'node-json-db'

export default class DBController {

	private db : JsonDB

	constructor(db : JsonDB){
		this.db = db
	}

	public async setSelectedAttendants(selectedAttendants : number) : Promise<void> {
		this.db.push('/selectedAttendants', selectedAttendants)
	}

	public async getSelectedAttendants() : Promise<number> {
		return await this.db.getData('/selectedAttendants')
	}

	public async setLastDate(lastDate : number) : Promise<void> {
		this.db.push('/lastDate', lastDate)
	}

	public async getLastDate() : Promise<number> {
		return await this.db.getData('/lastDate')
	}

	public async getAttendantsList() : Promise<string[]> {
		return await this.db.getData('/attendantsList')
	}


}
