import DBController from 'schedule/Controllers/DB.controller'
import { CONFIG } from '../../../config'
import ScheduleService from './API/ScheduleService'
import { createShedule } from './CreateSchedule'

export async function updateSchedule(dbController: DBController) {
	const NikaName = await dbController.getNikaName()
	const schedule = createShedule(await ScheduleService.getNikaData(NikaName))
	if (CONFIG.IsDev) console.log('success update schedule')
	dbController.setSchedule(schedule)
}




