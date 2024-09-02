import { JsonDB } from 'node-json-db'

export default class DBController {

	private db : JsonDB

	constructor(db : JsonDB){ // third param toggle to false in future
		this.db = db
	}

	public async updateNikaName(newName : string) : Promise<void> {
		this.db.push('/NikaName', newName).then()
	}

	public async getNikaName() : Promise<string> {
		return await this.db.getData('/NikaName')
	}
	
	public async getSchedule() : Promise<string> {
		return await this.db.getData('/schedule')
	}

	public async setSchedule(schedule : any[]) : Promise<void> {
		this.db.push('/schedule', schedule)
	}
	
}
