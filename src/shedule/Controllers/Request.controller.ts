import { Request, Response } from 'express'
import { CheckUpdate } from '../../shedule/Logic/CheckUpdate'
import { UpdateSchedule } from '../../shedule/Logic/UpdateSchedule'
import DBController from './DB.controller'

export default class RequestController {
	private dbController: DBController

	constructor(dbController: DBController) {
		this.dbController = dbController
	}

	public getAll = async (req: Request, res: Response) => {
		if (! await CheckUpdate(this.dbController)) 
			UpdateSchedule(this.dbController)
		const response = await this.dbController.getSchedule()
		res.json(response)
	}

	public getCurrent = async (req: Request, res: Response) => {
		if (! await CheckUpdate(this.dbController)) 
			UpdateSchedule(this.dbController)
		const response = await this.dbController.getSchedule()
		res.json(response[Number(req.params.day) - 1])
	}

}
