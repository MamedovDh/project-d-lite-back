import { Request, Response } from 'express'
import { CheckUpdate } from '../Logic/CheckUpdate'
import { UpdateSchedule } from '../Logic/UpdateSchedule'
import DBController from './DB.controller'

export default class RequestController {
	private dbController: DBController

	constructor(dbController: DBController) {
		this.dbController = dbController
	}

	public getAll = async (req: Request, res: Response) => {
		if (! await CheckUpdate(this.dbController))
			UpdateSchedule(this.dbController)
		else
			console.log('not changes in schedule')
		const response = await this.dbController.getSchedule()
		res.json({ schedule: response })
	}

	public getCurrent = async (req: Request, res: Response) => {
		if (! await CheckUpdate(this.dbController))
			UpdateSchedule(this.dbController)
		else
			console.log('not changes in schedule')
		const response = await this.dbController.getSchedule()
		res.json({
			schedule:
				Number(req.params.day) >= 2 && Number(req.params.day) < 7 && response[Number(req.params.day) - 1].length !== 0
					? response[Number(req.params.day) - 1]
					: []
		})
	}

	public getToday = async (req: Request, res: Response) => {
		if (! await CheckUpdate(this.dbController))
			UpdateSchedule(this.dbController)
		else
			console.log('not changes in schedule')
		const response = await this.dbController.getSchedule()
		res.json({ 
			schedule: 
			new Date().getDay() >= 2 && new Date().getDay() < 7
				? response[new Date().getDay() - 1] 
				: []
		})
	}

}
