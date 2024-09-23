import DBController from 'schedule/Controllers/DB.controller'
import { CONFIG, TIME_OUT_REQUEST } from '../../../config'
import ScheduleService from './API/ScheduleService'

export async function checkUpdate(dbController : DBController) : Promise<Boolean> {

	if (CONFIG.ForcedUpdate) {
		dbController.updateNikaName(await ScheduleService.getUpdateNikaName())
		return false
	}

	const lastTime = await dbController.getLastResponse()

	if(Date.now() - lastTime >= TIME_OUT_REQUEST){
		const currentNikaName = await dbController.getNikaName()
		const updateNikaName = await ScheduleService.getUpdateNikaName()
		dbController.setLastResponse(Date.now())

		if(currentNikaName === updateNikaName) return true
		
		dbController.updateNikaName(updateNikaName)

		return false
	} else return true
}
