import { Request, Response } from 'express'
import { UpdateAttendants } from '../../alisization/Logic/UpdateAttendants'
import DBController from './DB.controller'

export default class RequestController {
	private dbController: DBController

	constructor(dbController: DBController) {
		this.dbController = dbController
	}

	getToday = async (req: Request, res: Response) => {
		const selectedAttendants = await UpdateAttendants(this.dbController)
		const attendantsList = await this.dbController.getAttendantsList()

		res.json({
			attendants: [
				attendantsList[selectedAttendants * 2 - 2],
				attendantsList[selectedAttendants * 2 - 1]
			]
		})
	}

	getTommorow = async (req: Request, res: Response) => {
		const selectedAttendants = await UpdateAttendants(this.dbController)
		const attendantsList = await this.dbController.getAttendantsList()

		res.json({
			attendants: selectedAttendants !== 13
				? [
					attendantsList[selectedAttendants * 2],
					attendantsList[selectedAttendants * 2 + 1]
				]
				: [
					attendantsList[0],
					attendantsList[1]
				]
		})
	}

}